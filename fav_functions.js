// Function that returns an array of all of the favorite objects.
// Returns a favHeap object.
function getFavHeap(userID) {
	var datastring = 'userID=' + userID;
	
	/* Sends a request to the server to get RSS items */
	$.ajax({
		type: "POST",
		url: "getRss.php",
		data: datastring,
		success: function() {
		
			alert("Success! But verify with database anyways.");
		}
	});
	
	/* Sends request to the server to get tips */
	$.ajax({
		type: "POST",
		url: "getRss.php",
		data: datastring,
		success: function() {
		
			alert("Success! But verify with database anyways.");
		}
	});

	/* Sends request to the server to get events */
	$.ajax({
		type: "POST",
		url: "getRss.php",
		data: datastring,
		success: function() {
		
			alert("Success! But verify with database anyways.");
		}
	});
	
	
}
