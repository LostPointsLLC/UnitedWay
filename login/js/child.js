/* Updates the database */
function updateDB(addAnotherChild) {
	var posts = $("#form").serialize();									// Finds the checked items, then concatenates as a datastring
	var name = document.getElementById("name").value;					// Don't know why this wasn't added in the serialize()
	var color = document.getElementById("sprite").style.backgroundColor; // Sorry I have to hardcode this in. 
	var bday = document.getElementById("bday").value;
	var gender = posts.split("=")[1];
	var bdayArray = String(bday).split("/");
	color = (color != "") ? color : 'rgb(100, 100, 100)';
	posts = "name=" + name + "&child_parentID=" + localStorage.pid + "&" + posts + "&color=" + color + "&birthday=20" + bdayArray[1] + "-" + bdayArray[0] + "-" + 00;	
	console.log(localStorage.edit_childID);
	// Checks if the user already has a child with the same name (this cannot be allowed)
	if (checkDuplicateName(name)) {
		return showDuplicateNamePrompt (name);
	}
	
	// Triggered if not all of the fields were inputted
	if(posts.search("=&") != -1) {
	    // Triggered if the user intended to add another child
	    if(addAnotherChild) {
			return showFailPrompt(name, bday)
	    }
	    // If the user didn't intend to add another child, and not everything 
	    // was entered into the db, it just returns 0. Nothing significant.
	    else return 0;
	}
    /* TODO: Make requirements for which fields should be added */
 
	/*
	 *	Update local objects
	 */
	 
	// Create new child object
	var newChild = {};
	newChild["child_id"] = "1" + name; // So the parseInt(localStorage.edit_childID) check returns true
	newChild["child_birthday"] = "20" + bdayArray[1] + "-" + bdayArray[0] + "-" + 00;
	newChild["child_color"] = color;
	newChild["child_name"] = name;
	newChild["child_gender"] = gender;
	newChild["health_code"] = "bbbbbb";
	newChild["language_code"] = "bbbbbbbbbbbbbbb";
	newChild["social_code"] = "bbbbbbbbb";
	newChild["other_code"] = "bbbbbbbbbbbbbbbbbbbbbbbbb";
	var newChildStr = JSON.stringify(newChild);
	
	// Add child to localStorage.childJsonObject Object
	var childJsonObj = jQuery.parseJSON(localStorage.childJsonObject);
	childJsonObj[newChild["child_id"]] = newChild;
	localStorage.childJsonObject = JSON.stringify(childJsonObj);
	// Add child to new children list
	var newChildrenObj = jQuery.parseJSON(localStorage.newChildren);
	newChildrenObj[newChild["child_id"]] = newChild;
	localStorage.newChildren = JSON.stringify(newChildrenObj);
 
	/*
    // Executes if one of the buttons is pressed
    $.ajax({
		type: "POST",
		url: "php/child.php",
		data: posts,
		cache: false,
		async: false,
		
    });
	*/
    return 0;
    
}


/* Displays on screen whether the string was in an
 * acceptable format.
 */
function checkLegalBday() {

	var bday = document.getElementById("bday");

	var dates = bday.value.split('/');
	if(dates.length == 2 && isLegalMonth(dates[0]) && isLegalYear(dates[1])) {
		document.getElementById("result").innerHTML = "";
	}
	else {
		document.getElementById("result").innerHTML = "<p>Please provide your child's birthday in the format specified</p>";
		bday.value = "";
	
	}
}

function isLegalMonth(month) {
	var numbers = /^[0-9]/;
	
	// First checks if the string is a number
	if(!month.match(numbers)) return false;

	// Checks if the int is 0 < month < 13
	var mm = parseInt(month);
	return ((0 < mm) && (mm < 13));
}

/* Returns true if the year is in 'yy' format
 * Does not check whether the inputted year is more
 * than the current year
 */
function isLegalYear(year) {
	return year.length == 2
	
}

function checkDuplicateName(name) {
	var childrenObj = jQuery.parseJSON(localStorage.childJsonObject);
	for (var cid in childrenObj) {
		if (childrenObj[cid]["child_name"] == name) {
			return true;
		}
	}
	return false;
}

// Returns 0 if there are no empty fields.
function showFailPrompt(name, birthday) {
    var result = document.getElementById("result");
    if(name == "")  {
	result.innerHTML = "<p>Please fill in your child's name</p>";
	return -1;
    }
    else if(birthday == "") {
	result.innerHTML = "<p>Please provide your child's birthday</p>";
	return -1;
    }
    return 0;    
}

function showDuplicateNamePrompt (name) {
	var result = document.getElementById("result");
	result.innerHTML = "<p>You already have a child with the same name!</p>";
	return -1;
}


