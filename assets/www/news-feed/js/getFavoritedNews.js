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
/*	var rss_id_array = new Array();*/
/*	var rss_url_array = new Array();*/
	var linkIdArray = new Array();
	$.ajax({ 
		type: "POST",
		url: "http://web.engr.illinois.edu/~heng3/php/newsfeed/getFavoritedNews.php",
		data: datastring,
		dataType: 'json',
		cache: false,
		async: false, // must be synchronous, sorry! 
		success: function(idArray) {
			//var pairArray = jQuery.parseJSON(idArray);
			for(var i = 0; i < idArray.length; i++) {
				var link = idArray[i][1];
				var id = idArray[i][0];
				linkIdArray[link] = id;		// Stores everything as a link-id pair
			}
		}
	});

//	for(var link in linkIdArray)
//		alert(link + " and also " + linkIdArray[link]);
	return linkIdArray;


}
