/* A file inspired by Shiren Mathai.
 * This code is not as efficient as it could be
 * because it hasn't been "minified". (Google it if you aren't
 * familiar with the term.) However, this code is readable.
 */

/* Generates the header of each page.
 * Make sure you have default.css linked to your page
 * 
 * @param text	: A string containing the text for the title
 * @param home	: A boolean of whether the home button should be shown
 * @param help	: A boolean of whether the help button should be shown
 */
function generateHeader(text, home, help) {
	document.write("<div class='header' id='header'>");	
	// Writes the header to the DOM
	document.write("<div class='title' style='color: white'>" + text + "</div>");
				

	if(help) 
		document.write("<div class='help'><a href='../help/" + text + ".html" + "'><img src='../images/help-button.png'/></a></div>");
	if(home) 
		document.write("<div class='home'><a href='../home/'><img src='../images/home-button.png'/></a></div>");

	document.write("</div>");	

}

/* Generates a button with some text and an event
 * Make sure you have default.css linked to your page
 * 
 * @param text	: A string containing the text for the button
 * @param id	: A string containing the id of the inner div
 * @param css	: A string containing any additional class the user would like to apply to this button. 
 * @param e		: A string of the callback function that defines what the button does. It 
 *				: could be defined inline within this function call. 
 *
 * MAKE SURE YOUR PARAMETERS ARE STRINGS ONLY!!! YOU'LL GET BUGS IF THEY AREN'T.
 * If you would like to not specify one of the above parameters, pass in the empty string, ""
 */
function generateButton(text, id, css, e) {
	document.write("<a onClick='" + e + "'><div id='" + id + "' class='button " + css + "'><span class='button-text'>" + text + "</span></div></a>");
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

/* Below is some object oriented code for the favorites page
 * that Shiren helped us make. I'm not sure we'll be using his
 * code for the time being, but it's something to think about
 */
/*
function listitem(checked, text, id) {
	this.checked = checked;
	this.text = text;
	this.id = id;
	this.del = false;
	this.share = false;

	this.remove = function() {
		this.del = true;
	};

	this.sharfav = function() {
		this.share = true;

	}

}

function checklist() {
	this.list = new Array();
	this.add = function(item) {
		this.list.push(item);

	}

	this.load = function(json) {
		var decoded = JSONDecode(json);


	}
}*/
