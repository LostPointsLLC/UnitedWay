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

	linkIdArray = getFavoritedNews();		// Part of stage 1
	initializeFeed();						// Also part of stage 1
	changeFeeds();							// Stage 2
	
	$(window).unload(function() {
		updateFeeds();						// Stage 3
	});
});

/* Generates the header of the favorites page.
 * This function is slightly different than others because it adds news feed favorites 
 * to the database
 * 
 * @param text	: A string containing the text for the title
 * @param home	: A boolean of whether the home button should be shown
 * @param help	: A boolean of whether the help button should be shown
 */
function generateHeader(text, home, help) {
	document.write("<div class='header' id='header'>");	
	// Writes the header to the DOM
	document.write("<div class='title' style='color: white'>" + text + "</div>");
				

	if(help) 
		document.write("<div class='help'><a onClick='onHelp()'><img src='../images/help-button.png'/></a></div>");
	if(home) 
		document.write("<div class='home'><a onClick='onExit()'><img src='../images/home-button.png'/></a></div>");

	document.write("</div>");	

}


