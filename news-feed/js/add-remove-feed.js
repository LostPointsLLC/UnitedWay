
/* An array containing the *current* ids of news feed
 * items to be added to the database.
 */
var feedArray = new Array();

// Adds the given id to feedArray
function addFeed(id) {
	feedArray.push(id);
}

// Removes the given id from feedArray
function removeFeed(id) {
	var index = feedArray.indexOf(id);
	feedArray = feedArray.splice(index, 1); 
}


$(document).ready(function() {

	// Called when page is being exited	
	$(window).unload( function () {

	
		feedString = getFeedArrayString;

		
		$.ajax({ 
			type: "POST",
			url: "php/addFeeds.php",
			data: feedString,
			cache: false,
			async: false // must be asynchronous, sorry! 
		});
	});




});


// Uses the feedArray above to create a JSON string of RSS objects
function getFeedString() {

	// feedArrays is an array of arrays that represent RSS objects
	var feedArrays;

	// Note that this uses the theFeeds variable from news-feed.js
	while(feedArray.length > 0) {
		var id = feedArray.pop();
		var rssArray = new Array();
		rssArray['url']		= theFeeds[i].link;
		rssArray['title']	= theFeeds[i].title;
		rssArray['source']	= headline; // Acquired from news-feed.js
		feedArray.push(rssArray);
	}
	alert("feedArray=" + JSON.stringify(feedArray));
	return "feedArray=" + JSON.stringify(feedArray);	
}





