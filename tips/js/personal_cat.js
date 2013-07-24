$(document).ready(function() {
	var childID = sessionStorage.cid.toString();
	var jsonStr = sessionStorage.jsonString;
	var jObj = jQuery.parseJSON(jsonStr);
	
	// Print picture of child based on gender
	var gender = jObj[childID]["child_gender"];
	var childName = jObj[childID]["child_name"];
	var child = document.getElementById("child");
	child.innerHTML = '<img src="../images/' + gender + '.png" width="60" height="60" /><br> \
						<div id="child-div"><span class="child-name">' + childName + '</span></div>';
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
	
});

function healthTips() {
	sessionStorage.tCat = "health";
	document.location.href = "personal_tips.html";
}

function growthTips() {
	sessionStorage.tCat = "growth";
	document.location.href = "personal_tips.html";
}

function safetyTips() {
	sessionStorage.tCat = "safety";
	document.location.href = "personal_tips.html";
}

function playTips() {
	sessionStorage.tCat = "playtime";
	document.location.href = "personal_tips.html";
}
