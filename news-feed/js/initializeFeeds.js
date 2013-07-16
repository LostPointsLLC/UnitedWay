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
	*	<div onClick="function()" class="rss_item parity favorite" id="rss_id">
	*		<div class="item-text-box">
	*		<a class='item-text'> Hello world </a>
	*		</div>
	*	</div>
	*/

	var backdiv = "</a></div></div>";
	for(var i = 0; i < entries.length; i++) {

		// Binds a class to items based upon parity numbered rss items
		var parity;
		if(i % 2 == 0)	parity = "even";
		else 			parity = "odd";

		// Checks whether an item has been favorited or not
		var favorite;
		var rss_id = checkIfFavorited(entries[i]);
		if(rss_id != -1) {
			favorite = "fav";	
		}

		else {
			favorite = "nofav";
			rss_id = "no" + i;					// Represents an ID who isn't in the db yet

		}
		
		
		var outerdiv = "<div onClick='favorite(" + rss_id + ")' class='" + parity + " " + favorite + " rss-item'>";
		var innerdiv = "<div class='item-text-box'>";
		var content	= "<a href='" + entries[i].link + "'>" + entries[i].title + "</a>";

		feedContainer.innerHTML += outerdiv + innerdiv + content + backdiv;
	}

}

/* Checks whether the entry is in the global feedArray
 * Currently, I can only do a O(n) algorithm for this, but
 * I definitely want to find a nice way to do this in the future.
 * There are trivial data structures I could make to do this in O(lg n) time.
 */
function checkIfFavorited(entry) {
	for(var i = 0; i < feedArray.length; i++) {
		if(feedArray[i].rss_url == entry.link)
			return feedArray[i].rss_id;
	}
	return -1;
}

