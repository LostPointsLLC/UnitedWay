/* Generates the calendar button within the daily tips page.*/
function generateCalBtn() {
    document.write("<div class='calbtnwrap'><a href='../calendar/maincalendar.html'><img id = \"calbtn\"src='images/calendar-icon2.png'/></a></div>");
}

/* Generates the div boxes for date, activity and events on the daily tips page in calendar*/
function generateDailyActivity(){
    document.write("<div id='date'> \
						<div id = 'day'><h1 id='day-text'></h1></div> \
						<div id = 'month'><h2 id='month-text'></h2></div> \
					</div> \
					\
					<div id = 'activity'></div>");
}

/*Generates the div boxes for champaign public library events on the daily tips page*/
function generateEvent(){
    document.write("<span id='event-head'>Events</span>");
    document.write("<div id = 'events'></div>");
}

/*I think I need to add something here*/

/* Generates the div boxes for the main calendar*/

function generateMainCal(){
    document.write("<div id = 'calendar'></div><div id = 'activity'></div>");
}
