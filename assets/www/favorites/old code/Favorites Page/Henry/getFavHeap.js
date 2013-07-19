// Function that returns an array of all of the favorite objects.
// Returns a favHeap object.
function getFavHeap(userID) {

	var datastring = 'userID' + userID;
	
	var rssArray = new Array();
	var tipsArray = new Array();
	var eventsArray = new Array();
	
	$.ajax({
		type: "POST",
		url: "php/getHeap.php",
		data: datastring,
		async: false,
		cache: false,
		success: function(data) {
		
			// Makes the JSON string into a workable string
			var query_output = jQuery.parseJSON(data);
			
			// First make an array full of RSS objects

			$.each(query_output[0], function(index_of_row, row) {
				rssArray.push(new rss(row));
			});
			
			// Next make array full of tips

			$.each(query_output[1], function(index_of_row, row) {
				tipsArray.push(new tip(row));
			});
			
			// Last make array full of events

			$.each(query_output[2], function(index_of_row, row) {
				eventsArray.push(new event(row));
			});
			
		}
	
	});
	
	return new favHeap(rssArray, tipsArray, eventsArray);
}