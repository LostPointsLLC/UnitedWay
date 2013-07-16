// Decides what to do with an element that has chosen to be favorited
function favorite(id) {


}


// Adds the given id to feedArray
function addFeed(id) {
	feedArray.push(id);
}

// Removes the given id from feedArray
function removeFeed(id) {
	var index = feedArray.indexOf(id);
	feedArray.splice(index, 1);
}


function favFunction(i) {
	alert("Favorited!");
	var paragraph = document.getElementById(i);

	if(! $('#' + i ).hasClass("highlighted")) {	
		paragraph.className = " highlighted";
		addFeed(i);
	}

	else {
		paragraph.className = "item-text";
		removeFeed(i);

	}
}
