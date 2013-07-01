//favorite object for testing
/*
function favObject(type, title, content, url)
{
	this.type = type;
	this.title = title;
	this.content = content;
	this.url = url;
}

var fav_1 = new favObject("News", "What not to eat", "you should not eat coin", "https://google.com");
var fav_2 = new favObject("News", "Chambana Mom fundraising", "We raised about 100 dollars", "https://yahoo.com");
var fav_3 = new favObject("Tips", "Which book is good for you son?", "Nothing");
var fav_4 = new favObject("Tips", "Make your child happy", "Laugh, laugh, and laugh");
var fav_5 = new favObject("Events", "Buy your daughter a doll!", "Don't");
var fav_6 = new favObject("Events", "google","google.com");

var rssArray = new Array();
var tipsArray = new Array();
var eventsArray = new Array();

rssArray[0] = fav_1;
rssArray[1] = fav_2;
tipsArray[0] = fav_3;
tipsArray[1] = fav_4;
eventsArray[0] = fav_5;
eventsArray[1] = fav_6;
// test object
*/

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
		
		//button for rssElement
		rssElement.onclick = function(){
			window.open(rssUrl);
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
	for(var j = 0; j < favHeap.tipsArray.length; j++) {

		var tips = document.createElement("div");
		var tipsElement = document.createElement("span");

		var deleteTip = document.createElement("img");
		deleteTip.src = "cross.jpg";
		deleteTip.style.width = "10px";
		deleteTip.style.height = "10px";
		deleteTip.onclick = function(){
			alert("Favorite deleted!");			
		}
	
		var tipsTitle = favHeap.tipsArray[j].tip_title;
		var tipsTitleNode = document.createTextNode(tipsTitle);

		tipsElement.onclick = function(){
			window.open();
		};

		tipsElement.appendChild(tipsTitleNode);
		tips.appendChild(tipsElement);
		tips.appendChild(deleteTip);	

		tipsPointer.parentNode.insertBefore(tips, tipsPointer.nextSibling);

		tipsPointer = tipsPointer.nextSibling;

	}

	//print out events
	for(var k = 0; k < favHeap.eventsArray.length; k++) {

		var events = document.createElement("div");
		var eventsElement = document.createElement("span");

		var deleteEvent = document.createElement("img");
		deleteEvent.src = "cross.jpg";
		deleteEvent.style.width = "10px";
		deleteEvent.style.height = "10px";
		deleteEvent.onclick = function(){
			alert("Favorite deleted!");			
		}

		var eventsTitle = favHeap.eventsArray[k].event_title;
		var eventsUrl = eventsArray[k].event_url;

		var eventsTitleNode = document.createTextNode(eventsTitle);

		eventsElement.onclick = function(){
			window.open(eventsUrl);
		};

		eventsElement.appendChild(eventsTitleNode);
		events.appendChild(eventsElement);
		events.appendChild(deleteEvent);

		eventsPointer.parentNode.insertBefore(events, eventsPointer.nextSibling);

		eventsPointer = eventsPointer.nextSibling;

	}

}