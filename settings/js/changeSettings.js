// Yarr empty function
function changeSettings() {
	return;

}


function editChild(id) {
	localStorage.edit_childID = id;
	document.location.href='../login/child.html';
}



function deleteChild(name, id) {

	// In case of undoing a delete
	if($("#age" + String(id)).hasClass("black-white-text")) {
		changeWhite(id);
		var index = deleteFromDb.indexOf(id);
		deleteFromDb.splice(index, 1);
	}


	else if(promptDelete(name)) {
		changeBlack(id);
		deleteFromDb.push(id);
	}
	console.log(JSON.stringify(deleteFromDb));
}

function changeWhite(id) {
	
	makeWhiteText("age", id);
	makeWhiteText("name", id);
	makeWhite("edit", id);
	makeWhite("delete", id);
}

function changeBlack(id) {

	makeBlackWhiteText("age", id);
	makeBlackWhiteText("name", id);
	makeBlackWhite("edit", id);
	makeBlackWhite("delete", id);

}

function makeWhite(element, id) {
	$("#" + element + String(id)).removeClass("black-white");
}

function makeBlackWhiteText(element, id) {
	$("#" + element + String(id)).removeClass("white-text").addClass("black-white-text");

}

function makeWhiteText(element, id) {
	$("#" + element + String(id)).removeClass("black-white-text").addClass("white-text");

}


function makeBlackWhite(element, id) {
	$("#" + element + String(id)).addClass("black-white");
}


/* Asks user whether he/she actually wants to kill the kid */
function promptDelete(name) {
	return confirm("Do you really want to delete " + name + "?"); 
}


function addChild() {
	localStorage.dirty = '1';
	localStorage.fromSettings = '1';
	document.location.href="../login/child.html";
}

