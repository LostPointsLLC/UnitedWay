/* Updates the database */
function updateDB(addAnotherChild) {
	var posts = $("#form").serialize();						// Finds the checked items, then concatenates as a datastring

	var name = document.getElementById("name").value;		// Don't know why this wasn't added in the serialize()

	var color = document.getElementById("sprite").style.backgroundColor; // Sorry I have to hardcode this in. 
	color = (color != "") ? color : 'rgb(100, 100, 100)';

	posts = "name=" + name + "&child_parentID=" + sessionStorage.pid + "&" + posts + "&color=" + color;

	// Triggered if not all of the fields were inputted
	if(posts.search("=&") != -1) {

		// Triggered if the user intended to add another child
		if(addAnotherChild) {
			alert("Please fill in all of the fields.");
			return -1;
		}
		
		// If the user didn't intend to add another child, and not everything 
		// was entered into the db, it just returns 0. Nothing significant.
		else return 0;
	}
	/* TODO: Make requirements for which fields should be added */


	// Executes if one of the buttons is pressed
	$.ajax({

		type: "POST",
		url: "php/child.php",
		data: posts,
		cache: false,
		async: false,
	});
	return 0;

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


// Note: I'm anticipating that this colorpicker is going to run slow on a mobile device
$(document).ready(function() {
	$('#colorSelector').ColorPicker({
		onShow: function(colpkr) {
			$(colpkr).fadeIn(500);
			return false;
		},

		onHide: function(colpkr) {
			$(colpkr).fadeOut(500);
			return false;
		},

		onChange: function(hsb, hex, rgb) {
			$('#colorSelector div').css('backgroundColor', '#' + hex);
			$('#sprite').css('backgroundColor', '#'+hex);
		},

	});
	
		
	
	// Indicates that we're entering from the settings page, and 
	// we want to change attributes of a child
	if(parseInt(sessionStorage.edit_childID) > 0) {
		initializeEditingPage(parseInt(sessionStorage.edit_childID));
	
	}
	

});

// Uses the existing jsonString to change the settings on the page
function initializeEditingPage(id) {
	var attributes = jQuery.parseJSON(sessionStorage.jsonString);
	var name 		= attributes[id]["child_name"];
	var birthday 	= attributes[id]["child_birthday"];
	var gender		= attributes[id]["child_gender"];
	var color		= attributes[id]["child_color"];
	console.log(color);
	document.getElementById("name").value = name;
	document.getElementById("sprite").style.backgroundColor = color;
	document.getElementById("color").style.backgroundColor = color;
	if(gender == 'boy') {
		document.getElementById("boy").value = true;
	}
	else document.getElementById("girl").value = true;
	document.getElementById("bday").value = birthday;
	


}


function add() {
	if(updateDB(true) == -1) return;
	document.location.href="child.html"; 
}



function finish() { 
	if(updateDB(false) == -1) return;
	document.location.href="../home/index.html"; 
}

function settings() {
	if(updateDB(false) == -1) return;
	document.location.href="../settings/";
}
