// Function to update progress. function is called from the start in HTML
// JQuery on load function that makes an POST request to the server
// to retrieve information on all the children a parent has in JSON format.
$(document).ready(function() {
	var parentID = localStorage.pid.toString();
	var dataString = "parentID=" + parentID;
	
	$.ajax({
		type: "POST",
		url: "../php/fetchSummary.php",
		data: dataString,
		cache: false,
		success: function(data){
			localStorage.jsonString = data; // store database data string as a persistent variable
			initializeProgress(data);
		}
	 });	 
});

// called by .ready() to parse retrieved JSON string into Javascript objects.
function initializeProgress(param) {
	var obj = jQuery.parseJSON(param);
	var content = document.getElementById("content");
	
	if(obj.length == 0) {
		content.innerHTML = "<p style='position: relative; left: 25px; padding-right: 35px; text-align: left;'>It seems like you haven't registered any children. Click <a href='../settings/' style='color: red'>here</a> to register a few children!</a></p>";
		return;

	}
	
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
			
			var ageInMonths = calculateMonth(obj[key]["child_birthday"]);				//Calculate child's age
			var ageFormatted = calculateAge(ageInMonths);
			
			
			var gender = obj[key]["child_gender"];
			var genderImg;
			switch(gender) {
				case 'boy':
					genderImg = 'child/boy-darkblue-small';
					break;
				default:
					genderImg = 'child/girl-darkblue-small';
					break;
			}

			var anchor = document.createElement('div');
			var tableString = new Array(8);
			var i = 0;
			tableString[i] = "<table class = 'ch' onClick = 'linkToCategory(" + obj[key]["child_id"] + ")'>";
			// First Row
			tableString[++i] = "<tr><td class = 'cell' rowspan = '3'><img id='" + key + "' src = '../images/" + genderImg + ".png' height='42' width='42' style='background-color: " + obj[key]['child_color'] + "'></td>";
			tableString[++i] = "<td class = 'cell' colspan = '4'><span class='child-name'>" + obj[key]["child_name"] + "</span></td>";
			tableString[++i] = "<td class = 'ageCell' rowspan = '3'><span class='age-text'>" + ageFormatted + "</span></td></tr>";
			// Second Row
			tableString[++i] = "<tr><td ></td><td></td><td></td><td></td></tr>";
			// Third Row
			tableString[++i] = "<tr><td class = 'cell' colspan='4'><div class = 'progress' value = '" + overallPerc + "' max='100'><div class=\"progressbar\" style = \'width:"+overallPerc+"%; \'></div></div></td></tr>";
			tableString[++i] = "</table>";
			
			anchor.innerHTML = tableString.join('');
			fragment.appendChild(anchor);
			
			// Add line
			var line = document.createElement('div');
			line.id = "line";
			fragment.appendChild(line);	

		}
	}
	content.appendChild(fragment);
}

function linkToCategory(inChildID) {
	localStorage.cid = inChildID;
	document.location.href = "childProgress.html";
}
