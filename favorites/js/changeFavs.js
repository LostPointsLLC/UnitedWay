// Callback function, receives string, int, int
function unfavoriteTips(taskCat, ageIndex, fav_typeID) {
	var divID = taskCat + ageIndex + fav_typeID;
	if(promptUserTips(divID)) {
		$("#" + String(divID)).hide();
		var aInd = parseInt(ageIndex);
		fav_typeID;
		// Logic here handles tips that are deleted
		var jObj = jQuery.parseJSON(localStorage.tipJsonObject);
		var tipArr = jObj[taskCat][aInd];
		
		// Initialize addFavArr and delFavArr
		var addObj = jQuery.parseJSON(localStorage.addObj);
		var addFavArr = addObj[taskCat][aInd];
		
		var delObj = jQuery.parseJSON(localStorage.delObj);
		var delFavArr = delObj[taskCat][aInd];
		
		// If tip is in localStorage.childJsonObject, remove (splice) it
		var tipIndex = tipArr.indexOf(fav_typeID);
		tipArr.splice(tipIndex, 1);
		
		// If tip is in addFavArr, remove (splice) it
		var addIndex = addFavArr.indexOf(fav_typeID);
		if (addIndex > -1){
			addFavArr.splice(addIndex, 1);
		}
		else { // else, add the tip to delFavArr
			delFavArr.push(fav_typeID);
		}
		
		// Seal the deal
		localStorage.tipJsonObject = JSON.stringify(jObj);
		localStorage.addObj = JSON.stringify(addObj);
		localStorage.delObj = JSON.stringify(delObj);
		console.log("=== current tips object === ");
		console.log(localStorage.tipJsonObject);
		console.log("=== addObj === ");
		console.log(localStorage.addObj);
		console.log("=== delObj === ");
		console.log(localStorage.delObj);
	
		var parent = document.getElementById(divID).parentNode;
		var list = parent.getElementsByClassName("list-item");
		if(allAreHidden(list)) {
			parent.innerHTML = "<p>No tips to display!</p>";
		}
	}
}

// Callback function, receives string, string, string
function unfavoriteRss (rssKey, rssTitle, rssUrl) {
	if(!promptUserRss(rssTitle)) { // prompt the user on touch
		return;
	}
	$("#" + rssKey).hide();
	// Initialize necessary Objects
	var remObj = jQuery.parseJSON(localStorage.rssRemObj);
	var addObj = jQuery.parseJSON(localStorage.rssAddObj);
	var rssObj = jQuery.parseJSON(localStorage.rssJsonObject);
	
	// INDEX USING rssUrl (common key amongst the three objects)
	if (rssUrl in addObj)
		delete addObj[rssUrl];
	else  {
		var bObj = jQuery.parseJSON(localStorage.rssBackupObject);
		if (rssUrl in bObj)
			remObj[rssUrl] = bObj[rssUrl];
		else
			remObj[rssUrl] = rssObj[rssUrl];
	}
	// Update localStorage.rssJsonObject (Delete from it)
	delete rssObj[rssUrl];
	
	// Re-Stringify JSON objects back to local storage
	localStorage.rssJsonObject = JSON.stringify(rssObj);
	localStorage.rssAddObj = JSON.stringify(addObj);
	localStorage.rssRemObj = JSON.stringify(remObj);
}
function promptUserRss(rssTitle) {
	try {
		var text = rssTitle;
		var newText = text.substring(0, 50);
		if (newText.length > 50)
			text += "...";
	}	
	catch(error) {
		console.log("Note: Trying to delete an undefined div");
	}
	return confirm("Delete Feed: \"" + newText + "\"?");
}

function promptUserTips(div_id) {
	try {
		var anchor = document.getElementById(String(div_id)).firstChild.firstChild;
		var text = anchor.innerHTML;
		var newText = text.substring(0, 50);
		if (newText.length > 50)
			text += "...";
	}	
	catch(error) {
		console.log("Note: Trying to delete an undefined div_id");
	}
	return confirm("Delete Tip: \"" + newText + "\"?");
}

function allAreHidden(list) {
	console.log(list.length);
	for(var i = 0; i < list.length; i++) {
		if(list[i].style.display != "none")
			return false;
	}
	return true;
}