var deleteFromDb = new Array();

$(document).ready(function() {
	if (checkEmptyChild()) {
		if(localStorage.lang=="ENG")
			document.getElementById("no_child_left_behind").innerHTML = "You currently have no children registered. Register a child here!";
		else
			document.getElementById("no_child_left_behind").innerHTML = "Actualmente no tienes ni&nos registrados. Registrar un ni&no aqu&i!";
	}
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