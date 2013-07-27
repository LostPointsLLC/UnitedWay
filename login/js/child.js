/* Updates the database */
function updateDB(addAnotherChild) {
	var posts = $("#form").serialize();						// Finds the checked items, then concatenates as a datastring

	var name = document.getElementById("name").value;		// Don't know why this wasn't added in the serialize()

	var color = document.getElementById("sprite").style.backgroundColor; // Sorry I have to hardcode this in. 
	color = (color != "") ? color : 'rgb(100, 100, 100)';

	posts = "name=" + name + "&child_parentID=" + sessionStorage.pid + "&" + posts + "&color=" + color;
	alert("The post string is: " + posts);
	if(posts.search("=&") != -1) {
		if(addAnotherChild) {
			alert("Please fill in all of the fields.");
			return -1;
		}

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
		success: function(data) {
			alert(data);

		}
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

		onSubmit: function(hsb, hex, rgb) {
		}
	});

});







function add() {
	if(updateDB(true) == -1) return;

	return;
	document.location.href="child.html"; 
}



function finish() { 
	if(updateDB(false) == -1) return;
	document.location.href="../home/index.html"; 
}  
