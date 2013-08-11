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
function generateHomeHeader(text, fav, settings, help) {
	document.write("<div class='header' id='header'>");	
	// Writes the header to the DOM
	document.write("<div class='title' style='color: white'>" + text + "</div>");
				

	if(help) 
		document.write("<div class='help'><a href='../help/" + text + ".html" + "'><img class='head-bt' id = 'help-bt' src='../images/help-button.png'/></a></div>");
		
	if(settings)
		document.write("<div class='settings'><a href='../settings/'><img class='head-bt' id = 'settings-bt' src='images/settings-button.png'/></a></div>");
	if(fav) 
		document.write("<div class='fav'><a href='../favorites/'><img class='head-bt' id = 'fav-bt' src='images/favorites-button-small.png'/></a></div>");

	document.write("</div>");	

}