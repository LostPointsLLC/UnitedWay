function updateSettings() {
	var childJsonObj = jQuery.parseJSON(localStorage.childJsonObject);
	var newChildrenObj = jQuery.parseJSON(localStorage.newChildren);
	var delChildrenObj = jQuery.parseJSON(localStorage.delChildren);
	
	// Remove children with cid's in deleteFromDb
	// If child has been recently added and only exists in local storage, just remove it from localStorage.newChildren.
	for (var i = 0; i < deleteFromDb.length; i++) {
		var doomedChild = deleteFromDb[i];
		delete childJsonObj[doomedChild];
		if (doomedChild in newChildrenObj) {
			delete newChildrenObj[doomedChild];
		}
		else {
			delChildrenObj.push(doomedChild);
			// Since this is a child that will be deleted from the database, stop tracking it.
			var childTracker = jQuery.parseJSON(localStorage.childTracker);
			delete childTracker[doomedChild];
			localStorage.childTracker = JSON.stringify(childTracker);
		}
	}
	
	localStorage.childJsonObject = JSON.stringify(childJsonObj);
	localStorage.newChildren = JSON.stringify(newChildrenObj);
	localStorage.delChildren = JSON.stringify(delChildrenObj);
	
	
	console.log("=====From updateSettings.js=====");
	console.log(localStorage.childJsonObject);
	console.log("=====From new Children=====");
	console.log(localStorage.newChildren);
	console.log("=====From del Children=====");
	console.log(localStorage.delChildren);
	
}
