/**
 * Author: Paul Kim
 * Script that makes HTTP request to server to upload local data
 * to database.
 */
 
function dbSync() {
	console.log("Start dbSync()");
	// Assign Local Objects used throughout app
	var pid = localStorage.pid; // userID
	// Edit & Add & Delete Tips objects
	var childTracker = jQuery.parseJSON(localStorage.childTracker);  // {"59":false,"60":true} 
	var childObj = jQuery.parseJSON(localStorage.childJsonObject);
	
	// Use child dirty bits to extract only the info server needs to update db
	var newChildObj = {};
	// Extract only the ones that are true
	for (var track in childTracker) {
		if (childTracker[track] == true) { // check if child has been modified
			console.log(track + ";" + childTracker[track]);
			newChildObj[track] = childObj[track];
		}
	}
	
	var modifiedChildren = JSON.stringify(newChildObj);
	var newChildren = localStorage.newChildren;  //{"1Noah":{"child_id":"1Noah","child_birthday":"2012-....}, {"50":{"child_id...} ...} ...}
	var delChildren = localStorage.delChildren;  // ["60", "50", ...]
	
	// Add & Delete Tips objects
	var favTips = localStorage.addObj; //addFavArr {"health":[[],[],["1", "2"],[],[],[],[],[],[],[]],"growth":[[]...
	var unfavTips = localStorage.delObj; //delFavArr {"health":[[],[],[],[],[],[],[],[],[],["0", "5"]],"growth":[[]...
	
	// Add & Delete Rss objects. Reformat these so server has minimal data needed
	var rssAddObj = jQuery.parseJSON(localStorage.rssAddObj); // {"url":["url", "title", "source"]}
	var rssRemObj = jQuery.parseJSON(localStorage.rssRemObj); // {"url":["295(fav_typeID)","Goodnight Storytime","Champaign Public Library Events","484(fav_id)"]}
	var newRssAddObj = {};
	var newRssRemObj = [];
	
	for (var feed in rssAddObj) {
		newRssAddObj[feed] = rssAddObj[feed];
	}
	
	for (var feed in rssRemObj) {
		newRssRemObj.push(rssRemObj[feed][3]); // just get the fav_id
	}
	
	var addRss = JSON.stringify(newRssAddObj);
	var delRss = JSON.stringify(newRssRemObj);
	/*
	 * Now make server request
	 */
	 
	 // Create dataString
	var dataString = "";
	dataString += "pid=";
	dataString += pid;
	dataString += "&new_children=";
	dataString += newChildren;
	dataString += "&del_children=";
	dataString += delChildren;
	dataString += "&modified_children=";
	dataString += modifiedChildren;
	dataString += "&fav_tips=";
	dataString += favTips;
	dataString += "&unfav_tips=";
	dataString += unfavTips;
	dataString += "&add_rss=";
	dataString += addRss.replace(/\'/g, "`");
	dataString += "&del_rss=";
	dataString += delRss;
	console.log("Right before Sync");
	console.log(dataString);
	
	var httpRequest;
	var phpUrl = "http://unitedway.lostpointsllc.com/php/dbSync.php";
	
	/*
	 * Make Ajax Call here
	 */ 
	
	// Create XML/HTTP Request object.
	// Different browsers use different objects!
	if (window.XMLHttpRequest)
	{// code for IE7+, Firefox, Chrome, Opera, Safari
		httpRequest= new XMLHttpRequest();
	}
	else
	{// code for IE6, IE5
		httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
	}
	// Handle PHP returns
	httpRequest.onreadystatechange=function() {
		if (httpRequest.readyState == 4 && httpRequest.status == 200) {
			var result = httpRequest.responseText.trim();
			var str = result.split("|");
			var ret = str[0].trim();
			if (ret == "FAIL") {
				console.log("Failed to sync with cloud. Check internet connection");
			}
			else {
				// Reset localStorage values that keep track.
				resetLocalStorage(str[1]);
				console.log("Completed Sync");
			}
			
		}
	}	
	// Send the request to server!
	httpRequest.open("POST", phpUrl, true);
	httpRequest.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	httpRequest.send(dataString);
	 console.log("Sync Complete");
}

// Reset All tracker storages
function resetLocalStorage(newRss) {
	var linkIdArray = {};
	var pairArray = jQuery.parseJSON(newRss);
	for(var i = 0; i < pairArray.length; i++) {
		var link = pairArray[i][1];
		var id = pairArray[i][0];
		var title = pairArray[i][2];
		var source = pairArray[i][3];
		var fav_id = pairArray[i][4];
		linkIdArray[link] = [id, title, source, fav_id];		// Stores everything as a link-id pair
	}
	localStorage.rssJsonObject = JSON.stringify(linkIdArray);
	localStorage.rssBackupObject = JSON.stringify(linkIdArray);
	
	// Keep an associative array of child ID's
	var childDB = {}; // new object
	var childJObj = jQuery.parseJSON(localStorage.childJsonObject);
	for (var key in childJObj) {
		childDB[key] = false; // every untouched child is initialized as false.
	}
	localStorage.childTracker = JSON.stringify(childDB);
	
	// Keep list of any new children (their child id's)
	var newChildren = {};
	localStorage.newChildren = JSON.stringify(newChildren);
	// Keep list of any deleted childen (their child id's)
	var delChildren = [];
	localStorage.delChildren = JSON.stringify(delChildren);
	
	// Keep addFavArr and delFavArr for favouring/unfavouring tips.
	var addFavArr = {};
	var delFavArr = {};
	addFavArr["health"] = [[], [], [], [], [], [], [], [], [], []];
	addFavArr["growth"] = [[], [], [], [], [], [], [], [], [], []];
	addFavArr["safety"] = [[], [], [], [], [], [], [], [], [], []];
	addFavArr["playtime"] = [[], [], [], [], [], [], [], [], [], []];
	
	delFavArr["health"] = [[], [], [], [], [], [], [], [], [], []];
	delFavArr["growth"] = [[], [], [], [], [], [], [], [], [], []];
	delFavArr["safety"] = [[], [], [], [], [], [], [], [], [], []];
	delFavArr["playtime"] = [[], [], [], [], [], [], [], [], [], []];
	
	localStorage.addObj = JSON.stringify(addFavArr);
	localStorage.delObj = JSON.stringify(delFavArr); 
	// Keep add & remove arrays for rss favorites.
	localStorage.rssAddObj = "{}";
	localStorage.rssRemObj = "{}";
	localStorage.fakeIdIncrement = "0";
	localStorage.edit_childID = '-1';
	localStorage.fromSettings = '0';
}
