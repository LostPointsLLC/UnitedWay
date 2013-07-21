/* Called when a user is exiting the page. Updates the database.
 *
 */
function updateFavs() {

	var jsonString = "jsonString=" + JSON.stringify(deleteArray);	
	alert(jsonString);
	$.ajax({
		type: "POST",
		url: "php/delfav.php",
		data: jsonString,
		cache: false,
		async: false,
		success: function(data) {
			alert(data);

		}
	});

}