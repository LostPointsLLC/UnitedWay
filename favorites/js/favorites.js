/* Helps define objects in the global space. All of these
 * objects are defined according to the schema used from the 
 * database for consistency.
 */
 
// Another constructor, but takes in a row as a parameter
function rss(rssRow) {
	this.rss_id = rssRow[0];
	this.rss_url = rssRow[1];
	this.rss_title = rssRow[2];
	this.rss_source = rssRow[3];
	this.fav_id		= rssRow[4];
}


// Another constructor, but takes in a row as a parameter
function tip(tipRow) {
	this.tip_id = tipRow[0];
	this.tip_age = tipRow[1];
	this.tip_category = tipRow[2];
	this.fav_id		= tipRow[3];
}


function _event(eventRow) {
    this.event_id = eventRow[0];
    this.event_date = eventRow[1];
    this.event_time = eventRow[2];
    this.event_url = eventRow[3];
    this.event_place = eventRow[4];
    this.event_title = eventRow[5];
    this.event_sponsor = eventRow[6];
	this.fav_id = eventRow[7];
}


function favHeap(rssArray, tipsArray, eventsArray) {
   this.rssArray = rssArray;
   this.tipsArray = tipsArray;
   this.eventsArray = eventsArray;
}

var deleteArray = new Array();
var fav_limit = 8;				// The number of items to be shown per feed
/* Main method of favorites.
 * 
 * This function is broken down ino three phases
 * 1. Initializing/displaying the favorites
 * 2. Changing which favorites should be deleted
 * 3. Updating the database
 */
$(document).ready(function() {

	initializeFavs();
	changeFavs();
	
	$(window).unload(function() {
		updateFavs();
	
	});
	
});