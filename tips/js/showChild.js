// Function to update progress. function is called from the start in HTML
// JQuery on load function that makes an POST request to the server
// to retrieve information on all the children a parent has in JSON format.
$(document).ready(function() {
	if (checkEmptyChild()) {
		var child = document.getElementById("no_child_left_behind");
		if(localStorage.lang=="ENG")
			child.innerHTML = "You currently have no children registered. Check the settings page to register children.";
		else
			child.innerHTML = "Actualmente no tienes ni&nos registrados.";
		
		child.style.paddingTop = "20px";
		child.style.paddingBottom = "20px";
		child.style.marginLeft = "25px";
		child.style.textShadow = "0";
	}
	 listChildren(localStorage.childJsonObject);
});

// called by .ready() to parse retrieved JSON string into Javascript objects.
function listChildren(param) {
	var obj = jQuery.parseJSON(param);
	var content = document.getElementById("content");
	
	var fragment = document.createDocumentFragment();
	
	for (var key in obj) {
	
		/* Henry: Do we really need the below if statement? */
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
					genderImg = 'child/boy-darkblue-big';
					break;
				default:
					genderImg = 'child/girl-darkblue-big';
					break;
			}


			var i = 0;
			tableString[i] = "<table class = 'ch' onClick = 'linkToCategory(&quot;" + obj[key]["child_id"] + "&quot;)' >";
			tableString[++i] = "<tr><td class = 'cell'><img height='50' width='50' src = '../images/" + genderImg + ".png' style='background-color: " + obj[key]['child_color'] + "'/></td>";
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
	localStorage.cid = inChildID; // store database data string as a persistent variable
	document.location.href = "personal_cat.html";
}
