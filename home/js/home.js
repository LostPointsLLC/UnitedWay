/* 
 * This code is not as efficient as it could be
 * because it hasn't been "minified". (Google it if you aren't
 * familiar with the term.) However, this code is readable.
 */
 
 $(document).ready(function() {
	localStorage.removeItem('edit_childID');
});

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
		document.write("<div class='settings'><a href='../settings/index.html'><img class='head-bt' id = 'settings-bt' src='images/settings-button.png'/></a></div>");
	if(fav) 
		document.write("<div class='fav'><a href='../favorites/index.html'><img class='head-bt' id = 'fav-bt' src='images/favorites-button-small.png'/></a></div>");

	document.write("</div>");	
	
	console.log("===== Child JSON Object =====");
	console.log(localStorage.childJsonObject);
	console.log("===== Tip JSON Object =====");
	console.log(localStorage.tipJsonObject);
	
	console.log("===== Rss JSON Object =====");
	console.log(localStorage.rssJsonObject);
	
	console.log("===== Child Dirty-bit collection =====");
	console.log(localStorage.childTracker);
	
	console.log("===== Arrays that hold new / deletable children =====");
	console.log(localStorage.newChildren);
	console.log(localStorage.delChildren);
	
	console.log("===== Add & Remove arrays for favoured/unfavoured tips =====");
	console.log(localStorage.addObj);
	console.log(localStorage.delObj);
	
	console.log("===== Add & Remove arrays for favoured/unfavoured feeds, fake id increment =====");
	console.log(localStorage.rssAddObj);
	console.log(localStorage.rssRemObj);
}