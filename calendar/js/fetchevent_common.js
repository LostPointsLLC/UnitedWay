/* A scraper that retrieves the dates and times of a set of events.
 * @Author: Braxton Spence
 * @Edited: Pingxiao Ye, Henry Lin
 */
function getLibraryEvent(day, month){

    var $div =  document.getElementById('events');
   
    $div.innerHTML = "";

	/* Uses the grabData function defined below, as well as the defined lambda
	 * function, to 1. Scrape the data, and 2. display the data on the screen.
	 */ 
    grabData(function(events) {


		for(var i=0;i<events.length;i++) {
			if (((events[i].startTime.getDate()) == day) && (events[i].startTime.getMonth() == month))
			{

				var eventDiv = document.createElement("div");

				/* Displays the event's title */
				var eventLink = document.createElement("a");
				eventLink.setAttribute("href", events[i].url);
				var eventTitle = document.createElement("h3");
				eventTitle.style.margin = "0";
				eventTitle.appendChild(document.createTextNode([
					events[i].title		   
				]));
				eventLink.appendChild(eventTitle);

				eventDiv.appendChild(eventLink);

				/* Displays the start and end times on the screen */
				var time = document.createElement("p");
				time.style.margin = "0";
				var timeText = "";
				timeText += "<span>From</span> " + getCentralTime(events[i].startTime) + " <span>to</span> " + getCentralTime(events[i].endTime);
				//timeText += "<p><span>End time:</span> " + getCentralTime(events[i].endTime) + "</p>";
				console.log(timeText);
				time.innerHTML = timeText;
				eventDiv.appendChild(time);

				/*
				var enttime = document.createElement('p');
				enttime.appendChild(document.createTextNode([
					events[i].startTime.toString(),
					events[i].endTime.toString()
				]));
				eventDiv.appendChild(enttime);
				*/
				/* Displays the event's location */
				var entlocation = document.createElement('p');
				var locText = "";
				locText += "<span>Location:</span> " + events[i].location;
				entlocation.innerHTML = locText;
				eventDiv.appendChild(entlocation);

				/* Displays the Event's description */
				var entdes = document.createElement('p');
				var desText = "";
				desText += "<div><span>Description:</span> " + events[i].description + "</div>";
				entdes.innerHTML = desText;
				eventDiv.appendChild(entdes);

				//$div.appendChild(eventTitle);
				$div.appendChild(eventDiv);
			}
		}
		if($div.innerHTML == "")
			$div.innerHTML = "No Events for Today.";

    });
   
}

/* Returns the time of the event in central time.
 * Formats the time correctly.
 */
function getCentralTime(date) {
	var time = date.toLocaleTimeString();
	return time.substr(0, time.lastIndexOf(":")) + " " + time.substr(time.indexOf(" ") + 1, time.length);
}


/* Scrapes the data provided from the rss link, and uses the callback function
 * to display these events onto the page
 */
function grabData(callback)
{
    //loading the Google's Feed API
	google.load('feeds','1',{
		'callback': function(){
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

					/* Each one of the entries has a 'content' field which pulls from the <description> xml tag.
					 * Read the google feeds API documentation to understand what's going on:
					 *
					 * https://developers.google.com/feed/v1/reference
					 *
					 * If you don't understand xml, xml is similar to html (html is actually a type of xml), and so
					 * xml has the same tree structure. The Google API is simply a way to parse the xml into a "nicer" form.
					 *
					 * So correction: The person who wrote the crux of this code didn't write a scraper. The google API created a 
					 * scraper, and he's just using that.
					 */
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
					var shortDesc = description.substr(0, 150);
					if(description.length != shortDesc.length) shortDesc += "...";

					/* Pushes the just-defined event object into an array
					 * called 'events'
					 */
					events.push({
						'title':ents[i].title,
						'startTime':startTime,
						'endTime':endTime,
						'location':location,
						'description':shortDesc,
						'url': ents[i].link
					});
				}

				callback(events);
			}
			});
		}
    });  
}
