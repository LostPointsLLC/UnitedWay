$(document).ready(function() {
	var currentDate = new Date();
	var day = currentDate.getDate();
	var month = currentDate.getMonth();
    updateDate(day,month);
    updateEvent(day,month);
});

//function to update page with current date, activity of the day and events of the day
function updateDate(d,m){
	var monthNames = [ "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December" ]
	var monthText = monthNames[m];//retrieves the string value of that month.
	var day = d;
	//Updates the chosen day, month and activity on the current page
	document.getElementById('day').innerHTML = day;
	document.getElementById('month').innerHTML = monthText;
	//has to offset by 1 because array index starts at 0.
	document.getElementById('activity').innerHTML = "Activity: <br>" + getActivity(day-1,m) + "<br><br>"
}

//function to get and update the event of that day
function updateEvent(d,m){
$.ajax({
		type: "POST",
		url: "php/events.php",
		
		cache: false,
		success: function(data){
			var obj = jQuery.parseJSON(data);
			document.getElementById('events').innerHTML = "Events: <br>" + obj[m][d-1];
		}
	 });
}

//go back to home page
function goHome(){
	document.location.href = "../home/";
}

//go to help page
function goHelp(){
	document.location.href = "../help/Calendar.html";
}

//go back to calendar page
function goToCalendar(){
	document.location.href = "../calendar/maincalendar.html";
}

//returns the tip associated with the given day and month; month = 0(jan), 1(feb); day = 1,2..,31
function getActivity(day,month){
	return tipsArray[month][day];
}