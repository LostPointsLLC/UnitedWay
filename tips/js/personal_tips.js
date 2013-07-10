$(document).ready(function() {
	// Display Picture
	var tipCategory = sessionStorage.tCat.toString();
	
	/*
	// PHP query 
	var pid = sessionStorage.pid.toString();
	var taskCat = sessionStorage.tCat.toString();
	var childAge = sessionStorage.age.toString();
	var dataString = "pid=" + pid + "&taskCat=" + taskCat + "&childAge=" + childAge;
	
	$.ajax({
		type: "POST",
		url: "php/fetchTips.php",
		data: dataString,
		cache: false,
		success: function(data){
			console.log(data);
			displayTips(data);
		}
	 });
	 
	 */
	 /* Data in the Form:
	 [{"tip_id":"10","tip_content":"tip content for id 10"}, {"tip_id...}, ...] 
	 */
	 displayTips();
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

function displayTips() {
	// Use session data to figure out child age
	var jObj = jQuery.parseJSON(sessionStorage.jsonString);
	var childID = sessionStorage.cid;
	var ageInMonths = calculateMonth(jObj[childID]["child_birthday"]);
	// Get child age in months (from functions.js)
	// Then get whatever age category the child fits in.
	var ageIndex = calcCat(ageInMonths);

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
	
	for (var i = 0; i < tipArray.length; i++) {
	

		var entry = "<div class='tip'><p>" + tipArray[i] + "</p></div>";
		$("#frontpiece").append(entry);
		
		
		
	}
}

function goBack() {
	document.location.href = "personal_cat.html";
}

