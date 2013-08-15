/* Phase three of the page
 */
function updateFeeds() {
	// if(!removeFromDb.length && !addToDb.length) {
	if(isEmpty(removeFromDb) && isEmpty(addToDb)) {
		console.log("nothing modified!");
		return;	// Quickly exits page if nothing to be modified
	}
	var removeString = getRemoveString();
	var addString = getAddString();
	var category = "rss";
	// Appends the user ID to the query
	var	datastring = "user_id=" + localStorage.pid.toString() + "&removeString=" + removeString + "&addString=" + addString +  "&category=" + category;
	/*
	 * Need to update local storage here!
	 * addString is a JSON string of an array of [URL, TITLE, SOURCE] triplets
	 * removeString is a JSON string of an array of the id's of favourite items the must be removed
	 */

	// Update localStorage.rssJsonObject
	var rssFeedObj = jQuery.parseJSON(localStorage.rssJsonObject); // local object containing snapshot of what should be in database.
	var rssAddObj = jQuery.parseJSON(localStorage.rssAddObj); // local object containing all triplets that should be added to database at sync (collection)
	var rssRemObj = jQuery.parseJSON(localStorage.rssRemObj); // local object containing all id's of fav feeds that will be removed on database sync (array)
	var fakeIdIncrement = jQuery.parseJSON(localStorage.fakeIdIncrement); // Increment for Fake ID's! Fake ID's are only used locally, through one session.

	var newAddObj = jQuery.parseJSON(addString);
	var newRemObj = jQuery.parseJSON(removeString);

	// If there are item's is in add string, add the item to rssFeedObj (rssJsonObject),
	// To store in the rssFeedObj, use a FAKE ID (since this entry hasn't been in the database yet), which we generate by appending 0 in front of a global increment
	// Also add the item in the format : 'URL': [URL, TITLE, SRC] to rssAddObj (if item is already in rssRemObj, remove it from there)
	var fakeIdNum = parseInt(fakeIdIncrement);
	for (var i = 0; i < newAddObj.length; i++) {
		// Add to rssFeedObj
		// Generate fakeID
		var newURL = newAddObj[i][0];
		var fakeID = "0" + fakeIdNum; // Append zero to the front. No existing 'real' ID's start with zero (they are practically used as strings, anyway) 
		fakeIdNum++; // Increment fakeIdIncrement
		rssFeedObj[newURL] = [fakeID, newAddObj[i][1], newAddObj[i][2], "X"]; // "URL" : [(fake)ID, TITLE, SOURCE, fav ID (use fakeID)]

		// Add to rssAddObj. 
		if ( newURL in rssRemObj) { // If an item that is in the add string is already in rssRemObj, remove the item from rssRemObj
			delete rssRemObj[newURL];
		}
		else { // else add "URL" : [URL, TITLE, SOURCE] to rssAddObj
			rssAddObj[newURL] = newAddObj[i];
		}
	}
	fakeIdIncrement = fakeIdNum.toString();

	// If item is in remove string, remove item from the rssJsonObject.
	for (var key in newRemObj) {
		// Remove from rssFeedObj
		if (key in rssFeedObj)
			delete rssFeedObj[key];

		// Add to rssRemObj
		if ( key in rssAddObj) { // If an item that is in the add string is already in rssRemObj, remove the item from rssRemObj
			delete rssAddObj[key];
		}
		else { // else add "URL" : ID to rssRemObj
			rssRemObj[key] = newRemObj[key];
		}
	}
	// JSON stringify everything
	localStorage.rssJsonObject = JSON.stringify(rssFeedObj);
	localStorage.rssAddObj = JSON.stringify(rssAddObj);
	localStorage.rssRemObj = JSON.stringify(rssRemObj);
	localStorage.fakeIdIncrement = JSON.stringify(fakeIdIncrement);

	// Console prints for debugging
	console.log("===== News Feed Object (After update) =====");
	console.log(localStorage.rssJsonObject);
	console.log("===== News Feed Object AddObj =====");
	console.log(localStorage.rssAddObj);
	console.log("===== News Feed Object RemObj =====");
	console.log(localStorage.rssRemObj);
	console.log("===== News Feed Fake Increment =====");
	console.log(localStorage.fakeIdIncrement);


	/*
	console.log(datastring);
	console.log(localStorage.pid.toString());
	
	$.ajax({ 
		type: "POST",
		url: "../php/updateFavorites.php",
		data: datastring,
		cache: false,
		async: false, // must be synchronous, sorry! 
	});
	*/

}

// Uses the addToDb array to create a JSON string of array objects
function getAddString() {

	var addArray = new Array();

	// Note that this uses the thefeeds variable from news-feed.js
	while(addToDb.length) {
		var id = parseInt(addToDb.pop());
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
	document.location.href="../home/index.html";
}

function onHelp() {
	document.location.href="../help/News Feeds.html";
}

// Check if object is empty
function isEmpty(ob){
   for(var i in ob){ return false;}
  return true;
}