// Uses a query to update the database
function editDB() {
    console.log("THIS IS EDIT");
	console.log(localStorage.edit_childID);
    var birthday = document.getElementById("bday").value;
    var name = document.getElementById("name").value;
    console.log("Name " + name);
	console.log("Birthday " + birthday);
    if(showFailPrompt(name, birthday) == -1) return;
    
    var color = document.getElementById("color").style.backgroundColor;
    var boy_gender = document.getElementById("boy").value;
	var dataArr = getDataString(name, birthday, color, boy_gender);
	console.log(dataArr);
	// Edit child in localStorage.childJsonObject Object
	var childJsonObj = jQuery.parseJSON(localStorage.childJsonObject);
	var editedChild = childJsonObj[dataArr["child_id"]];
	editedChild["child_id"] = dataArr["child_id"];
	// Edit child
	editedChild["child_name"] = dataArr["child_name"];
	editedChild["child_birthday"] = dataArr["child_birthday"];
	editedChild["child_color"] = dataArr["child_color"];
	editedChild["child_gender"] = dataArr["child_gender"];
	console.log(JSON.stringify(editedChild));
	localStorage.childJsonObject = JSON.stringify(childJsonObj);
	console.log(localStorage.childJsonObject);
	// Indicate that this child has been modified
	var childTracker = jQuery.parseJSON(localStorage.childTracker);
	childTracker[localStorage.edit_childID] = true;
	localStorage.childTracker = JSON.stringify(childTracker);
	
	/*
    var dataString = getDataString(name, birthday, color, boy_gender);
    
    if(dataString) {
	
		$.ajax({
			type: "POST",
			url: "php/editChild.php",
				data: dataString,
			cache: false,
			async: false,
			success: function(data){
			alert(data);
			
			}
		});
		localStorage.dirty = '1';
    }
    */
	

    
    document.location.href="../settings/index.html";
    
}

// Creates a data string to be sent back into the DB
// Any empty string means no changes have to be made.
// If there are no changes, then this function returns zero.
function getDataString(name, birthday, color, boy_gender) {

	// First check whether it's actually worth returning a string
	var	id = localStorage.edit_childID;
	var	attributes = jQuery.parseJSON(localStorage.childJsonObject);

	var editAttributes = {};
	editAttributes["child_name"] = name;
	editAttributes["child_birthday"] = packDateFormat(birthday);
	editAttributes["child_color"] = color;
	if((attributes[id]["child_gender"] == 'boy') == boy_gender) {
		editAttributes["child_gender"] = "girl";
	}
	editAttributes["child_gender"] = "boy";
	editAttributes["child_id"] = id;
	
	return editAttributes;
	// if(flag) return posts;
}

function packDateFormat(birthday) {
	var date = birthday.split('/');
	return '20' + date[1] + '-' + date[0] + '-00'; 
}

// Called when one of the radio buttons is clicked
// 1 is boy
// 2 is girl
function changeGender(gender) {

	
	// Changes the images
	var sprite = document.getElementById("sprite");
	switch(gender) {
		case 1:
			sprite.src ="images/child/boy-darkblue-mid.png";
			break;
		case 2:
			sprite.src = "images/child/girl-darkblue-mid.png"
			break;
	}

}

function changeSpriteColor(color) {
	document.getElementById("sprite").style.backgroundColor= "#" + color;
	document.getElementById("color").value = "";

}

// Note: I'm anticipating that this colorpicker is going to run slow on a mobile device
$(document).ready(function() {
	
	// Indicates that we're entering from the settings page, and 
	// we want to change attributes of a child

	if(parseInt(localStorage.edit_childID) >= 0) {
		initializeEditingPage(localStorage.edit_childID);
	}
});

// Uses the existing childJsonObject to change the settings on the page
function initializeEditingPage(id) {
	var	attributes = jQuery.parseJSON(localStorage.childJsonObject);
	var name 		= attributes[id]["child_name"];
	var birthday 	= attributes[id]["child_birthday"];
	var gender		= attributes[id]["child_gender"];
	var color		= attributes[id]["child_color"];
	
	document.getElementById("name").value = name;
	document.getElementById("sprite").style.backgroundColor = color;
	document.getElementById("color").style.backgroundColor = color;
	if(gender == 'boy') {
		document.getElementById("boy").checked = true;
	}
	else {
		document.getElementById("girl").checked = true;
		changeGender(2);
	}
	document.getElementById("bday").value = formatBirthday(birthday);
	
}
function formatBirthday(rawBday) {
	var date = rawBday.split('-');
	var yy = date[0].substring(2);
	var mm = date[1];
	return mm + '/' + yy;
}


function add() {
	if(updateDB(true) == -1) return;
	localStorage.fromSettings = '0';
	document.location.href="child.html"; 
}

function finish() { 
	if(updateDB(false) == -1) return;
	localStorage.fromSettings = '0';
	document.location.href="../home/index.html"; 
}

function settings() {
	if(updateDB(false) == -1) return;
	localStorage.fromSettings = '0';
	document.location.href="../settings/index.html";
}