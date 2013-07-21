/*
// A constructor for a pair
function ArrayPair(rss_id_array, rss_url_array) {
	this.rss_id_array = rss_id_array;
	this.rss_url_array = rss_url_array;

}
*/
// Returns back an array of ids of favorited news items
function getFavoritedNews() {
	var datastring = "user_id=" + sessionStorage.pid;
	var linkIdArray = new Array();
	$.ajax({ 
		type: "POST",
		url: "php/getFavoritedNews.php",
		data: datastring,
		cache: false,
		async: false, // must be synchronous, sorry! 
		success: function(idArray) {
			var pairArray = jQuery.parseJSON(idArray);
			for(var i = 0; i < pairArray.length; i++) {
				var link = pairArray[i][1];
				var id = pairArray[i][0];
				linkIdArray[link] = id;		// Stores everything as a link-id pair
			}
		}
	});

	return linkIdArray;


}
