// Displayes the RSS feed on the page.
function initializeFeed() {
	//http://host5.evanced.info/champaign/evanced/eventsxml.asp?lib=ALL&nd=30&feedtitle=Champaign+Public+Library+Events&dm=rss2"
	//http://www.chambanamoms.com/feed
	
	var rssurl 	= "http://host5.evanced.info/champaign/evanced/eventsxml.asp?lib=ALL&nd=30&feedtitle=Champaign+Public+Library+Events&dm=rss2";
	var limit 	= 8;
	var title 	= "Champaign Public Library Events";
	var source 	= "Champaign Public Library";

	feedTitle = title;
	feedData = new rssData(rssurl, limit, title, source);
	rssfeedsetup();	


}


function rssfeedsetup(){
	var feedpointer = new google.feeds.Feed(feedData.rssurl);
	feedpointer.setNumEntries(feedData.limit);
	feedpointer.load(displayfeed); /* Calls the displayfeed function */
}

/* The main function that displays the feeds on the page.
 * Uses the google API.
 */
function displayfeed(result){

	if (result.error) {
		alert("Error fetching feeds!");
		return;
	}

	// thefeeds is an array of objects that contains the RSS feed information.
	// thefeeds[i].link is the URL.
	// thefeeds[i].title is the headline.
	entries = result.feed.entries; 
	var feedContainer = document.getElementById("feed");

	// Places the headline on the page
	var headline = "<div class='rss-head'><h3>" + feedData.title + "</h3></div>";
	feedContainer.innerHTML += headline;

	// Puts all of the rss feed items on the page, and highlights them
	// accordingly
	// The tree structure below looks like this: 
	/*
	*	<div onClick="favorite(rss_id)" class="rss_item parity favorite" id="rss_id">
	*		<div class="item-text-box">
	*		<a class='item-text'> Title of Headline </a>
	*		</div>
	*	</div>
	*/
	var backdiv = "</div></div>";
	for(var i = 0; i < entries.length; i++) {

		// Binds a class to items based upon parity numbered rss items
		var parity = assignParity(i);

		// Checks whether an item has been favorited or not
		var favorite;
		var rss_id = checkIfFavorited(entries[i]);
		if(rss_id != -1) {
			favorite = 'fav';
		}

		else {
			favorite = 'nofav';
			rss_id = -1 * (i+1);					// Represents an ID who isn't in the db yet, always a negative number
		}
		
		
		var outerdiv = "<div id='" + rss_id + "' onClick='favorite(" + rss_id + ")' class='" + favorite + " " + parity + " rss-item'>";
		var innerdiv = "<div class='item-text-box'>";
		var content	= "<a href='" + entries[i].link + "'>" + entries[i].title + "</a>";

		feedContainer.innerHTML += outerdiv + innerdiv + content + backdiv;
	}

}

function assignParity(i) {

	if(i % 2 == 0)	return "even";
	else 			return "odd";
	
}

/* Checks whether the entry is in the global feedArray
 * Currently, I can only do a O(n) algorithm for this, but
 * I definitely want to find a nice way to do this in the future.
 * There are trivial data structures I could make to do this in O(lg n) time.
 */
function checkIfFavorited(entry) {
	if(entry.link in linkIdArray)
		return linkIdArray[entry.link];
	return -1;
}

