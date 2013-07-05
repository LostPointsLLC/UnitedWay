/**
 * Displays the favorites on the screen
 * right when the page is ready
 */

$(document).ready(function() {
	

	//variables that works as pointers to the top of each list
	var rssPointer = document.getElementById("newsList");
	var tipsPointer = document.getElementById("tipsList");
	var eventsPointer = document.getElementById("eventsList");

	// Gets the userID from the session storage
	// Google session storage online to see what is it
	var userID = sessionStorage.pid;
	var favHeap = getFavHeap(userID);


	//print out news
	for(var i = 0; i < favHeap.rssArray.length; i++) {

		//create new div element
		var rss = document.createElement("div");
		rss.className += "favorites-item";

	
		// Manipulates the text output
		var rssTitle = favHeap.rssArray[i].rss_title;		// gets rss title
		var rssTitleNode = document.createTextNode(rssTitle);	// makes rss title into text
		
		var rssElement = document.createElement("p");
		rssElement.title = favHeap.rssArray[i].rss_url;			// gets rss url

		// Makes the text into a button
		rssElement.onclick = function(){
			window.open(this.title);
		};

		//append title and delete button img
		rssElement.appendChild(rssTitleNode);
		rss.appendChild(rssElement);
		
		// create delete button img
		var deleteRss = document.createElement("div");
		deleteRss.className += "delete";
		deleteRss.onclick = function() {
			alert("Favorite deleted!");			
		};
		rss.appendChild(deleteRss);

		// Create share button image
		var shareRss = document.createElement("div");
		shareRss.className += "share";
		shareRss.onclick = function() {
			alert("shared!");
		};
		rss.appendChild(shareRss);


		rssPointer.parentNode.insertBefore(rss, rssPointer.nextSibling);

		//move the pointer down so that the list would be in order
		rssPointer = rssPointer.nextSibling;

	}
	//print out tips	
	for(var j = 0; j < favHeap.tipArray.length; j++) {

		var tips = document.createElement("div");
		tips.className += "favorites-item";
		var tipsElement = document.createElement("p");

	
		var tipsTitle = favHeap.tipArray[j].tip_content;
		var tipsTitleNode = document.createTextNode(tipsTitle);

		tipsElement.title = favHeap.tipArray[j].tip_content;

		tipsElement.onclick = function(){
			
			newWindow = window.open();
			newWindow.document.write(this.title);
			newWindow.focus();

		};

		tipsElement.appendChild(tipsTitleNode);
		tips.appendChild(tipsElement);



		// create delete button img
		var deleteRss = document.createElement("div");
		deleteRss.className += "delete";
		deleteRss.onclick = function() {
			alert("Favorite deleted!");			
		};
		tips.appendChild(deleteRss);

		// Create share button image
		var shareRss = document.createElement("div");
		shareRss.className += "share";
		shareRss.onclick = function() {
			alert("shared!");
		};
		tips.appendChild(shareRss);






		tipsPointer.parentNode.insertBefore(tips, tipsPointer.nextSibling);

		tipsPointer = tipsPointer.nextSibling;

	}

	//print out events
	for(var k = 0; k < favHeap.eventArray.length; k++) {

		var events = document.createElement("div");
		events.className += "favorites-item";
		var eventsElement = document.createElement("p");


		var eventsTitle = favHeap.eventArray[k].event_title;
		var eventsUrl = favHeap.eventArray[k].event_url;

		var eventsTitleNode = document.createTextNode(eventsTitle);

		eventsElement.title = eventsUrl;

		eventsElement.onclick = function(){
			window.open(this.title);
		};

		// create delete button img
		var deleteEvent = document.createElement("div");
		deleteEvent.className += "delete";
		deleteEvent.onclick = function() {
			alert("Favorite deleted!");			
		};
		events.appendChild(deleteEvent);

		// Create share button image
		var shareRss = document.createElement("div");
		shareRss.className += "share";
		shareRss.onclick = function() {
			alert("shared!");
		};
		events.appendChild(shareRss);
	
		
		
		
		eventsElement.appendChild(eventsTitleNode);
		events.appendChild(eventsElement);

		eventsPointer.parentNode.insertBefore(events, eventsPointer.nextSibling);

		eventsPointer = eventsPointer.nextSibling;

	}

});
