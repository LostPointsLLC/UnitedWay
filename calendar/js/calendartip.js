$(document).ready(function() {
    updateDAE(sessionStorage.date);
});

//function to update page with current date, activity of the day and events of the day
function updateDAE(param)
{
    var monthNames = [ "January", "February", "March", "April", "May", "June",
		       "July", "August", "September", "October", "November", "December" ]
    var monthIndex= parseInt(param,10);	//gets the numerical value of month
    var monthText = monthNames[monthIndex-1];//retrieves the string value of that month.
    var day = parseInt(param.substr(3),10);
    //Updates the chosen day, month and activity on the current page
    document.getElementById('day-text').innerHTML = day;
    document.getElementById('month-text').innerHTML = monthText;
    //has to offset by 1 because array index starts at 0.
    
    document.getElementById('activity').innerHTML = "<span id='activity-head'>Activity</span> <br>" + 
	getActivity(day-1,monthIndex-1) + "<br><br>"+getEvent(day-1,monthIndex-1);
  
    getLibraryEvent(day,monthIndex-1);
 
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

//function to get and update the event of that day
function getEvent(d,m){
var val;
$.ajax({
        type: "POST",
        url: "php/events.php",
        async:false,
        cache: false,
        success: function(data){
            var obj = jQuery.parseJSON(data);
            val = "<span id='event-head'>Events</span> <br>" + obj[m][d];
        }
     });   
    return val;
}

