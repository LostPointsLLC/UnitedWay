$(document).ready(function() {
	// Display Picture
	var tipCategory = sessionStorage.tCat.toString();
	
	
	// PHP query 
	var jObj = jQuery.parseJSON(sessionStorage.jsonString);
	var pid = sessionStorage.pid.toString();
	var taskCat = sessionStorage.tCat.toString();
	var childID = sessionStorage.cid;
	// Get child age in months (from functions.js)
	// Then get whatever age category the child fits in.
	var monthcount = calculateMonth(jObj[childID]["child_birthday"]);
	var ageIndex = calcCat(monthcount);
	
	var dataString = "pid=" + pid + "&taskCat=" + taskCat + "&ageIndex=" + ageIndex;
	console.log("age in month is is : " + monthcount);
	console.log("age category is : " + ageIndex);
	
	$.ajax({
		type: "POST",
		url: "php/fetchFavTips.php",
		data: dataString,
		cache: false,
		success: function(data){
			console.log(data);
			displayTips(data);
		}
	 });
	 
	 
	 //displayTips();
});

/**
 * Display tips for particular age/ category
 */
 /*
function displayTips (param) {
	//var input = jQuery.parseJSON(param);
	var tipsList = input[0];
	// Loop through and list all tips.
	// Each tip has a unique tip_id, use this in our advantage
	for (var key in tipsList) {
		var tipText = tipsList[key]["tip_content"];
		var entry = "<li>" + tipText + "</li>";
		$("#frontpiece").append(entry);
	}
}
*/

function displayTips(param) {
	// Use session data to figure out child age
	var jObj = jQuery.parseJSON(sessionStorage.jsonString);
	var childID = sessionStorage.cid;
	// Get child age in months (from functions.js)
	// Then get whatever age category the child fits in.
	var monthcount = calculateMonth(jObj[childID]["child_birthday"]);
	var ageIndex = calcCat(monthcount);
	// Category ID "health", "growth", "safety", "playtime"
	var tipCategory = sessionStorage.tCat.toString();
	var tipArray;
	switch(tipCategory) {
		case "health":
			tipArray = healthArray[ageIndex];
			break;
			
		case "growth":
			tipArray = growthArray[ageIndex];
			break;
			
		case "safety":
			tipArray = safetyArray[ageIndex];
			break;
			
		case "playtime":
			tipArray = playtimeArray[ageIndex];
			break;
	}
	
	// Parse Favorites Array Here
	var fObj = jQuery.parseJSON(param);
	var favArray = new Array();
	for (var key in fObj) {
		favArray.push(parseInt(fObj[key]));
	}
		
	for (var i = 0; i < tipArray.length; i++) {
		// odd or even
		var ctnClass;
		if (i % 2 == 0) {
			ctnClass = "tip-ctn-even";
		}
		else{
			ctnClass = "tip-ctn-odd";
		}
		
		var entry;
		if (jQuery.inArray(i, favArray) != -1) {
			entry = "<div class='" + ctnClass + "' ><div class='tip'><p class='fav'>" + tipArray[i] + "</p></div></div>";
		}
		else {
			entry = "<div class='" + ctnClass + "' ><div class='tip'><p class='notfav'>" + tipArray[i] + "</p></div></div>";
		}
		$("#frontpiece").append(entry);
	}
}

function goBack() {
	document.location.href = "personal_cat.html";
}

