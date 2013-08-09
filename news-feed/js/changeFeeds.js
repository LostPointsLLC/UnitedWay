/* This is the first function part of stage 2.
 * This function defines what happens everytime the pulldown menu is changed 
 *
 * All of the other code having to do with adding feeds to the database is contained
 * within this file.
 */
function changeFeeds(sel) {

	try {
		var value = sel.options[sel.selectedIndex].value;
		if(value == feedData.source) return;
		localStorage.rss = value;
		document.location.href="index.html";		// Seems counterintuitive, but this
													// will unload the window, so favorites will be saved
	}

	// By default, without this try-catch block, an uncaught alert will be thrown.
	// This will stop all other javascript on this page =(
	catch(error) {
		return;
	}
}


// Decides what to do with an element that has chosen to be favorited
function favorite(id) {
	
	// If changing nofav -> fav
	if(shouldBeFavorited(id)) 	addFeed(id);
	else 						removeFeed(id);
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

