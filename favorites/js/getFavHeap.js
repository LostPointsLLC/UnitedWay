/* Helps define objects in the global space. All of these
 * objects are defined according to the schema used from the 
 * database for consistency.
 */
 
 /*
function rss(rss_id, rss_url, rss_title, rss_source) {
   this.rss_id = rss_id;
   this.rss_url = rss_url;
   this.rss_title = rss_title;
   this.rss_source = rss_source;
}
*/

// Another constructor, but takes in a row as a parameter
function rss(rssRow) {
	this.rss_id = rssRow[0];
	this.rss_url = rssRow[1];
	this.rss_title = rssRow[2];
	this.rss_source = rssRow[3];
	this.fav_id = rssRow[4];
}

/*
function tip(tip_id, tip_age, tip_category, tip_content) {
   this.tip_id = tip_id;
   this.tip_age = tip_age;
   this.tip_category = tip_category;
   this.tip_content = tip_content;
}
*/

// Another constructor, but takes in a row as a parameter
function tip(tipRow) {
	this.tip_id = tipRow[0];
	this.tip_age = tipRow[1];
	this.tip_category = tipRow[2];
	this.tip_content = tipRow[3];
	this.fav_id = tipRow[4];
}

/*
// Had to add an underscore because "event" is a keyword, apparently
function _event(event_id, event_date, event_time, event_url, event_place, event_title, event_sponsor) {
   this.event_id = event_id;
   this.event_date = event_date;
   this.event_time = event_time;
   this.event_url = event_url;
   this.event_place = event_place;
   this.event_title = event_title;
   this.event_sponsor = event_sponsor;

}
*/

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


function favHeap(rssArray, tipArray, eventArray) {
   this.rssArray = rssArray;
   this.tipArray = tipArray;
   this.eventArray = eventArray;
}


// Function that returns an array of all of the favorite objects.
// Returns a favHeap object.
function getFavHeap(userID) {
	var datastring = 'userID=' + userID;
	
	var rssArray = new Array();
	var tipsArray = new Array();
	var eventsArray = new Array();
	
	$.ajax({
		type: "POST",
		url: "php/getHeap.php",
		data: datastring,
		async: false,
		cache: false,
		success: function(data) {
	
			// Makes the JSON string into a workable string
			var query_output = jQuery.parseJSON(data);
			
			// First make an array full of RSS objects

			$.each(query_output[0], function(index_of_row, row) {
				rssArray.push(new rss(row));
			});
			
			// Next make array full of tips

			$.each(query_output[1], function(index_of_row, row) {
				tipsArray.push(new tip(row));
			});
			
			// Last make array full of events

			$.each(query_output[2], function(index_of_row, row) {
				eventsArray.push(new _event(row));
			});
			
		}
	
	});
	
	return new favHeap(rssArray, tipsArray, eventsArray);
}
