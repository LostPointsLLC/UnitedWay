// Returns back an array of ids of favorited news items
function getFavoritedNews() {
	var datastring = "user_id=" + sessionStorage.pid;

	$.ajax({ 
		type: "POST",
		url: "php/getFavoritedNews.php",
		data: datastring,
		cache: false,
		async: false, // must be synchronous, sorry! 
		success: function(idArray) {
			alert(idArray);
		}
	});

	return jQuery.parseJSON(idArray);


}
