var linkIdArray;		// Global array containing pairs of url-rssID pairs
var feedData;			// Global object containing feed data
var entries;			// Contains the feed items

var removeFromDb	= new Array();	// Will contain items already in the db
var addToDb 		= new Array();	// Will contain items not in the db

function rssData(url, limit, title, source) {

	this.rssurl = url;
	this.limit = limit;
	this.title = title;
	this.source = source;
	
}


/* The entrance function for the page. Note that
 * it uses functions available from add-remove-feed.js
 *
 * This function takes place in three stages:
 * 1. Retrieving the already favorited items, and displaying them
 * 2. Get requests to unfavorite items as well as add new ones.
 * 3. Send the request to the server.
 * 
 * I've separated the three phases up into separate .js files for organization.
 */
$(document).ready(function() {

	initializeFeed();						// Stage 1
	changeFeeds();							// Stage 2

	$(window).unload(function() {
		updateFeeds();						// Stage 3
	});
});



