// Function to update progress. function is called from the start in HTML
// JQuery on load function that makes an POST request to the server
// to retrieve information on all the children a parent has in JSON format.
$(document).ready(function() {
	var parentID = sessionStorage.pid.toString();
	var dataString = "parentID=" + parentID;
	
	$.ajax({
		type: "POST",
		url: "php/fetchChildren.php",
		data: dataString,
		cache: false,
		success: function(data){
			sessionStorage.jsonString = data; // store database data string as a session variable
			// console.log(data);
			listChildren(data);
		}
	 });	 
});

// called by .ready() to parse retrieved JSON string into Javascript objects.
function listChildren(param) {
	var obj = jQuery.parseJSON(param);
	var header = document.getElementById("tips-wrapper");
	var fragment = document.createDocumentFragment();
	
	for (var key in obj) {
		if (obj.hasOwnProperty(key)) {
			var anchor = document.createElement('div');
			var tableString = new Array(6);
			var imagePath = "";
			if (obj[key]["child_gender"] == "1") {
				imagePath = "images/girl.png";
			}
			else {
				imagePath = "images/boy.png";
			}
			var i = 0;
			tableString[i] = "<table onClick = 'linkToCategory(" + obj[key]["child_id"] + "," + obj[key]["child_age"] + ")' border = '1'>";
			tableString[++i] = "<tr><td><img height='50' width='50' src='" + imagePath + "' /></td>"
			tableString[++i] = "<td>" + obj[key]["child_name"] + "</td>";
			tableString[++i] = "<td>" + obj[key]["child_age"] + "</td></tr>";
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

function linkToCategory(inChildID, childAge) {
	sessionStorage.cid = inChildID; // Store child ID
	sessionStorage.age = childAge;
	document.location.href = "personal_cat.html";
}