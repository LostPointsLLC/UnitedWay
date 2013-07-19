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

	var rss_output_array;
	/* Sends a request to the server to get RSS items */
	$.ajax({
		type: "POST",
		url: "php/getRss.php", 
		data: datastring,
		async: false,
		cache: false,
		success: function(data) {
		
			//var element = document.getElementById('output');
			//element.innerHTML = data;
			var rss_array = jQuery.parseJSON(data);			
			
			rss_output_array = new Array();
			
			$.each(rss_array, function(index_of_row, row) {
				rss_output_array.push(new rss(row));
			});
			
			rss_output_array[0].rss_id;
			
			rss_output_array;
		}
	});
	
	rss_output_array[0].rss_id;
	return rss_output_array;
}

function getTipsArray(datastring) {

	var tips_output_array;

	/* Sends request to the server to get tips */
	return $.ajax({
		type: "POST",
		url: "php/getTips.php",
		data: datastring,
		async: false,
		cache: false,
		success: function(data) {
		
			//var element = document.getElementById('output');
			//element.innerHTML = data;
			var tips_array = jQuery.parseJSON(data);			
			
			tips_output_array = new Array();
			
			$.each(tips_array, function(index_of_row, row) {
				tips_output_array.push(new tip(row));
			});
			
			return tips_output_array;
		}
	});
}

function getEventsArray(datastring) {
	
	var events_output_array;
	
	/* Sends request to the server to get events */
	return $.ajax({
		type: "POST",
		url: "php/getEvents.php",
		data: datastring,
		cache: false,
		async: false,
		success: function(data) {
		
			//var element = document.getElementById('output');
			//element.innerHTML = data;
			var events_array = jQuery.parseJSON(data);			
			
			events_output_array = new Array();
			
			$.each(events_array, function(index_of_row, row) {
				events_output_array.push(new event(row));
			});
			
			return events_output_array;
		}
	});
	
	
}
