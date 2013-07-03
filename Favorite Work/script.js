//display the favorites page
function displayFavorites(userID){

	var favHeap = getFavHeap(userID);

	//variables that works as pointers to the top of each list
	var rssPointer = document.getElementById("newsHead");
	var tipsPointer = document.getElementById("tipsHead");
	var eventsPointer = document.getElementById("eventsHead");

	//print out news
	for(var i = 0; i < favHeap.rssArray.length; i++) {

		//create new div element
		var rss = document.createElement("div");
		var rssElement = document.createElement("span");
	
		//create delete button img;
		var deleteRss = document.createElement("img");
		deleteRss.src = "cross.jpg";
		deleteRss.style.width = "10px";
		deleteRss.style.height = "10px";
		deleteRss.onclick = function(){
			alert("Favorite deleted!");			
		}

		//get the title
		var rssTitle = favHeap.rssArray[i].rss_title;
		//get url
		var rssUrl = favHeap.rssArray[i].rss_url;
		
		//create textNode
		var rssTitleNode = document.createTextNode(rssTitle);
		
		//store the url in the title attribute
		rssElement.title = rssUrl;

		//button for rssElement
		rssElement.onclick = function(){
			window.open(this.title);
		};

		//append title and delete button img
		rssElement.appendChild(rssTitleNode);
		rss.appendChild(rssElement);
		rss.appendChild(deleteRss);

		rssPointer.parentNode.insertBefore(rss, rssPointer.nextSibling);

		//move the pointer down so that the list would be in order
		rssPointer = rssPointer.nextSibling;

	}

	//print out tips	
	for(var j = 0; j < favHeap.tipArray.length; j++) {

		var tips = document.createElement("div");
		var tipsElement = document.createElement("span");

		var deleteTip = document.createElement("img");
		deleteTip.src = "cross.jpg";
		deleteTip.style.width = "10px";
		deleteTip.style.height = "10px";
		deleteTip.onclick = function(){
			alert("Favorite deleted!");			
		}
	
		var tipsTitle = favHeap.tipArray[j].tip_title;
		var tipsTitleNode = document.createTextNode(tipsTitle);

		tipsElement.title = favHeap.tipArray[j].tip_content;

		tipsElement.onclick = function(){
			
			newWindow = window.open();
			newWindow.document.write(this.title);
			newWindow.focus();

		};

		tipsElement.appendChild(tipsTitleNode);
		tips.appendChild(tipsElement);
		tips.appendChild(deleteTip);	

		tipsPointer.parentNode.insertBefore(tips, tipsPointer.nextSibling);

		tipsPointer = tipsPointer.nextSibling;

	}

	//print out events
	for(var k = 0; k < favHeap.eventArray.length; k++) {

		var events = document.createElement("div");
		var eventsElement = document.createElement("span");

		var deleteEvent = document.createElement("img");
		deleteEvent.src = "cross.jpg";
		deleteEvent.style.width = "10px";
		deleteEvent.style.height = "10px";
		deleteEvent.onclick = function(){
			alert("Favorite deleted!");			
		}

		var eventsTitle = favHeap.eventArray[k].event_title;
		var eventsUrl = eventArray[k].event_url;

		var eventsTitleNode = document.createTextNode(eventsTitle);

		eventsElement.title = eventsUrl;

		eventsElement.onclick = function(){
			window.open(this.title);
		};

		eventsElement.appendChild(eventsTitleNode);
		events.appendChild(eventsElement);
		events.appendChild(deleteEvent);

		eventsPointer.parentNode.insertBefore(events, eventsPointer.nextSibling);

		eventsPointer = eventsPointer.nextSibling;

	}

}