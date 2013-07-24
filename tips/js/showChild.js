// Function to update progress. function is called from the start in HTML
// JQuery on load function that makes an POST request to the server
// to retrieve information on all the children a parent has in JSON format.
$(document).ready(function() {
	var parentID = sessionStorage.pid.toString();
	var dataString = "parentID=" + parentID;
	
	$.ajax({
		type: "POST",
		url: "../php/fetchSummary.php",
		data: dataString,
		cache: false,
		success: function(data){
			sessionStorage.jsonString = data; // store database data string as a session variable
			listChildren(data);
		}
	 });	 
});

// called by .ready() to parse retrieved JSON string into Javascript objects.
function listChildren(param) {
	var obj = jQuery.parseJSON(param);
	var content = document.getElementById("content");
	var fragment = document.createDocumentFragment();
	
	for (var key in obj) {
		if (obj.hasOwnProperty(key)) {
		
			//Calculate child's age
			var ageInMonths = calculateMonth(obj[key]["child_birthday"]);
			var ageFormatted = calculateAge(ageInMonths);
			var anchor = document.createElement('div');
			var tableString = new Array(6);
			
			var i = 0;
			tableString[i] = "<table class = 'ch' onClick = 'linkToCategory(" + obj[key]["child_id"] + ")' >";
			tableString[++i] = "<tr><td class = 'cell'><img height='50' width='50' src = '../images/" + obj[key]["child_gender"] + ".png' /></td>";
			tableString[++i] = "<td class = 'nameCell'><span class='child-name'>" + obj[key]["child_name"] + "</span></td>";
			tableString[++i] = "<td class = 'ageCell'><span class='age-text'>" + ageFormatted + "</span></td></tr>" ;
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
	sessionStorage.cid = inChildID; // Store child ID
	document.location.href = "personal_cat.html";
}
