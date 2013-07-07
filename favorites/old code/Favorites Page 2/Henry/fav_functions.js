// Function that returns an array of all of the favorite objects.
// Returns a favHeap object.
function getFavHeap(userID) {

	var datastring = 'userID=' + userID;
	
	var rssArray = getRssArray(datastring);
	var tipsArray = getTipsArray(datastring);
	var eventsArray = getEventsArray(datastring);

	var output = new favHeap(rssArray, tipsArray, eventsArray);

	return output;
}

function getRssArray(datastring) {

	/* Sends a request to the server to get RSS items */
	$.ajax({
		type: "POST",
		url: "http://localhost/teseting/php/getRss.php", 
		data: datastring,
		cache: false,
		success: function(data) {
		
			//var element = document.getElementById('output');
			//element.innerHTML = data;
			var rss_array = jQuery.parseJSON(data);			
			
			var rss_output_array = new Array();
			
			$.each(rss_array, function(index_of_row, row) {
				rss_output_array.push(new rss(row));
			});
			
			return rss_output_array;
		}
	});
}

function getTipsArray(datastring) {

	/* Sends request to the server to get tips */
	$.ajax({
		type: "POST",
		url: "http://localhost/teseting/php/getTips.php",
		data: datastring,
		cache: false,
		success: function(data) {
		
			//var element = document.getElementById('output');
			//element.innerHTML = data;
			var tips_array = jQuery.parseJSON(data);			
			
			var tips_output_array = new Array();
			
			$.each(tips_array, function(index_of_row, row) {
				tips_output_array.push(new tip(row));
			});
			
			return tips_output_array;
		}
	});
}

function getEventsArray(datastring) {
	

	/* Sends request to the server to get events */
	$.ajax({
		type: "POST",
		url: "http://localhost/teseting/php/getEvents.php",
		data: datastring,
		cache: false,
		success: function(data) {
		
			//var element = document.getElementById('output');
			//element.innerHTML = data;
			var events_array = jQuery.parseJSON(data);			
			
			var events_output_array = new Array();
			
			$.each(events_array, function(index_of_row, row) {
				events_output_array.push(new event(row));
			});
			
			return events_output_array;
		}
	});
	
	
}
