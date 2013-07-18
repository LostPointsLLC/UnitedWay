/* Generates the calendar button within the daily tips page.*/
function generateCalBtn() {
	document.write("<div class='calbtnwrap'><a href='../calendar/maincalendar.html'><img id = \"calbtn\"src='images/calendar-icon2.png'/></a></div>");
}

/* Generates the div boxes for date, activity and events on the daily tips page in calendar*/
function generateDailyActivity(){
	document.write("<div id = 'day'></div><div id = 'month'></div><div id = 'activity'></div>");
}

/* Generates the div boxes for the main calendar*/
function generateMainCal(){
	document.write("<div id = 'calendar'></div><div id = 'activity'></div>");
}