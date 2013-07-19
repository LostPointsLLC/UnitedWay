/* Helps define objects in the global space. All of these
 * objects are defined according to the schema used from the 
 * database for consistency.
 */
 
 function rss(rss_id, rss_url, rss_title, rss_source) {
	this.rss_id = rss_id;
	this.rss_url = rss_url;
	this.rss_title = rss_title;
	this.rss_source = rss_source;
 }
 
 function rss(rss_attr_array) {
	this.rss_id = rss_attr_array[0];
	this.rss_url = rss_attr_array[1];
	this.rss_title = rss_attr_array[2];
	this.rss_source = rss_attr_array[3];
 
 }
 
 function tip(tip_id, tip_age, tip_category, tip_title) {
	this.tip_id = tip_id;
	this.tip_age = tip_age;
	this.tip_category = tip_category;
	this.tip_title = tip_title;
 }
 
 // Constructor if you're passing in an array of attributes
 function tip(attr_array) {
	this.tip_id = attr_array[0];
	this.tip_age = attr_array[1];
	this.tip_category = attr_array[2];
	this.tip_title = attr_array[3];
 
 }
 
 function event(event_id, event_date, event_time, event_url, event_place, event_title, event_sponsor) {
	this.event_id = event_id;
	this.event_date = event_date;
	this.event_time = event_time;
	this.event_url = event_url;
	this.event_place = event_place;
	this.event_title = event_title;
	this.event_sponsor = event_sponsor;
 
 }
 
 function event(attr_array) {
	this.event_id = attr_array[0];
	this.event_date = attr_array[1];
	this.event_time = attr_array[2];
	this.event_url = attr_array[3];
	this.event_place = attr_array[4];
	this.event_title = attr_array[5];
	this.event_sponsor = attr_array[6];
 
 }
 
 function favHeap(rssArray, tipArray, eventArray) {
	this.rssArray = rssArray;
	this.tipArray = tipArray;
	this.eventArray = eventArray;
 }