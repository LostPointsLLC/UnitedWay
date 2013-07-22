/* Called when a user is exiting the page. Updates the database.
 *
 */
function updateFavs() {

	var jsonString = "jsonString=" + JSON.stringify(deleteArray);	
	//alert(jsonString);
	$.ajax({
		type: "POST",
		url: "http://web.engr.illinois.edu/~heng3/php/updateFavs.php",
		data: jsonString,
		cache: false,
		async: false,
		success: function(data) {
			//alert(data);

		}
	});

}