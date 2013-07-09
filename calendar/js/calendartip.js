$(document).ready(function() {
    updateDate(sessionStorage.date);
});

//function to update page with current date, activity of the day and events of the day
function updateDate(param){
	var monthNames = [ "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December" ]
	var monthIndex= parseInt(param)	//gets the numerical value of month
	var monthText = monthNames[monthIndex-1];//retrieves the string value of that month.
	var day = parseInt(param.substr(3));
	//Updates the chosen day, month and activity on the current page
	document.getElementById('day').innerHTML = day;
	document.getElementById('month').innerHTML = monthText;
	//has to offset by 1 because array index starts at 0.
	document.getElementById('activity').innerHTML = "Activity: <br>" + getActivity(day-1,monthIndex-1) + "<br><br>";
}

//go back to home page
function goHome(){
	document.location.href = "../home/";
}

//go to help page
function goHelp(){
	document.location.href = "../help/help1.html";
}

//go back to calendar page
function goToCalendar(){
	document.location.href = "../calendar/maincalendar.html";
}

//returns the tip associated with the given day and month; month = 0(jan), 1(feb); day = 1,2..,31
function getActivity(day,month){
	return tipsArray[month][day];
}