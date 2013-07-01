var feedcontainer ;//= document.getElementById("feed"); 	/* Will modify the "feed" id */
var feedurl;// = "http://www.npr.org/rss/rss.php?id=1006"; /* From where the RSS feed is grabbing from */
var feedlimit;// = 10;
var rssoutput;// = "<h2>Latest NPR Business News:</h2><ul>";

/* A wrapper function for the whole entire feed API.
 * @param1: A string of the div id to be appended to
 * @param2: A string representing the URL where the RSS feed is grabbing from
 * @param3: An int of how many stories will be shown
 * @param4: A string of the headline of the RSS feed.
 */
function rssfeed(id, url, limit, output) {
	feedcontainer = document.getElementById(id);
	feedurl = url;
	feedlimit = limit;
	rssoutput = "<h2>" + output + "</h2><ul>";
	
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
		var thefeeds = result.feed.entries;
		
		/* Modifies the rssoutput variable, which will be interpreted as HTML 
		 * Each iteration appends the headline inside a list item <li>
		 */
		for (var i = 0; i < thefeeds.length; i++)
			rssoutput += "<li><a href='" + thefeeds[i].link + "'>" + thefeeds[i].title + "</a></li>";
		rssoutput += "</ul>";
		feedcontainer.innerHTML = rssoutput;
	}
	
	else
		alert("Error fetching feeds!");
}