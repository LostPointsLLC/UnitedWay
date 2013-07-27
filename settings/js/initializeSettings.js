// Function to update progress. function is called from the start in HTML
// JQuery on load function that makes an POST request to the server
// to retrieve information on all the children a parent has in JSON format.
function initializeSettings() {	

	// If there is something in sessionStorage, then we just go to listChildren and be happy
	if(typeof sessionStorage.jsonString !== "undefined") {
		listChildren(sessionStorage.jsonString);
		return;
	}

	// Otherwise we have to pull from the db
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
}

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
			/*	<table class="ch">
			 *		<tr>
			 *			<td class='cell'><img class='sprite' style='background-color: obj[key]['child-color']' src='genderImg'/></td>
			 *			<td class='nameCell'><span class='child-name'>obj[key]['child_name']</span></td>
			 *			<td class='ageCell'><span class='age-text'>ageFormatted</span></td>
			 *			<td class='edit-cell'><img class='edit' src='../images/wrench.jpg'/></td>
			 *			<td class='delete-cell'><img class='delete' src='remove-btn-blkoutline.png'/></td>
			 *		<tr>
			 *	<table>
			 */

			var i = 0;
			tableString[i] = "<table class = 'child-table'>";
			tableString[++i] = "<tr><td class = 'cell'><img class='sprite' src = '../images/" + genderImg + ".png' style='background-color: " + obj[key]['child_color'] + "'/></td>";
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
