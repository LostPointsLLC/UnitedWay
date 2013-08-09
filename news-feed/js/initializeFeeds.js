// Displayes the RSS feed on the page.
function initializeFeed() {

	var feed = localStorage.rss;
	var rssurl;
	var limit = 8;
	var title;
	var source;

	switch(feed) {
		case 'cm':		// Chambana moms
			rssurl	= "http://www.chambanamoms.com/feed";
			title	= "Chambana Moms News Feed";
			source	= "cm";
			break;

		case 'uw':		// United Way Blogs
			rssurl	= "http://www.uwayhelps.org/blogs/rss";
			title	= "United Way Blog";
			source	= "uw";
			break;

		default:		// Default is champaign public library
			rssurl 	= "http://host5.evanced.info/champaign/evanced/eventsxml.asp?lib=ALL&nd=30&feedtitle=Champaign+Public+Library+Events&dm=rss2";
			title 	= "Champaign Public Library Events";
			source 	= "cpl";
			break;
	}



	linkIdArray = getFavoritedNews();
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
	var headline = "<div class='rss-head'>"; 
	var selector = "<select id='change-feeds' onClick='changeFeeds(this)'>" + getOptions() + "</select></div>";
	feedContainer.innerHTML = feedContainer.innerHTML + headline + selector;


	// For some reason, the champaign public library feeds always displays in the wrong order =_=
	if(feedData.source == 'cpl')
		for(var i = entries.length - 1; i>=0; i--) {
			feedContainer.innerHTML += getRSSItem(entries[i], i); 
		}
	// Everything else is displayed in the right order
	else {
		for(var i = 0; i < entries.length; i++) {
			feedContainer.innerHTML += getRSSItem(entries[i], i);
		}	

	}
}

// Puts all of the rss feed items on the page, and highlights them
// accordingly
// The tree structure below looks like this: 
/*
*	<div onClick="favorite(rss_id)" class="rss_item parity favorite" id="fav_id">
*		<div class="item-text-box">
*		<a class='item-text'> Title of Headline </a>
*		</div>
*	</div>
*
*/
function getRSSItem(entry, i) {
	// Binds a class to items based upon parity numbered rss items
	var parity = assignParity(i);

	// Checks whether an item has been favorited or not
	var favorite;
	var rss_id = checkIfFavorited(entry);
	if(rss_id != -1) {
		favorite = 'fav';
	}

	else {
		favorite = 'nofav';
		rss_id = -1 * (i+1); // Represents an ID who isn't in the db yet, always a negative number
	}

	var outerdiv = "<div id='" + rss_id + "' onClick='favorite(" + rss_id + ")' class='" + favorite + " " + parity + " rss-item'>";
	var innerdiv = "<div class='item-text-box'>";
	var content	= "<a href='" + entry.link + "'>" + entry.title + "</a>";
	if(feedData.source == 'cpl')
		content += "<p style='margin: 0'>" + getTimes(entry.content) + " at the " + getLocation(entry.content) + "</p>";
	return outerdiv + innerdiv + content;

}

function getLocation(content) {
	//grab location
	var locobj = content.split('<br>')[1].split(' at ');
	return locobj[1];

}

function getTimes(content) {
	var timeobj	= content.split('<br>')[0].split(' ');
	var startTime = new Date();
	var endTime = new Date();

	var datestring = [(timeobj.slice(2,5)).join(' '), timeobj.slice(6,8).join(' ')].join(' ');
	startTime.setTime(Date.parse(datestring));

	datestring = [(timeobj.slice(2,5)).join(' '), timeobj.slice(9,11).join(' ')].join(' ');
	endTime.setTime(Date.parse(datestring));

	return "From " + getCentralTime(startTime) + " to " + getCentralTime(endTime);
}

/* Returns the time of the event in central time.
 * Formats the time correctly.
 */
function getCentralTime(date) {
	var time = date.toLocaleTimeString();
	return time.substr(0, time.lastIndexOf(":")) + " " + time.substr(time.indexOf(" ") + 1, time.length);
}


function getOptions() {

	feed = feedData.source;

	switch(feed) {
		case 'cpl':
			return " \
				<option value='cpl'>Champaign Public Library Events</option> \
				<option value='cm'>Chambanamoms</option> \
				<option value='uw'>United Way Blog</option>"

		case 'uw':
			return " \
				<option value='uw'>United Way Blog</option> \
				<option value='cpl'>Champaign Public Library Events</option> \
				<option value='cm'>Chambanamoms</option>"

		case 'cm':
			return " \
				<option value='cm'>Chambanamoms</option> \
				<option value='uw'>United Way Blog</option> \
				<option value='cpl'>Champaign Public Library Events</option>"

		default:
			console.log("Get henry to debug this page. It's not working right!!");
			return " \
				<option value='cpl'>Champaign Public Library Events</option> \
				<option value='cm'>Chambanamoms</option> \
				<option value='uw'>United Way Blog</option>"
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



// Returns back an array of ids of favorited news items
function getFavoritedNews() {
	var datastring = "user_id=" + localStorage.pid;
	var linkIdArray = new Array();
	$.ajax({ 
		type: "POST",
		url: "php/getFavoritedNews.php",
		data: datastring,
		cache: false,
		async: false, // must be synchronous, sorry! 
		success: function(idArray) {

			var pairArray = jQuery.parseJSON(idArray);
			for(var i = 0; i < pairArray.length; i++) {
				var link = pairArray[i][1];
				var id = pairArray[i][0];
				linkIdArray[link] = id;		// Stores everything as a link-id pair
			}
		}
	});

	return linkIdArray;


}