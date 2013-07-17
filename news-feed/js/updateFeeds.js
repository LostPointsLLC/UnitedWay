
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
		rssArray[0]	= entries[id].link;
		rssArray[1]	= entries[id].title;
		rssArray[2]	= headline; // Acquired from news-feed.js
		rssObjects.push(rssArray);
	}
	return "rssObjects=" + JSON.stringify(rssObjects);	
}



function onExit() {

	addFeeds();
	document.location.href="../home/";
}

function onHelp() {
	addFeeds();
	document.location.href="../help/News Feeds.html";

}
