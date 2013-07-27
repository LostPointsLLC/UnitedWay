function changeSettings() {


}


function editChild() {
	alert("edit child button pressed");
	sessionStorage.dirty = '1';

}



function deleteChild() {
	alert("removing child number " );

}

function addChild() {
	sessionStorage.dirty = '1';
	sessionStorage.fromSettings = '1';
	document.location.href="../login/child.html";
}
