/* This is the first function part of stage 2.
 * This function does literally nothing because 
 * the arrays were already instantiated in initializeFeeds.
 *
 * It's just good programming practice to break code up into stages.
 */
function changeFeeds() {
	return;	
}


// Decides what to do with an element that has chosen to be favorited
function favorite(id) {
	
	// If changing nofav -> fav
	if(shouldBeFavorited(id)) {
		addFeed(id);
	}

	else {
		removeFeed(id);
	}
	alert("changeFromDb: " + JSON.stringify(removeFromDb));
	alert("addToDb: " + JSON.stringify(addToDb));
}

// Returns false if an item has the fav class
function shouldBeFavorited(id) {
	return !($("#" + String(id)).hasClass('fav'));
}

// A pretty trivial function
function isInDb(id) {
	return id >= 0;
}

// Adds the given id to feedArray
function addFeed(id) {

	/* If the id was in the database before, but we're
	 * adding it back in, then a user must have first pushed the id
	 * into the removeFromDb array. Now we have to pop it.
	 */
	if(isInDb(id))	{
		var index = removeFromDb.indexOf(id);
		removeFromDb.splice(index, 1);
	}
	else {
		addToDb.push(id);
	}
	addFavClass(id);
}

// Changes the class of the favorite item
function addFavClass(id) {
	$("#" + String(id)).removeClass("nofav").addClass("fav");

}

// Removes the given id from feedArray
function removeFeed(id) {
	if(isInDb(id)) {
		removeFromDb.push(id);
	}
	else {
		var index = addToDb.indexOf(id);
		addToDb.splice(index, 1);
	}
	addNofavClass(id);
}

function addNofavClass(id) {
	$("#" + String(id)).removeClass("fav").addClass("nofav");

}

