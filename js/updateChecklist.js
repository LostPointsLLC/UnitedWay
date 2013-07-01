/*
	Request all information on checked tasks, based on query result
	Automatically check all tasks that need be checked.
*/

// Global variable containing binary string
var gBin;

$(document).ready(function() {
	var childID = sessionStorage.cid.toString(); // session current child ID
	var taskCat = sessionStorage.cat.toString(); // session current task category
	
	var dataString = "childID=" + childID + "&taskID=" + taskCat;
	$.ajax({
		type: "POST",
		url: "php/mobileFetchChecked.php",
		data: dataString,
		cache: false,
		success: function(data){ // retrieved data is a binary string

			initializeTasks(data, taskCat);
			$("input").change(function(){
				if (!$(this).is(':checked')) {
					var clickedID = $(this).attr('id');
					gBin[parseInt(clickedID)] = "b";
					//this.checked = true;
				}
				else {
					var clickedID = $(this).attr('id');
					gBin[parseInt(clickedID)] = "a";
					//this.checked = false;
				}
			});
			
			
			$(window).unload( function () { 
				var updateString = dataString + "&newString=" + gBin.join('');
				$.ajax({ // update database with new check binary string
					type: "POST",
					url: "php/mobileUpdateChecked.php",
					data: updateString,
					cache: false,
					async: false,
					success: function (data) {
						console.log(data);
					}
				});
			});
		}
	});
});

// Iterate through array of task bits, create list of tasks based off of this
function initializeTasks(checkString, tid) {
	// Select the right category. All tasks stored in tasks.js
	var texts;
	switch(tid) {
		case "1":
			texts = healthTasks;
			break;
		case "2":
			texts = languageTasks;
			break;
		case "3":
			texts = socialTasks;
			break;
		case "4":
			texts = otherTasks;
			break;
	}


	checkString = checkString.replace(/^\s+|\s+$/g, ''); // regex. trims all whitespace
	var binaryArray = checkString.split("");	// Returns array
	gBin = binaryArray; // assign to global array.
	
	
	// Iterates through the given binary a, b string.	
	for (var i = 0; i < binaryArray.length; i++) {
	
		var checkBool = "";
		
		// If the string at position i is a, then assign value to be checked
		if (binaryArray[i] == "a") {
			checkBool = "checked";
		}
		
		// Creates a checkbox item that has the text we want.
		var inside = "<input type='checkbox' name='checkers' " + checkBool + " class='check' id=" + i + " />";
		inside += "<label for=" + i + " class='label-for-check'>" + texts[i] + "</label>";
		
		// Pads "inside" with list item things.
		var entry = "<li>" + inside + "</li>";
		$("#checklist").append(entry);

	}

}
