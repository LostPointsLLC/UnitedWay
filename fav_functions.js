// Function that returns an array of all of the favorite objects.
// Returns a favHeap object.
function getFavHeap(userID) {
	var datastring = 'userID=' + userID;
	$.ajax({
		type: "POST",
		url: "getFavHeap.php",
		data: datastring,
		success: function() {
		
			alert("Success! But verify with database anyways.");
		}
	});

}
