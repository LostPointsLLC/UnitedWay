var thefeeds;

/* A wrapper function for the whole entire feed API.
 * @param1: A string of the div id to be appended to
 * @param2: A string representing the URL where the RSS feed is grabbing from
 * @param3: An int of how many stories will be shown
 * @param4: A string of the headline of the RSS feed.
 */
function rssfeed(id, url, limit, output, style_id) {
	feedcontainer = document.getElementById(id);
	feedurl = url;
	feedlimit = limit;
	rssoutput = "<div class='rss-head'><h3 id='" + style_id + "'>" + output + "</h3></div>";
	headline = output;	
	window.onload = function(){
		rssfeedsetup();
	}

}

function rssfeedsetup(){
	var feedpointer = new google.feeds.Feed(feedurl);
	feedpointer.setNumEntries(feedlimit);
	feedpointer.load(displayfeed); /* Calls the displayfeed function */
}


function displayfeed(result){

	if (!result.error){
	
		// thefeeds is an array of objects that contains the RSS feed information.
		// thefeeds[i].link is the URL.
		// thefeeds[i].title is the headline.
		thefeeds = result.feed.entries; // theFeeds is a global variable to be accessed in add-remove-feed.js	
		
		/* Modifies the rssoutput variable, which will be interpreted as HTML 
		 * Each iteration appends the headline inside a list item <li>
		 */
		for (var i = 0; i < thefeeds.length; i++) {

			var inner = "<div class='inner-div'><p id='" + i + "' class='item-text'><a href='" + thefeeds[i].link + "'>" + thefeeds[i].title + "</a></p></div>"
			var star = "<a onClick='favFunction(" + i + ")'><img src='../images/star-button.png'></a>";

			if(i == thefeeds.length - 1) {
				rssoutput += " <div class='even item last-item'>" + inner + star + "</div>";
				break;
			}
			if(i % 2 == 0) {
				rssoutput += "<div class='even item'>" + inner + star + "</div>";
			}
			else {
				rssoutput += "<div class='odd item'>" + inner + star + "</div>";
			}
		}
		feedcontainer.innerHTML = rssoutput;
	}
	
	else
		alert("Error fetching feeds!");
}



