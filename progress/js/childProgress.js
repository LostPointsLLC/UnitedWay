/*
	Update progress bars based on a binary string that indicates
	which tasks are complete/incomplete

*/

$(document).ready(function() {

	var	childID = localStorage.cid.toString();
	var	jsonStr = localStorage.jsonString;

	var jObj = jQuery.parseJSON(jsonStr);
	
	// Print picture of child based on gender
	var gender = jObj[childID]["child_gender"];
	var childName = jObj[childID]["child_name"];
	var genderImg;
	switch(gender) {
		case 'boy':
			genderImg = 'child/boy-darkblue-small';
			break;
		default:
			genderImg = 'child/girl-darkblue-small';
			break;
	}
	
	
	var portrait = document.getElementById("child");
	portrait.innerHTML = "<img src='../images/" + genderImg + ".png' width='50' height='50' style='background-color: " + jObj[childID]['child_color'] + "'/><br><span class='child-name'>" + childName + "</span>"
	
	// Create array that indexes child id's
	var indexList = new Array();
	for (var key in jObj) {
		indexList.push(key);
	}
	
	// Bind Arrows with links that would change current child
	$("#left-arrow").click(function() {
		var thisIndex = indexList.indexOf(childID);
		var lastIndex = indexList.length - 1;
		if (thisIndex > 0) { // Not the first child in list
			localStorage.cid = indexList[thisIndex - 1];
			location.reload();
		}
		else { // wrap around if first child
			localStorage.cid = indexList[lastIndex];
			location.reload();
		}
	});
	
	$("#right-arrow").click(function() {
		var thisIndex = indexList.indexOf(childID);
		var lastIndex = indexList.length - 1;
		if (thisIndex < lastIndex) { // Not the last child in list
			localStorage.cid = indexList[thisIndex + 1];
			location.reload();
		}
		else {
			localStorage.cid = indexList[0];
			location.reload();
		}
	});
	
	updateProgress(childID, jsonStr);
});

function updateProgress(cid, param) {
	var jsonParsed = jQuery.parseJSON(param);
	var health_code = jsonParsed[cid]["health_code"];
	var language_code = jsonParsed[cid]["language_code"];
	var social_code = jsonParsed[cid]["social_code"];
	var other_code = jsonParsed[cid]["other_code"];
	
	var healthCount = (health_code.split("a").length - 1);
	var langCount = (language_code.split("a").length - 1);
	var socialCount = (social_code.split("a").length - 1);
	var otherCount = (other_code.split("a").length - 1);
	
	var healthPerc = parseInt((healthCount / health_code.length) * 100);
	var langPerc = parseInt((langCount / language_code.length) * 100);
	var socialPerc = parseInt((socialCount / social_code.length) * 100);
	var otherPerc = parseInt((otherCount / other_code.length) * 100);
	
	addProgressBar(4, otherPerc);
	addProgressBar(3, socialPerc);
	addProgressBar(2, langPerc);	
	addProgressBar(1, healthPerc);
}

// Manipulates the progress bars and percentage
function addProgressBar(category, percentage) {
	// Changes the progress bar value
	var progressbar = document.getElementById(category);
	progressbar.style.width = percentage+"%";
	$('#percentage' + category).text(percentage + "%");
}

function clickHealth() {
	localStorage.cat = "1";
	document.location.href = "checklist.html";
}

function clickLang() {
	localStorage.cat = "2";
	document.location.href = "checklist.html";
}

function clickSocial() {
	localStorage.cat = "3";
	document.location.href = "checklist.html";
}
function clickOther() {
	localStorage.cat = "4";
	document.location.href = "checklist.html";
}
