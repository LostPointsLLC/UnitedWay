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
		document.write("<div class='help'><a href='../help/" + text + ".html" + "'rel=\"external\"><img class='head-bt' id='help-bt' src='../images/help-button.png'/></a></div>");
	if(home) 
		document.write("<div class='home'><a href='../home/' rel=\"external\"><img class='head-bt' id = 'home-bt' src='../images/home-button.png'/></a></div>");

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
	document.write("<div class='calbtnwrap'><a href='../calendar/maincalendar.html'><img class='head-bt' id = \"calbtn\"src='../images/calendar-button.png'/></a></div>");
}

/* Generates the div boxes for date, activity and events on the daily tips page in calendar*/
function generateDailyActivity(){
	document.write("<div id = 'day'></div><div id = 'month'></div><div id = 'activity'></div>");
}

/* Generates the div boxes for the main calendar*/
function generateMainCal(){
	document.write("<div id = 'calendar'></div><div id = 'activity'></div>");
}


/* placeholder: Duh
 * id1: id of the outer input box
 * id2: id of the input text box, and nothing else
 * type: type of the input text
 *
 * Make sure these parameters are all strings
 */
function generateInputText(placeholder, id1, id2, type) {

	document.write("<div id='" + id1 + "' class='input'><div class='pencil'></div><input type=" + type + " class='text-input' id='" + id2 + "' placeholder='" + placeholder + "' /></div>");


}


/* placeholder: Duh
 * id1: id of the outer input box
 * id2: id of the input text box, and nothing else
 * type: type of the input text
 * e: Event to be triggered when a user leaves the input field
 *
 * Make sure these parameters are all strings
 */
function generateInputBlurText(placeholder, id1, id2, type, e) {

	document.write("<div id='" + id1 + "' class='input'><div class='pencil'></div><input type=" + type + " class='text-input' id='" + id2 + "' placeholder='" + placeholder + "' onblur='" + e + "'/></div>");


}

/* placeholder: Duh
 * id1: id of the outer input box
 * id2: id of the input text box, and nothing else
 * type: type of the input text
 * e: Event to be triggered when a user enters the input field
 *
 * Make sure these parameters are all strings
 */
function generateInputFocusText(placeholder, id1, id2, type, e) {

	document.write("<div id='" + id1 + "' class='input'><div class='pencil'></div><input type=" + type + " class='text-input' id='" + id2 + "' placeholder='" + placeholder + "' onfocus='" + e + "'/></div>");


}

/* placeholder: Duh
 * id1: id of the outer input box
 * id2: id of the input text box, and nothing else
 * type: type of the input text
 * e: Event to be triggered when a user enters the input field
 *
 * Make sure these parameters are all strings
 */
function generateInputFocusBlurText(placeholder, id1, id2, type, e1, e2) {

	document.write("<div id='" + id1 + "' class='input'><div class='pencil'></div><input type=" + type + " class='text-input' id='" + id2 + "' placeholder='" + placeholder + "' onfocus='" + e1 + "' onblur='" + e2 + "' /></div>");


}



//function to generate header and sub header in registration page
function generateMainText(param){
	document.write(param);
}

//function to generate id = personal-info
function generatePersInfo(){
	if(sessionStorage.lang=="ENG")
		document.write("<p>Please provide your personal information below.</p>");
	else
		document.write("<p>Por favor, a continuaci&oacute;n proporcione su informaci&oacute;n personal.</p>");
}

//function to generate id = login-info
function generateLoginInfo(){
	if(sessionStorage.lang=="ENG")
		document.write("<p>Please provide the information you would like to use to log into our app.</p>");
	else
		document.write("<p>Por favor, proporcione la informaci&oacute;n que desea utilizar para iniciar sesi&oacute;n en nuestra aplicaci&oacute;n.</p>");
}