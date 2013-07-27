/* Uses the deleteArray to store which items should be
 * deleted from the database
 */
function changeFavs() {
	return;

}
function unfavorite(fav_id) {
	if(promptUser(fav_id)) {
		deleteArray.push(fav_id);
		$("#" + String(fav_id)).hide();
	}
}

function promptUser(fav_id) {
	try {
		var anchor = document.getElementById(String(fav_id)).firstChild.firstChild;
		var text = anchor.innerHTML;
	}
	
	catch(error) {
		console.log("Note: Trying to delete an undefined fav_id");
	}
	return confirm("Delete \"" + text + "\"?");
}
