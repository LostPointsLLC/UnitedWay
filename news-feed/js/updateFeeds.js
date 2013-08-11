/* Phase three of the page
 */
function updateFeeds() {

	if(!removeFromDb.length && !addToDb.length) return;	// Quickly exits page if nothing to be modified
	var removeString = getRemoveString();
	var addString = getAddString();
	var category = "rss";
	// Appends the user ID to the query
	var	datastring = "user_id=" + localStorage.pid + "&removeString=" + removeString + "&addString=" + addString +  "&category=" + category;
	console.log(datastring);
	
	$.ajax({ 
		type: "POST",
		url: "../php/updateFavorites.php",
		data: datastring,
		cache: false,
		async: false, // must be synchronous, sorry! 
	});
}

// Uses the addToDb array to create a JSON string of array objects
function getAddString() {

	var addArray = new Array();

	// Note that this uses the thefeeds variable from news-feed.js
	while(addToDb.length) {
		var id = addToDb.pop();
		var rssArray = new Array();
		id = (-1 * id) - 1;
		rssArray[0]	= entries[id].link;
		rssArray[1]	= entries[id].title;
		rssArray[2]	= feedData.title; // Acquired from news-feed.js
		addArray.push(rssArray);
	}
	return JSON.stringify(addArray);	
}

function getRemoveString() {
	return JSON.stringify(removeFromDb);	
}


function onExit() {
	document.location.href="../home/";
}

function onHelp() {
	document.location.href="../help/News Feeds.html";
}
