var deleteFromDb = new Array();

$(document).ready(function() {

	initializeSettings();
	changeSettings();
	
	$(window).unload(function() {
		updateSettings();
	});


});
