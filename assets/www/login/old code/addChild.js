// A function that makes sure that the buttons are replaced 
$(function() {

	// Recreates the buttons by hiding each one, then redoing the html/css for it
	$('input:radio').hide().each(function() {

		// Extracts the label from the original radio button. (no, not *creates*, *extracts*)
		var label = $("label[for=" + '"' + this.id + '"' + "]").text();

		// Inserts 
		$('<a ' 
			+ (label != '' ? 'title=" ' + label + ' "' : '' ) 	// If there's a label, assign it its original label, otherwise empty string
			+ ' class="radio-fx '								// Assigns the class 'radio-fx' 
			+ this.name											// Reassigns its name 
			+ '" href="#"><span class="radio' 
			+ (this.checked ? ' radio-checked' : '')			// Leaves button checked if checked, otherwise it isn't 
			+ '"></span></a>').insertAfter(this);				// Appends the radio button to the list
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

	/* not needed just for sake ;)*/
	$('#form').submit(function() {
		var posts = $(this).serialize();						// Finds the checked items, then concatenates as a datastring
		if (posts != '') {
			alert(posts);
		} else {
			alert('please select something, then submit the form!');
		}
		return false;
	});

	// Allows for multiple skins to be displayed
	$('#change-skin').change(function() {
		$('form table').attr('id', this.value);
	});

});

