//loads the calendar for the current month
$('#calendar').datepicker({
        inline: true,
        firstDay: 1,
        showOtherMonths: true,
        dayNamesMin: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        onSelect: function(datestr, inst){
        	linkTopage(datestr);
        }
    });
$(document).ready(function() {
    var currentDate = new Date();
    var day = currentDate.getDate();
    var month = currentDate.getMonth();
   // updateDate(day,month);
   // updateEvent(day,month);
   
   	document.getElementById('activity').innerHTML = "Activity: <br>" + 
    getActivity(day-1,month) + "<br><br>"+displayTE(month,day-1);
});
//function to go to calendar tip page
function linkTopage(param)
{
	sessionStorage.date = param;
	document.location.href = "calendartip.html";
//alert(sessionStorage.date);
}

//function to go back to home page
function goHome()
{
    document.location.href = "../home/";
}

//function to go to help page
function goHelp()
{
    document.location.href = "../help/Calendar.html";
}

//returns the tip associated with the given day and month; month = 0(jan), 1(feb); day = 1,2..,31
function getActivity(day,month){
	return tipsArray[month][day];
}

//function to display today's event below the main calendar
function displayTE(m,d){
var val;
$.ajax({
        type: "POST",
        url: "php/events.php",
        async:false,
        cache: false,
        success: function(data){
            var obj = jQuery.parseJSON(data);
            val = "Events: <br>" + obj[m][d]
        }
     });   
    return val;
}




/* Generates the calendar button within the daily tips page.*/
function generateCalBtn() {
	document.write("<div class='calbtnwrap'><a href='../calendar/maincalendar.html'><img id = \"calbtn\"src='../images/calendar-button.png'/></a></div>");
}

/* Generates the div boxes for date, activity and events on the daily tips page in calendar*/
function generateDailyActivity(){
	document.write("<div id = 'day'></div><div id = 'month'></div><div id = 'activity'></div>");
}

/* Generates the div boxes for the main calendar*/
function generateMainCal(){
	document.write("<div id = 'calendar'></div><div id = 'activity'></div>");
}





