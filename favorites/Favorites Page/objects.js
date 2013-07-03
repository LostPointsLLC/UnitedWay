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
 
 function tip(tip_id, tip_age, tip_category, tip_title) {
	this.tip_id = tip_id;
	this.tip_age = tip_age;
	this.tip_category = tip_category;
	this.tip_title = tip_title;
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
 
 function favHeap(rssArray, tipArray, eventArray) {
	this.rssArray = rssArray;
	this.tipArray = tipArray;
	this.eventArray = eventArray;
 }