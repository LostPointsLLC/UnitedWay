// Function to update progress. function is called from the start in HTML
// JQuery on load function that makes an POST request to the server
// to retrieve information on all the children a parent has in JSON format.
$(document).ready(function() {
	var parentID = sessionStorage.pid.toString();
	var dataString = "parentID=" + parentID;
	
	$.ajax({
		type: "POST",
		url: "php/overallProgress.php",
		data: dataString,
		cache: false,
		success: function(data){
			updateProgress(data);
		}
	 });	 
});

// called by .ready() to parse retrieved JSON string into Javascript objects.
function updateProgress(param) {
	var obj = jQuery.parseJSON(param);
	var header = document.getElementById("header");
	var fragment = document.createDocumentFragment();
	
	for (var key in obj) {
		if (obj.hasOwnProperty(key)) {
			// calculate overall progress
			var health_code = obj[key]["health_code"];
			var language_code = obj[key]["language_code"];
			var social_code = obj[key]["social_code"];
			var other_code = obj[key]["other_code"];
			
			var healthCount = (health_code.split("a").length - 1);
			var langCount = (language_code.split("a").length - 1);
			var socialCount = (social_code.split("a").length - 1);
			var otherCount = (other_code.split("a").length - 1);
			var totalChecked = healthCount + langCount + socialCount + otherCount;
			var totalCount = health_code.length + language_code.length + social_code.length + other_code.length;
			var overallPerc = (totalChecked / totalCount) * 100;
			
			var anchor = document.createElement('div');
			var tableString = new Array(8);
			var i = 0;
			tableString[i] = "<table onClick = 'linkToCategory(" + obj[key]["child_id"] + ")' border='1' bordercolor='#999999' style= cellpadding='2' cellspacing='2' width='300'>";
			// First Row
			tableString[++i] = "<tr><td rowspan = '3'>" + obj[key]["child_gender"] + "\n";
			tableString[++i] = obj[key]["child_color"] + "</td>";
			tableString[++i] = "<td colspan = '4'>" + obj[key]["child_name"] + "</td>";
			tableString[++i] = "<td rowspan = '3'>" + obj[key]["child_age"] + "</td></tr>";
			// Second Row
			tableString[++i] = "<tr><td >(blank)</td><td>(apple icon)</td><td>(star icon)</td><td>(book)</td></tr>";
			// Third Row
			tableString[++i] = "<tr><td colspan='4'><progress value = '" + overallPerc + "' max='100'></progress></td></tr>";
			tableString[++i] = "</table>";
			
			anchor.innerHTML = tableString.join('');
			fragment.appendChild(anchor);
			
			// Add line
			var line = document.createElement('div');
			line.id = "line";
			fragment.appendChild(line);	
		}
	}
	header.appendChild(fragment);
}

function linkToCategory(inChildID) {
	sessionStorage.cid = inChildID;
	document.location.href = "childProgress.html";
}