//favorite object for testing
function favObject(type, title, content, url)
{
	this.type = type;
	this.title = title;
	this.content = content;
}

var fav_1 = new favObject("News", "United Way has prescription discount cards", "http://www.news-gazette.com/news/local/2013-05-18/united-way-has-prescription-discount-cards.html");
var fav_2 = new favObject("News", "Champaign County United Way short of goal by 9 percent", "http://www.news-gazette.com/news/local/2013-04-09/champaign-county-united-way-short-goal-9-percent.html");
var fav_3 = new favObject("News", "Children's expo Saturday morning at Lincoln Square", "http://www.news-gazette.com/news/business/2013-04-06/childrens-expo-saturday-morning-lincoln-square.html");

var fav_4 = new favObject("Tips", "Which book is good for you son?", "http://www.goodreads.com/shelf/show/kindergarten");
var fav_5 = new favObject("Tips", "Make your child happy", "http://www.parents.com/toddlers-preschoolers/development/fear/raising-happy-children");
var fav_6 = new favObject("Tips", "Tips on how to make temper tantrums stop", "http://www.drphil.com/articles/article/293");

var fav_7 = new favObject("Events", "Have picnic with your child", "http://www.uwayhelps.org/upcoming-events");
var fav_8 = new favObject("Events", "Seminar for kindergarten readiness","http://www.uwayhelps.org/upcoming-events");
var fav_9 = new favObject("Events", "Fun place for your child", "http://www.uwayhelps.org/upcoming-events");

var rssArray = new Array();
var tipsArray = new Array();
var eventsArray = new Array();

rssArray[0] = fav_1;
rssArray[1] = fav_2;
rssArray[2] = fav_3;
tipsArray[0] = fav_4;
tipsArray[1] = fav_5;
tipsArray[2] = fav_6;
eventsArray[0] = fav_7;
eventsArray[1] = fav_8;
eventsArray[2] = fav_9;
// test object


//display the favorites page
//need userid but took out for the demo
function displayFavorites(){

	//call the function that gets the rss,tips and events arrays, took out for demo
	//var favHeap = getFavHeap(userID);

	//variables that works as pointers to the top of each list
	var rssPointer = document.getElementById("newsHead");
	var tipsPointer = document.getElementById("tipsHead");
	var eventsPointer = document.getElementById("eventsHead");

	//print out news
	for(var i = 0; i < rssArray.length; i++) {

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
		var rssTitle = rssArray[i].title;
		//get url
		var rssUrl = rssArray[i].content;

		
		//create textNode
		var rssTitleNode = document.createTextNode(rssTitle);
		
		//button for rssElement, when clicked, it would open up 
		//a new page that has the url for the news feed
		rssElement.onclick = function(){
			window.open(rssUrl);
		};

		//append title and delete button img
		rssElement.appendChild(rssTitleNode);
		rss.appendChild(rssElement);
		rss.appendChild(deleteRss);

		//place the element into the favorites page
		rssPointer.parentNode.insertBefore(rss, rssPointer.nextSibling);

		//move the pointer down so that the list would be in order
		rssPointer = rssPointer.nextSibling;

	}

	//print out tips	
	for(var j = 0; j < tipsArray.length; j++) {

		var tips = document.createElement("div");
		var tipsElement = document.createElement("span");

		var deleteTip = document.createElement("img");
		deleteTip.src = "cross.jpg";
		deleteTip.style.width = "10px";
		deleteTip.style.height = "10px";
		deleteTip.onclick = function(){
			alert("Favorite deleted!");			
		}
	
		var tipsTitle = tipsArray[j].title;
		var tipsContent = tipsArray[j].content;
		var tipsTitleNode = document.createTextNode(tipsTitle);

		tipsElement.onclick = function(){
			window.open(tipsContent);
		};

		tipsElement.appendChild(tipsTitleNode);
		tips.appendChild(tipsElement);
		tips.appendChild(deleteTip);	

		tipsPointer.parentNode.insertBefore(tips, tipsPointer.nextSibling);

		tipsPointer = tipsPointer.nextSibling;

	}

	//print out events
	for(var k = 0; k < eventsArray.length; k++) {

		var events = document.createElement("div");
		var eventsElement = document.createElement("span");

		var deleteEvent = document.createElement("img");
		deleteEvent.src = "cross.jpg";
		deleteEvent.style.width = "10px";
		deleteEvent.style.height = "10px";
		deleteEvent.onclick = function(){
			alert("Favorite deleted!");			
		}

		var eventsTitle = eventsArray[k].title;
		var eventsUrl = eventsArray[k].content;

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