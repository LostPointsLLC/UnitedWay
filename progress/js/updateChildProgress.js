/*
	Update progress bars based on a binary string that indicates
	which tasks are complete/incomplete

*/
var childID;

$(document).ready(function() {
	childID = sessionStorage.cid.toString();
	var dataString = "childID=" + childID;
	$.ajax({
		type: "POST",
		url: "php/childProgress.php",
		data: dataString,
		cache: false,
		success: function(data){
			updateProgress(childID, data);
		}
	 });
});

function updateProgress(cid, param) {
	var jsonParsed = jQuery.parseJSON(param);
	
	var health_code = jsonParsed["health_code"];
	var language_code = jsonParsed["language_code"];
	var social_code = jsonParsed["social_code"];
	var other_code = jsonParsed["other_code"];
	
	var healthCount = (health_code.split("a").length - 1);
	var langCount = (language_code.split("a").length - 1);
	var socialCount = (social_code.split("a").length - 1);
	var otherCount = (other_code.split("a").length - 1);
	
	var healthPerc = (healthCount / health_code.length) * 100;
	var langPerc = (langCount / language_code.length) * 100;
	var socialPerc = (socialCount / social_code.length) * 100;
	var otherPerc = (otherCount / other_code.length) * 100;
	
	addProgressBar(cid, 4, otherPerc);
	addProgressBar(cid, 3, socialPerc);
	addProgressBar(cid, 2, langPerc);	
	addProgressBar(cid, 1, healthPerc);
}

// Manipulates the progressbars and percentage
function addProgressBar(child_id, category, percentage) {

	// Changes the progress bar value
	var progressbar = document.getElementById(category);
	progressbar.value = percentage;
	$('#percentage' + category).text(percentage + "%");

}

$("#Health").click(function() {
	sessionStorage.cid = childID;
	sessionStorage.cat = 1;
	document.location.href = "health_checklist.html";

});

$("#Language").click(function() {
	sessionStorage.cid = childID;
	sessionStorage.cat = 2;
	document.location.href = "social_checklist.html";
	
});

$("#Social").click(function() {
	sessionStorage.cid = childID;
	sessionStorage.cat = 3;
	document.location.href = "language_checklist.html";

});

$("#Other").click(function() {
	sessionStorage.cid = childID;
	sessionStorage.cat = 4;
	document.location.href = "other_checklist.html";

});

function linkToCategory(cid, cat) {
	sessionStorage.cid = cid;
	sessionStorage.cat = cat; // category ID that carries over
	document.location.href = "checkList.html";
}