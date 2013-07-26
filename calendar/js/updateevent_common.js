//function to update page with current date, activity of the day and events of the day
function updateDate(d,m)
{
    var monthNames = [ "January", "February", "March", "April", "May", "June",
		       "July", "August", "September", "October", "November", "December" ]
    var monthText = monthNames[m];//retrieves the string value of that month.
    
    //Updates the chosen day, month and activity on the current page
    document.getElementById('day-text').innerHTML = d;
    document.getElementById('month-text').innerHTML = monthText;
    //has to offset by 1 because array index starts at 0.
    
    document.getElementById('activity').innerHTML = 
	"<span id='activity-head'>Activity</span> <br>" + 
	getActivity(d-1,m) + "<br><br>";
    getLibraryEvent(d,m);
    
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


