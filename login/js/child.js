/* Swaps the input of the button colors into *actual* colors */
/*$(document).ready(function() {

	// Recreates the buttons by hiding each one
	// then replaces each radio button with an <a> element
	$('input[name="color"]').hide().each(function() {			// Any input element with name="color" will go thru here
		// Inserts <a> elements here
		$('<a '
			+ ' id=' + this.id
			+ ' class="radio-fx '								// Assigns the class 'radio-fx' 
			+ this.name											// Reassigns its name 
			+ '" href="#"><span class="radio' 
			+ (this.checked ? ' radio-checked' : '')			// Leaves button checked if checked, otherwise it isn't 
			+ '"></span></a>').insertAfter(this);				// Appends the <a> to the hidden radio button
	});

	// Finds the button that's been clicked, and passes it to the callback function as "e"
	$('.radio-fx').on('click', function(e) {
		$check = $(this).prev('input:radio');					
		var unique = '.' + this.className.split(' ')[1] + ' span';
		$(unique).attr('class', 'radio');
		$(this).find('span').attr('class', 'radio-checked');
		$check.attr('checked', true);
	}).on('keydown', function(e) {
		if ((e.keyCode ? e.keyCode : e.which) == 32) {
			$(this).trigger('click');							
		}
	});


	// Allows for multiple skins to be displayed
	$('#change-skin').change(function() {
		$('form table').attr('id', this.value);
	});

});
*/

/* Updates the database */
function updateDB(addAnotherChild) {
	var posts = $("#form").serialize();						// Finds the checked items, then concatenates as a datastring
	posts += "&child_parentID=" + sessionStorage.pid;

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
	});
	return 0;

}

/*$('#child-color').ColorPicker({
    color: #FFFF00,
    onShow: function(colpkr) {
	//appear
	$(colpkr).fadeIn(500);
	return false;
    },

    onHide: function(colpkr) {
	//disappear
	$(colpkr).fadeOut(500);
	return false;
    },
    
    onChange: function(hsb, hex, rgb) {
	//modify stuff
	$('#child-color').css('backgroundColor', '#' + hex);
    },

    onSubmit: function(hsb, hex, rgb) {
	$('#icon').css('backgroundColor', '#'+hex);
    },
)};*/
