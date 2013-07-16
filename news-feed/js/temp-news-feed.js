var feedTitle;
var feedArray;

function rssData(url, limit, title, source) {

	this.rssurl = rssurl;
	this.limit = limit;
	this.title = title;
	this.source = source;

}



/* The entrance function for the page. Note that
 * it uses functions available from add-remove-feed.js
 */
$(document).ready() {

	feedArray = getFavoritedNews();		// TODO
	initializeFeed();


}

// Displayes the RSS feed on the page.
function initializeFeed() {

	google.load("feeds", "1");

	var rssurl = "http://host5.evanced.info/champaign/evanced/eventsxml.asp?lib=ALL&nd=30&feedtitle=Champaign+Public+Library+Events&dm=rss2";
	var limit = 4;
	var title = "Champaign Public Library Events";
	var source = "Champaign Public Library";

	feedTitle = title;
	
	var feedData = rssData(rssurl, limit, title, source);
	rssfeedsetup(feedData);	


}


function rssfeedsetup(feedData){
	var feedpointer = new google.feeds.Feed(feedData.rssurl);
	feedpointer.setNumEntries(feedData.limit);
	feedpointer.load(displayfeed); /* Calls the displayfeed function */
}


function displayfeed(result){

	if (!result.error){


		// thefeeds is an array of objects that contains the RSS feed information.
		// thefeeds[i].link is the URL.
		// thefeeds[i].title is the headline.
		var thefeeds = result.feed.entries; 
		
		/* Modifies the rssoutput variable, which will be interpreted as HTML 
		 * Each iteration appends the headline inside a list item <li>
		 */
		for (var i = 0; i < thefeeds.length; i++) {

			var inner = "<div class='inner-div'><p id='" + i + "' class='item-text'><a href='" + thefeeds[i].link + "'>" + thefeeds[i].title + "</a></p></div>"
			var star = "<a onClick='favFunction(" + i + ")'><img src='../images/star-button.png'></a>";

			if(i == thefeeds.length - 1) {
				rssoutput += " <div class='even item last-item'>" + inner + star + "</div>";
				break;
			}
			if(i % 2 == 0) {
				rssoutput += "<div class='even item'>" + inner + star + "</div>";
			}
			else {
				rssoutput += "<div class='odd item'>" + inner + star + "</div>";
			}
		}
		feedcontainer.innerHTML = rssoutput;
	}
	
	else
		alert("Error fetching feeds!");
}



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
		success: function(datastring) {
			alert(datastring);
		}
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
