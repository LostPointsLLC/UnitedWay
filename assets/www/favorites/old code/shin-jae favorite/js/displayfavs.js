/*
 * Displays the favorites on the screen
 * right when the page is ready
 */

 // Global Variable
 var deletionArray = new Array();
 
$(document).ready(function() {
	//variables that works as pointers to the top of each list
	var rssPointer = document.getElementById("newsList");
	var tipsPointer = document.getElementById("tipsList");
	var eventsPointer = document.getElementById("eventsList");

	// Gets the userID from the session storage
	var userID = sessionStorage.pid;
	var favHeap = getFavHeap(userID);

	//print out news
	for(var i = 0; i < favHeap.rssArray.length; i++) {
		var rss = document.createElement("div");
		rss.className += "favorites-item";
		rss.id = favHeap.rssArray[i].fav_id;


		// Manipulates the text output
		var rssTitle = favHeap.rssArray[i].rss_title;		// gets rss title
		var rssTitleNode = document.createTextNode(rssTitle);	// makes rss title into text
		var rssElement = document.createElement("p");
		rss.title = favHeap.rssArray[i].rss_url;
		rss.id = favHeap.rssArray[i].fav_id;
		rssElement.title = favHeap.rssArray[i].rss_url;			// gets rss url
		rssElement.className += "rss";

		//append title and delete button img
		rssElement.appendChild(rssTitleNode);
		rss.appendChild(rssElement);
		
		// create delete button img
		var deleteRss = document.createElement("div");
		deleteRss.className += "delete";
		deleteRss.title = "rss";
		rss.appendChild(deleteRss);

		// Create share button image
		var shareRss = document.createElement("div");
		shareRss.className += "share";
		shareRss.title = "rss";
		rss.appendChild(shareRss);
		rssPointer.parentNode.insertBefore(rss, rssPointer.nextSibling);

		//move the pointer down so that the list would be in order
		rssPointer = rssPointer.nextSibling;
	}
	
	//print out tips	
	for(var j = 0; j < favHeap.tipArray.length; j++) {
		var tips = document.createElement("div");
		tips.className += "favorites-item";
		tips.id = favHeap.tipArray[j].fav_id;
		var tipsElement = document.createElement("p");
	
		var tipsTitle = favHeap.tipArray[j].tip_content;
		var tipsTitleNode = document.createTextNode(tipsTitle);
		tips.title = favHeap.tipArray[j].tip_content;
		tipsElement.title = favHeap.tipArray[j].tip_content;
		tipsElement.className += "tip";
		tips.id = favHeap.tipArray[j].fav_id;
		
		tipsElement.appendChild(tipsTitleNode);
		tips.appendChild(tipsElement);

		// create delete button img
		var deleteTip = document.createElement("div");
		deleteTip.className += "delete";
		deleteTip.title = "tip";
		tips.appendChild(deleteTip);
		
		// Create share button image
		var shareTip = document.createElement("div");
		shareTip.className += "share";
		shareTip.title = "tip";
		tips.appendChild(shareTip);
		tipsPointer.parentNode.insertBefore(tips, tipsPointer.nextSibling);
		tipsPointer = tipsPointer.nextSibling;
	}

	//print out events
	for(var k = 0; k < favHeap.eventArray.length; k++) {
		var events = document.createElement("div");
		events.className += "favorites-item";
		events.id = favHeap.eventArray[k].fav_id;
		var eventsElement = document.createElement("p");

		var eventsTitle = favHeap.eventArray[k].event_title;
		var eventsUrl = favHeap.eventArray[k].event_url;
		var eventsTitleNode = document.createTextNode(eventsTitle);
		
		//eventsElement.title = eventsUrl;
		events.title = eventsTitle;
		events.id = favHeap.eventArray[k].fav_id;
		eventsElement.title = eventsUrl;
		eventsElement.className += "event";
		eventsElement.appendChild(eventsTitleNode);
		events.appendChild(eventsElement);
		
		// create delete button image
		var deleteEvent = document.createElement("div");
		deleteEvent.className += "delete";
		deleteEvent.title = "event";
		events.appendChild(deleteEvent);

		// Create share button image
		var shareEvent = document.createElement("div");
		shareEvent.className += "share";
		shareEvent.title = "event";
		
		events.appendChild(shareEvent);
		eventsPointer.parentNode.insertBefore(events, eventsPointer.nextSibling);
		eventsPointer = eventsPointer.nextSibling;
	}
	
	/*
		JQuery Event handlers (binders)
	*/
	
	$(".rss").click (function(){
		window.open(this.title); // rssElement is child of rss (class 'favorites_item', title, titleNode)
	});

	$(".tip").click (function(){
		newWindow = window.open();
		newWindow.document.write(this.title);
		newWindow.focus();
	});
	
	$(".event").click (function(){
		window.open(this.title);
	});
	
	$(".share").click(function() {
		var cTitle = $(this).attr('title');
		alert("Share This " + cTitle );
	});
	
	$(".delete").click(function() {
		var par = $(this).parent();				// The div element
		var pTitle = par.attr('title');			// Contains the title of the rss feed

		// Obtains the content of the item, but only shows a little of it
		var content = pTitle.slice(0, 20);		 
		if (content.length > 18) {
			content = content + "...";
		}

		// cTitle determines whether it's an event, rss, or tip
		var cTitle = $(this).attr('title');
		var prompt = confirm("Delete " + cTitle + ": " + content + "?");
		if (prompt == true) {
			deletionArray.push(parseInt(par.attr('id')));
			par.remove();
		}
	});
	
	$(window).unload( function () {
		deletefavWrapper();
	});
});

// This function is only here for testing purposes
// It allows us to update the db without exiting the page
function deletefavWrapper() {
	if(deletionArray.length > 0)
		deletefav(deletionArray);

}
