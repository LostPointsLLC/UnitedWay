$(document).ready(function() {
    updateDAE(sessionStorage.date);
});

//function to update page with current date, activity of the day and events of the day
function updateDAE(param)
{
    var monthNames = [ "January", "February", "March", "April", "May", "June",
		       "July", "August", "September", "October", "November", "December" ]
    var monthIndex= parseInt(param)	//gets the numerical value of month
    var monthText = monthNames[monthIndex-1];//retrieves the string value of that month.
    var day = parseInt(param.substr(3));
    //Updates the chosen day, month and activity on the current page
    document.getElementById('day').innerHTML = day;
    document.getElementById('month').innerHTML = monthText;
    //has to offset by 1 because array index starts at 0.
    
    document.getElementById('activity').innerHTML = "Activity: <br>" + 
	getActivity(day-1,monthIndex-1) + "<br><br>"+getEvent(day-1,monthIndex-1);
  
    getLibraryEvent(day,monthIndex-1);
 
}

//go back to home page
function goHome(){
	document.location.href = "../home/";
}

//go to help page
function goHelp(){
	document.location.href = "../help/Calendar.html";
}

//go back to calendar page
function goToCalendar(){
	document.location.href = "../calendar/maincalendar.html";
}

//returns the tip associated with the given day and month; month = 0(jan), 1(feb); day = 1,2..,31
function getActivity(day,month){
	return tipsArray[month][day];
}

//--------------------------------------------------------------
function getLibraryEvent(day, month){
  /*To be Fixed*/
  
    grabData(function(events) {
	for(var i=0;i<events.length;i++) {
	    /*alert("the event date is" + JSON.stringify(events[i].startTime.getDate()));
	    alert("today date is" + day);
	    alert(JSON.stringify(events[i].startTime.getMonth()));
	    alert("this month is" + month);
	    */
	    if (((events[i].startTime.getDate()) == day)
		&& (events[i].startTime.getMonth() == month))
	    {
	var enttile = document.createElement('p');
		enttile.appendChild(document.createTextNode([
		    events[i].title		   
		]));
		document.getElementById('lib').appendChild(enttile);
		
		
	/*	var str = events[i].title;
		document.getElementById('lib').write(str.bold());
	*/	
		var enttime = document.createElement('p');
		enttime.appendChild(document.createTextNode([
		    events[i].startTime.toString(),
		    events[i].endTime.toString()
		]));
		document.getElementById('lib').appendChild(enttime);
		
		var entlocation = document.createElement('p');
		entlocation.appendChild(document.createTextNode([
		    events[i].location
		]));
		document.getElementById('lib').appendChild(entlocation);
		   
		var entdes = document.createElement('p');
		entdes.appendChild(document.createTextNode([
		    events[i].description
		]));
		document.getElementById('lib').appendChild(entdes);
		  
		//document.getElementById('lib').appendChild(entry);
	
	    }
	}
    });
   
}

//function to get and update the event of that day
function getEvent(d,m){
var val;
$.ajax({
        type: "POST",
        url: "php/events.php",
        async:false,
        cache: false,
        success: function(data){
            var obj = jQuery.parseJSON(data);
            val = "Events: <br>" + obj[m][d];
        }
     });   
    return val;
}

function grabData(callback)
{
    //loading the Google's Feed API
    google.load('feeds','1',{
	'callback':function(){
	    var feed = new google.feeds.Feed('http://host5.evanced.info/champaign/evanced/eventsxml.asp?lib=ALL&nd=30&feedtitle=Champaign+Public+Library+Events&dm=rss2');
	    feed.load(function(res){
		if(res.error){
		    throw new Error('Problem occurred updating the event feed.');
		}
		else{
		    var events = [];
		    var ents = res.feed.entries;
		    for (var i = 0; i < ents.length; i++){
			//all obj here are actually an array of subtrings
			//split <-> join
			//grab date/time
			var timeobj = ents[i].content.split('<br>')[0].split(' ');
			var startTime = new Date();
			var endTime = new Date();
			
			var datestring = [(timeobj.slice(2,5)).join(' '), timeobj.slice(6,8).join(' ')].join(' ');
			startTime.setTime(Date.parse(datestring));
			
			datestring = [(timeobj.slice(2,5)).join(' '), timeobj.slice(9,11).join(' ')].join(' ');
			endTime.setTime(Date.parse(datestring));
			
			//grab location
			var locobj = ents[i].content.split('<br>')[1].split(' ');
			var location = new String(locobj.slice(1).join(' '));
			
			//grab event decription
			var desobj = ents[i].content.split('<br>')[3];
			
			var description = new String(desobj);
			
			events.push({
			    'title':ents[i].title,
			    'startTime':startTime,
			    'endTime':endTime,
			    'location':location,
			    'description':description
			});
		    }
		    callback(events);
		}
	    });
	}
    });  
}


