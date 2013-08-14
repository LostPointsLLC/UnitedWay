/*
	Request all information on checked tasks, based on query result
	Automatically check all tasks that need be checked.
*/

// Global variable containing binary string
var gBin;
var dataString;

$(document).ready(function() {
	
	var childID = localStorage.cid.toString(); // localStorage current child ID
	var taskCat = localStorage.cat.toString(); // localStorage current task category
	switch(taskCat) {
		case "1":
			category = "health_code";
			break;
		case "2":
			category = "language_code";
			break;
		case "3":
			category = "social_code";
			break;
		case "4":
			category = "other_code";
			break;
	}
	var jObj = jQuery.parseJSON(localStorage.childJsonObject);
	var binStr = jObj[childID][category]; // fetch binary string from object
	console.log(binStr);
	initializeTasks(binStr, taskCat);
	$("input").change(function(){
		if (!$(this).is(':checked')) {
			var clickedID = $(this).attr('id');
			gBin[parseInt(clickedID)] = "b";
		}
		else {
			var clickedID = $(this).attr('id');
			gBin[parseInt(clickedID)] = "a";
		}
	});
	
});
			
// Called when page is being exited	
$(window).unload( function () {
	var newProgressStr = gBin.join('');				// Converts the global array into a string
	
	// First update current session variables, to correctly print percentages
	var	catStorage = localStorage.cat.toString();
	var	childID = localStorage.cid.toString();

	var parsedCurrentJsonStr = jQuery.parseJSON(localStorage.childJsonObject);
	
	// Figure out what category check list this is
	var category = "";
	switch(catStorage) {
		case "1":
			category = "health_code";
			break;
		case "2":
			category = "language_code";
			break;
		case "3":
			category = "social_code";
			break;
		case "4":
			category = "other_code";
			break;
	}
	// Configure child dirty bit collection, used later when sync with online database
	var childDB = jQuery.parseJSON(localStorage.childTracker);
	childDB[childID] = true;
	localStorage.childTracker = JSON.stringify(childDB);
	
	// Store final version back into child JSON object
	parsedCurrentJsonStr[childID][category] = newProgressStr;
	localStorage.childJsonObject = JSON.stringify(parsedCurrentJsonStr);
	console.log(localStorage.childTracker);
});

// Iterate through array of task bits, create list of tasks based off of this
function initializeTasks(checkString, tid) {
	// Select the right category. All tasks stored in tasks.js
	var texts;
	switch(tid) {
		case "1":
		if(localStorage.lang=="ENG"){
			texts = healthTasks;
			break;
		}
		else{
			texts = healthTasks_es;
			break;
		}
		case "2":
		if(localStorage.lang=="ENG"){
			texts = languageTasks;
			break;
		}
		else{
			texts = languageTasks_es;
			break;
		}
		case "3":
		if(localStorage.lang=="ENG"){
			texts = socialTasks;
			break;
		}
		else{
			texts = socialTasks_es;
			break;
		}
		case "4":
		if(localStorage.lang=="ENG"){
			texts = otherTasks;
			break;
		}
		else{
			texts = otherTasks_es;
			break;
		}
	}


	checkString = checkString.replace(/^\s+|\s+$/g, ''); // regex. trims all whitespace
	var binaryArray = checkString.split("");	// Returns array
	gBin = binaryArray; // assign to global array.
	
	
	// Iterates through the given binary a, b string.	
	for (var i = 0; i < binaryArray.length; i++) {
	
		var checkBool = "";
		
		// If the string at position i is a, then assign value to be checked
		if (binaryArray[i] == "a") {
			checkBool = "checked";
		}
		
		// Creates a checkbox item that has the text we want.
		var inside = "<input type='checkbox' name='checkers' " + checkBool + " class='check' id=" + i + " />";
		inside += "<label for=" + i + " class='label-for-check'>" + texts[i] + "</label>";
		
		// Pads "inside" with list item things.
		var entry = "<li>" + inside + "</li>";
		$("#checklist").append(entry);

	}

}

function generateSubTitle(text) {
	document.write("<div id='content-title' style='color: white'>");
	document.write("<span class='title-text'>" + text + "</span>");
	document.write("</div>");
}
