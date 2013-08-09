function updateSettings() {

	var jsonString = "jsonString=" + JSON.stringify(deleteFromDb);	
	$.ajax({
		type: "POST",
		url: "php/updateChildren.php",
		data: jsonString,
		cache: false,
		async: false,
	});
	if(localStorage.remember==1){
		localStorage.dirty = 1;
	}
	else
	sessionStorage.dirty = 1;

}
