$(document).ready(function() {
	// Display Picture
	var tipCategory = sessionStorage.tCat.toString();
	var front = document.getElementById("frontpiece");
	
	// PHP query 
	var pid = sessionStorage.pid.toString();
	var taskCat = sessionStorage.tCat.toString();
	var childAge = sessionStorage.age.toString();
	var dataString = "pid=" + pid + "&taskCat=" + taskCat + "&childAge=" + childAge;
	
	$.ajax({
		type: "POST",
		url: "php/fetchTips.php",
		data: dataString,
		cache: false,
		success: function(data){
			console.log(data);
			displayTips(data);
		}
	 });
	 /* Data in the Form:
	 [{"tip_id":"10","tip_content":"tip content for id 10"}, {"tip_id...}, ...] 
	 */
});

/**
 * Display tips for particular age/ category
 */
function displayTips (param) {
	var input = jQuery.parseJSON(param);
	var tipsList = input[0];
	// Loop through and list all tips.
	// Each tip has a unique tip_id, use this in our advantage
	for (var key in tipsList) {
		var tipText = tipsList[key]["tip_content"];
		var entry = "<li>" + tipText + "</li>";
		$("#frontpiece").append(entry);
	}
	

}

function goBack() {
	document.location.href = "personal_cat.html";
}