// Function to update progress. function is called from the start in HTML
// JQuery on load function that makes an POST request to the server
// to retrieve information on all the children a parent has in JSON format.
function initializeSettings() {	
	if((typeof(localStorage.jsonString) !== "undefined") && !parseInt(localStorage.dirty)) {
		listChildren(localStorage.jsonString);
		return;
	}
	else{// Otherwise we have to pull from the db
		var parentID = localStorage.pid.toString();	
	}

	var dataString = "parentID=" + parentID;
	
	$.ajax({
		type: "POST",
		url: "../php/fetchSummary.php",
		data: dataString,
		cache: false,
		success: function(data){
			localStorage.jsonString = data;// store database data string as a localstorage variable
			listChildren(data);
		}
	 });	 
}

// called by .ready() to parse retrieved JSON string into Javascript objects.
function listChildren(param) {
	var obj = jQuery.parseJSON(param);
	var content = document.getElementById("content");
	var fragment = document.createDocumentFragment();
	if(obj.length == 0) {
		content.innerHTML = "<p style='padding-right: 35px'>You don't seem to have any registered children. Click below to create one!</p>";	

	}
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
			/*	<table id="key" class="ch">
			 *		<tr>
			 *			<td class='cell'>
			 				<img id='sprite + key' class='sprite' style='background-color: obj[key]['child_color']' src='genderImg'/>
			 				<span class='text white-text'>obj[key]['child_name']</span>
			 			</td>
			 *			
			 *			<td class='ageCell'><span class='text white-text'>ageFormatted</span></td>
			 *			<td class='editcell'><img id='edit + key' class='edit' src='../images/wrench.jpg' onClick='editChild()'/></td>
			 *			<td class='deletecell'><img id='delete + key' class='delete' src='remove-btn-blkoutline.png' onClick='deleteChild(name, id)'/></td>
			 *		<tr>
			 *	<table>
			 */

			var i = 0;
			tableString[i] = "<table id=" + key + " class = 'child-table'>";
			tableString[++i] = "<tr>";
			tableString[++i] =	   	"<td class = 'spritecell'>";
			tableString[++i] =		"<img id='sprite" + key + "' class='sprite' src='../images/" + genderImg + ".png' style='background-color: " + obj[key]['child_color'] + "'/><br>";
			tableString[++i] =		"<span class='text white-text'>" + obj[key]['child_name'] + "</span>";
			tableString[++i] = 		"</td>";
			tableString[++i] =		"<td class='ageCell'><span id='age" + key + "' class='text white-text'>" + ageFormatted + "</span></td>";
			tableString[++i] =		"<td class='editCell'><img id='edit" + key + "' class='edit' src='../images/wrench.jpg' onClick='editChild(" + key + ")'/></td>";
			tableString[++i] =		"<td class='deleteCell'><img id='delete" + key + "' class='delete' src='../images/remove-button-blkoutline.png' onClick='deleteChild(&#39" + obj[key]["child_name"] + "&#39, " + key + ")' /></td>"
			tableString[++i] = "</tr>";
			tableString[++i] = "</table>";
			anchor.innerHTML = tableString.join('');	// Makes this bigass array into one bigass string
			fragment.appendChild(anchor);
			
			// Add line
			var line = document.createElement('div');
			line.id = "line";
			fragment.appendChild(line);	
		}
	}
	content.appendChild(fragment);
}
