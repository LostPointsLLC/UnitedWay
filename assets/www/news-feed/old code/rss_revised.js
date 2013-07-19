/* Creates the rss feed using an array
 * of RSS URLS.
 * The feeds are not sorted by published date, but
 * are sorted by round robin.
 */
function createFeed(rssurlArray) {
	
	feedcontainer = document.getElementById("feed");
	
	rssurlArray.forEach(


}



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
		alert(thefeeds[1].mediaGroup);
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