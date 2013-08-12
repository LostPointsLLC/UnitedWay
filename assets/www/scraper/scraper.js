//scraper
//google feed api
//based on the code of
//include this in the webpage using the scrapper
//<script type = "text/javascript" src = "https://www.google/com/jsapi"></script>

function grabData(callback)
{
    //loading the Google's Feed API
    google.load('feeds','1',{
	'callback':function(){
	    var feed = new google.feeds.Feed('http://host5.evanced.info/champaign/evanced/eventsxml.asp?lib=ALL&nd=30&feedtitle=Champaign+Public+Library+Events&dm=rss2');
	    feed.setNumEntries(50);
	    feed.includeHistoricalEntries();
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


grabData(function(events) {
    for(var i=0;i<events.length;i++) {

	var div = document.createElement('div');
	div.appendChild(document.createTextNode([
	    events[i].title,
	    events[i].startTime.toString(),
	    events[i].endTime.toString(),
	    events[i].location,
	    events[i].description
	].join(' -- ')));
	document.body.appendChild(div);
    }
});

	   
		      
			

