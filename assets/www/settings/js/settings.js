var deleteFromDb = new Array();

$(document).ready(function() {
	if (checkEmptyChild()) {
		var child = document.getElementById("no_child_left_behind");
		if(localStorage.lang=="ENG") 
			child.innerHTML = "You currently have no children registered. Register a child here!";
		
		else 
			child.innerHTML = "Actualmente no tienes ni&nos registrados. Registrar un ni&no aqu&i!";
		
		child.style.paddingTop = "20px";
		child.style.paddingBottom = "20px";
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