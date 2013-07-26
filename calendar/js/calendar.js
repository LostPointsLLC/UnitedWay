var counter = 0;    //counter to count how many times that particular date is clicked
var prevdate = null;    //variable to store previous date selected
var date = new Date();
//loads the calendar for the current month
$('#calendar').datepicker({
        inline: true,
        firstDay: 0,
        showOtherMonths: true,
        async:false,
        dayNamesMin: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        onChangeMonthYear:function(year,month,inst){
            //checks if you are on the current month, if not, switching to other months will
            //highlight the 1st day of that month.
            if(!(month-1 == date.getMonth()))
            $(this).datepicker( "setDate", month + '/1/' + year );
            //checks if you return to the current month. If so, prints the activities and events of
            //current day
            if(month-1 == date.getMonth())
            {
               displayTE(date.getMonth(),date.getDate()-1);
            }
            else//prints the activities and events of the first day of that month
            displayTE(month-1,0);
        },
        onSelect: function(datestr){
            var m = parseInt(datestr.substring(0,2),10)-1; //selected box month's int value from 0 to 11
            var d = parseInt(datestr.substring(3,5),10)-1; //selected box day's int value from 0 to 30
            //checks if it is the first time the date is selected
            //checks if the second date selected equals the prev date selected

            if(prevdate==null || prevdate==datestr) 
            {
                counter++;
            }
            else    //the second selected date is a different date, reset counter to 1
            {
                counter = 1;
            }
            if(counter==1){
               $( "#datepicker" ).datepicker("option", "defaultDate", d);
            }
            if(counter==2) //user has selected the date consecutively. link to bigger calendar activitypage
            {
                linkTopage(datestr);
            }
            prevdate = datestr; //assigns the date selected to the prevdate variable
            displayTE(m,d); //calls function to display the activity and event below the main calendar
        },     
    });


$(document).ready(function() {
    var currentDate = new Date();
    var day = currentDate.getDate();
    var month = currentDate.getMonth();
   //resizeactivitydiv();
   displayTE(month,day-1);

});
//function to go to calendar tip page
function linkTopage(param)
{
    sessionStorage.date = param;
    document.location.href = "calendartip.html";
//alert(sessionStorage.date);
}

//function to go back to home page
function goHome()
{
    document.location.href = "../home/";
}

//function to go to help page
function goHelp()
{
    document.location.href = "../help/Calendar.html";
}

//returns the tip associated with the given day and month; month = 0(jan), 1(feb); day = 1,2..,31
function getActivity(day,month){
	return tipsArray[month][day];
}

//function to display today's event below the main calendar
function getTE(m,d){
var val;
$.ajax({
        type: "POST",
        url: "php/events.php",
        async:false,
        cache: false,
        success: function(data){
            var obj = jQuery.parseJSON(data);
            val = "Events: <br>" + obj[m][d]
        }
     });   
    return val;
}

function displayTE(m,d)
{
    document.getElementById('activity').innerHTML = "<span id='activity-head'>Activity</span> <br>" + 
    getActivity(d,m) + "<br><br>"+getTE(m,d);
    getLibraryEvent(d-1,m);
}

function getLibraryEvent(day, month){

    var $div =  document.getElementById('events');
   
    $div.innerHTML = "";
    grabData(function(events) {
	for(var i=0;i<events.length;i++) {
	    if (((events[i].startTime.getDate()-2) == day) //change back to day
		&& (events[i].startTime.getMonth() == month))
	    {
		var eventTitle = document.createElement("h3");
		var eventDiv = document.createElement("div");
		eventTitle.appendChild(document.createTextNode([
		    events[i].title		   
		]));	
		var enttime = document.createElement('p');
		enttime.appendChild(document.createTextNode([
		    events[i].startTime.toString(),
		    events[i].endTime.toString()
		]));
		eventDiv.appendChild(enttime);
		
		var entlocation = document.createElement('p');
		entlocation.appendChild(document.createTextNode([
		    events[i].location
		]));
		eventDiv.appendChild(entlocation);
		   
		var entdes = document.createElement('p');
		entdes.appendChild(document.createTextNode([
		    events[i].description
		]));
		eventDiv.appendChild(entdes);
		  
	
		$div.appendChild(eventTitle);
		$div.appendChild(eventDiv);
	    }
	}
    });
   
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



