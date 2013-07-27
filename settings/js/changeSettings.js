function changeSettings() {


}


function editChild() {
	alert("edit child button pressed");
	sessionStorage.dirty = '1';

}



function deleteChild(name, id) {
	if(promptDelete(name)) {
		makeBlackWhiteText("age", id);
		makeBlackWhiteText("name", id);
		makeBlackWhite("edit", id);
		makeBlackWhite("delete", id);

	}
}

function makeBlackWhiteText(element, id) {
	$("#" + element + String(id)).removeClass("child-name").addClass("black-white-text");

}

function makeBlackWhite(element, id) {
	$("#" + element + String(id)).addClass("black-white");
}


/* Asks user whether he/she actually wants to kill the kid */
function promptDelete(name) {
	return confirm("Do you really want to delete " + name + "?"); 
}


function addChild() {
	sessionStorage.dirty = '1';
	sessionStorage.fromSettings = '1';
	document.location.href="../login/child.html";
}

