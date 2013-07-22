// Deletes a favorites item based upon its id
function deletefav(fav_id_array) {

	var jsonString = "jsonString=" + JSON.stringify(fav_id_array);	
	alert(jsonString);
	$.ajax({
		type: "POST",
		url: "http://web.engr.illinois.edu/~heng3/php/favorites/delfav.php",
		data: jsonString,
		cache: false,
		async: false,
		success: function(data) {
			alert(data);

		}
	});

}
