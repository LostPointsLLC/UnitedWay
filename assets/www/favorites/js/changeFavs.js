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
		
		var parent = document.getElementById(fav_id).parentNode;
		var list = parent.getElementsByClassName("list-item");
		if(allAreHidden(list)) {
			var header = parent.previousSibling;
			switch(header.id) {
				case "news-feed-header":
					parent.innerHTML = "<p>No news to display!</p>";
					break;
				case "tips-header":
					parent.innerHTML = "<p>No tips to display!</p>";
					break;
				case "events-header":
					parent.innerHTML = "<p>No events to display!</p>";
					break;
			}
		}
		
	}
}

function allAreHidden(list) {
	console.log(list.length);
	for(var i = 0; i < list.length; i++) {
		if(list[i].style.display != "none")
			return false;
	}
	return true;
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
