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
<<<<<<< HEAD
	sessionStorage.logout = "logout";
=======
>>>>>>> 97fdf03493af141f7ac8b64ad390891c69660f5c
	document.location.href = "../index.html";
}