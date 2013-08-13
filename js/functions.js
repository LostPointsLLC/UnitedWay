/**
 * Calculate age of child in months.
 *
 */
 
 function calculateMonth(birthdate) {
 	var currentdate = new Date(); 
	var currentYr =  currentdate.getFullYear();
	var currentMth = currentdate.getMonth() + 1;
	var dateArray = birthdate.split("-");
	var birthYr = parseInt(dateArray[0]);
	var birthMth = parseInt(dateArray[1]);
	var diff = (currentMth - birthMth + (12 * (currentYr - birthYr)));
	return diff;
 }


/**
 * Calculates accurate age of child (Returns string)
 *
 */

function calculateAge(months) {
    if(localStorage.lang=="ENG"){
        var yrs = " Yrs,<br> ";
        var mth = " Mths";
    }
    else{
        var yrs = " a&ntilde;o,<br> ";
        var mth = " meses";
    }
	if ( (months % 12) > 0) {
		var year = String(parseInt(months / 12));
		var month = String(months % 12);
		var retStr = year + yrs + month + mth;
		return retStr;
	}
	else {
		var month = String(months);
		var retStr = month + mth;
		return retStr;
	}
}

/**
 * Returns number of index (category) used as the first index for any of the 4 tip arrays.
 *
 */
// categories:
// 0: At 0 ~ 2 months
// 1: At 2 ~ 4 months
// 2: At 4 ~ 6 months
// 3: At 6 ~ 12 months
// 4: At 12 ~ 18 months
// 5: At 18 ~ 24 months
// 6: At 24 ~ 36 months
// 7: At 3 yrs old
// 8: At 4 yrs old
// 9: At 5 yrs old

function calcCat(monthcount) {
    if (monthcount >= 0 && monthcount < 2) {
        return 0;   
    }
    else if (monthcount >= 2 && monthcount < 4) {
        return 1;   
    }
    else if (monthcount >= 4 && monthcount < 6) {
        return 2;   
    }
    else if (monthcount >= 6 && monthcount < 12) {
        return 3;   
    }
    else if (monthcount >= 12 && monthcount < 18) {
        return 4;   
    }
    else if (monthcount >= 18 && monthcount < 24) {
        return 5;   
    }
    else if (monthcount >= 24 && monthcount < 36) {
        return 6;   
    }
    else if (monthcount >= 36 && monthcount < 48) {
        return 7;   
    }
    else if (monthcount >= 48 && monthcount < 60) {
        return 8;   
    }
    else if (monthcount >= 60 && monthcount < 72) {
        return 9;   
    }
    else {
        return -1;    
    }
}

function initUserData(pid, childJs, tipJs, rssJs) {
	localStorage.pid = pid; // pid
	if (childJs == "[]") {
		localStorage.childJsonObject = "{}"; // Child JSON Object
	}
	else {
		localStorage.childJsonObject = childJs;
	}
	localStorage.tipJsonObject = tipJs; // Tip JSON Object
	
	var linkIdArray = {};
	var pairArray = jQuery.parseJSON(rssJs);
	for(var i = 0; i < pairArray.length; i++) {
		var link = pairArray[i][1];
		var id = pairArray[i][0];
		var title = pairArray[i][2];
		var source = pairArray[i][3];
		var fav_id = pairArray[i][4];
		linkIdArray[link] = [id, title, source, fav_id];		// Stores everything as a link-id pair
	}
	localStorage.rssJsonObject = JSON.stringify(linkIdArray); // Rss JSON Object
	localStorage.rssBackupObject = JSON.stringify(linkIdArray); // Rss Backup (for remove array, used only in news feed code)
	/*
	 * Assign 'dirty bit' objects to keep track if a certain JSON Object has been changed
	 * These objects MUST be cleared and re-initialized after syncing with the database (this is handled in update script).
	 */
	 
	// Keep an associative array of child ID's
	var childDB = {}; // new object
	var childJObj = jQuery.parseJSON(childJs);
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
	
	// etc...
	localStorage.remember=1;
	setDefaultStorage();
	sessionStorage.logout = "x";
		console.log("===== Child JSON Object =====");
	console.log(localStorage.childJsonObject);
	console.log("===== Tip JSON Object =====");
	console.log(localStorage.tipJsonObject);
	
	console.log("===== Rss JSON Object =====");
	console.log(localStorage.rssJsonObject);
	
	console.log("===== Child Dirty-bit collection =====");
	console.log(localStorage.childTracker);
	
	console.log("===== Arrays that hold new / deletable children =====");
	console.log(localStorage.newChildren);
	console.log(localStorage.delChildren);
	
	console.log("===== Add & Remove arrays for favoured/unfavoured tips =====");
	console.log(localStorage.addObj);
	console.log(localStorage.delObj);
	
	console.log("===== Add & Remove arrays for favoured/unfavoured feeds, fake id increment =====");
	console.log(localStorage.rssAddObj);
	console.log(localStorage.rssRemObj);
}


function setDefaultStorage() {
	localStorage.rss = 'cpl';				// For the news feed page.
	localStorage.dirty = '0';				// A dirty bit indicating whether the localStorage.childJsonObject variable is dirty
	localStorage.edit_childID = '-1';		// Indicates that we're not editing a child
	localStorage.fromSettings = '0';	
}