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
	feedArray.splice(index, 1);
}



function addFeeds() {

	if(!feedArray.length) return;			// Quickly exits page if nothing to be modified
	var rssObjects = getFeedString();		// Converts the array into a string

	// Appends the user ID to the query
	var datastring = "user_id=" + sessionStorage.pid + "&" + rssObjects;


	$.ajax({ 
		type: "POST",
		url: "php/addFeeds.php",
		data: datastring,
		cache: false,
		async: false, // must be synchronous, sorry! 
	});


}

// Uses the feedArray above to create a JSON string of RSS objects
function getFeedString() {

	var rssObjects = new Array();

	// Note that this uses the thefeeds variable from news-feed.js
	while(feedArray.length) {
		var id = feedArray.pop();
		var rssArray = new Array();
		rssArray[0]	= thefeeds[id].link;
		rssArray[1]	= thefeeds[id].title;
		rssArray[2]	= headline; // Acquired from news-feed.js
		rssObjects.push(rssArray);
	}
	return "rssObjects=" + JSON.stringify(rssObjects);	
}



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


function onExit() {

	addFeeds();
	document.location.href="../home/";
}

function onHelp() {
	addFeeds();
	document.location.href="../help/News Feeds.html";

}
