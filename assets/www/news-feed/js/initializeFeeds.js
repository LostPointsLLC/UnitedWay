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



	for(var i = 0; i < entries.length; i++) {
		feedContainer.innerHTML += getRSSItem(entries[i], i);
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
	
	var outerdiv = "<div id='" + rss_id + "' onClick='favorite(&quot;" + rss_id + "&quot;, &quot;" + entry.link + "&quot;)' class='" + favorite + " rss-item'>";
	var innerdiv = "<div class='item-text-box'>";
	var content	= "<a href='" + entry.link + "'><h3 style='margin: 0'>" + entry.title + "</h3></a>";
	if(feedData.source == 'cpl')
		content += "<p style='margin: 0'>" + getTimes(entry.content);
	
	else if(feedData.source == 'uw')
		content += "<p style='margin: 0'>" + getBlogTimes(entry.publishedDate);
	return outerdiv + innerdiv + content;

}

/* Returns the published date in a more friendly format */
function getBlogTimes(publishDate) {
	console.log(publishDate);
	var times = publishDate.split(' ');
	return times[0] + " " + times[1] + " " + times[2] + " " + times[3];

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
	
	return timeobj[1] + " " + timeobj[2] + " " + timeobj[3].slice(0, timeobj.indexOf(",")) + " from " + getCentralTime(startTime) + " to " + getCentralTime(endTime);
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
			if(localStorage.lang=="ENG")
				return " \
				<option value='cpl'>Champaign Public Library Events</option> \
				<option value='cm'>Chambanamoms</option> \
				<option value='uw'>United Way Blog</option>"
			else
				return " \
				<option value='cpl'>Champaign Biblioteca P&uacute;blica de eventos</option> \
				<option value='cm'>Chambanamoms</option> \
				<option value='uw'>United Way Blog</option>"

		case 'uw':
			if(localStorage.lang=="ENG")
				return " \
				<option value='uw'>United Way Blog</option> \
				<option value='cpl'>Champaign Public Library Events</option> \
				<option value='cm'>Chambanamoms</option>"
			else
				return " \
				<option value='uw'>United Way Blog</option> \
				<option value='cpl'>Champaign Biblioteca P&uacute;blica de eventos</option> \
				<option value='cm'>Chambanamoms</option>"

		case 'cm':
			if(localStorage.lang=="ENG")
				return " \
				<option value='cm'>Chambanamoms</option> \
				<option value='uw'>United Way Blog</option> \
				<option value='cpl'>Champaign Public Library Events</option>"
			else
				return " \
				<option value='cm'>Chambanamoms</option> \
				<option value='uw'>United Way Blog</option> \
				<option value='cpl'>Champaign Biblioteca P&uacute;blica de eventos</option>"

		default:
			console.log("Get henry to debug this page. It's not working right!!");
			return " \
				<option value='cpl'>Champaign Public Library Events</option> \
				<option value='cm'>Chambanamoms</option> \
				<option value='uw'>United Way Blog</option>"
	}
}



/* Checks whether the entry is in the global feedArray
 * Currently, I can only do a O(n) algorithm for this, but
 * I definitely want to find a nice way to do this in the future.
 * There are trivial data structures I could make to do this in O(lg n) time.
 */
function checkIfFavorited(entry) {
	if(entry.link in linkIdArray)
		return linkIdArray[entry.link][0];
	return -1;
}



// Returns back an array of ids of favorited news items
function getFavoritedNews() {
	var datastring = "user_id=" + localStorage.pid.toString();
	var linkIdArray = jQuery.parseJSON(localStorage.rssJsonObject);
	/*
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
	*/
	console.log(linkIdArray);
	return linkIdArray;


}