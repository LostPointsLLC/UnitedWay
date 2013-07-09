/*
	Update progress bars based on a binary string that indicates
	which tasks are complete/incomplete

*/

$(document).ready(function() {
	var childID = sessionStorage.cid.toString();
	var jsonStr = sessionStorage.jsonString;
	var jObj = jQuery.parseJSON(jsonStr);
	
	// Print picture of child based on gender
	var genderID = jObj[childID]["child_gender"];
	var childName = jObj[childID]["child_name"];
	var imgfile = "";
	switch(genderID) {
		case "0":
			imgfile = "images/boy.png";
			break;
		case "1":
			imgfile = "images/girl.png";
			break;
	}
	
	var portrait = document.getElementById("child");
	portrait.innerHTML = "<img src='" + imgfile +"' width='50' height='50' alt='' /><p>" + childName + "</p>"
	
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
			sessionStorage.cid = indexList[thisIndex - 1];
			location.reload();
		}
		else { // wrap around if first child
			sessionStorage.cid = indexList[lastIndex];
			location.reload();
		}
	});
	
	$("#right-arrow").click(function() {
		var thisIndex = indexList.indexOf(childID);
		var lastIndex = indexList.length - 1;
		if (thisIndex < lastIndex) { // Not the last child in list
			sessionStorage.cid = indexList[thisIndex + 1];
			location.reload();
		}
		else {
			sessionStorage.cid = indexList[0];
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
	progressbar.value = percentage;
	$('#percentage' + category).text(percentage + "%");

}

$("#Health").click(function() {
	//sessionStorage.cid = childID;
	sessionStorage.cat = 1;
	document.location.href = "health_checklist.html";

});

$("#Language").click(function() {
	//sessionStorage.cid = childID;
	sessionStorage.cat = 2;
	document.location.href = "social_checklist.html";
	
});

$("#Social").click(function() {
	//sessionStorage.cid = childID;
	sessionStorage.cat = 3;
	document.location.href = "language_checklist.html";

});

$("#Other").click(function() {
	//sessionStorage.cid = childID;
	sessionStorage.cat = 4;
	document.location.href = "other_checklist.html";

});

function linkToCategory(cid, cat) {
	sessionStorage.cid = cid;
	sessionStorage.cat = cat; // category ID that carries over
	document.location.href = "checkList.html";
}