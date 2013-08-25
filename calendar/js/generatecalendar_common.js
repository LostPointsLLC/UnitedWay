/* Generates the calendar button within the daily tips page.*/
function generateCalBtn() {
    document.write("<div class='calbtnwrap'><a href='../calendar/maincalendar.html'><img id = \"calbtn\"src='images/calendar-icon2.png'/></a></div>");
}


/* Generates the header of each page.
 * Make sure you have default.css linked to your page
 * 
 * @param text	: A string containing the text for the title
 * @param home	: A boolean of whether the home button should be shown
 * @param help	: A boolean of whether the help button should be shown
 */
function generateCalendarHeader(text) {
	document.write("<div class='header' id='header'>");	
	// Writes the header to the DOM
	document.write("<div class='title' style='color: white'>" + text + "</div>");
					
	if(localStorage.lang=="ENG"){
			document.write("<div><a href='../help/" + text + ".html" + "'><img class='head-bt' id = 'help' src='../images/help-button.png'/></a></div>");
			document.write("<div><a href='../home/index.html'><img id='home' src='../images/home-button.png'/></a></div>");
			//document.write("<div><a href='../calendar/maincalendar.html'><img id='cal-bt' src='images/calendar-icon2.png'/></a></div>");
	}
	else{
			document.write("<div><a href='../help/" + text + ".html" + "'><img class='head-bt' id = 'help' src='../images/ayuda(help)-button.png'/></a></div>");
			document.write("<div><a href='../home/index.html'><img id = 'home' src='../images/casa(home)-button.png'/></a></div>");
			//document.write("<div><a href='../calendar/maincalendar.html'><img id='cal-bt' src='images/calendar-icon2.png'/></a></div>");
	}
		document.write("</div>");	
}

/* Generates the div boxes for date, activity and events on the daily tips page in calendar*/
function generateDailyActivity(){
    document.write("<div id='date'> \
						<div id = 'day' class= 'notranslate'><h1 id='day-text'></h1></div> \
						<div id = 'month' class= 'notranslate'><h2 id='month-text'></h2></div> \
					</div> \
					<div id = 'activity' class= 'notranslate'></div>");
}

/*Generates the div boxes for champaign public library events on the daily tips page*/
function generateEvent(){
	if(localStorage.lang=="ENG")
    	document.write("<span id='event-head'>Events</span>");
    else
    	document.write("<span id='event-head'>Eventos</span>");
    document.write("<div id = 'events'></div>");
}

/*I think I need to add something here*/

/* Generates the div boxes for the main calendar*/

function generateMainCal(){
    document.write("<div id = 'calendar' class =notranslate></div><div id = 'activity'></div>");
}
