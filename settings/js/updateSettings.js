function updateSettings() {

	var jsonString = "jsonString=" + JSON.stringify(deleteFromDb);	
	console.log(jsonString);
	/*
	$.ajax({
		type: "POST",
		url: "php/updateChildren.php",
		data: jsonString,
		cache: false,
		async: false,
	});
	
	*/
	localStorage.dirty = 1;
}
