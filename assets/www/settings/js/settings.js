var deleteFromDb = new Array();

$(document).ready(function() {

	initializeSettings();
	changeSettings();
	
	$(window).unload(function() {
		if (sessionStorage.logout != "logout")
			updateSettings();
	});


});

function logout(){
	dbSync();
	localStorage.clear();
	sessionStorage.logout = "logout";
	document.location.href = "../index.html";
}