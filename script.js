//<script src="getFavHeap.js"></script>

//favorite object for testing
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
var tipArray = new Array();
var eventArray = new Array();

rssArray[0] = fav_1;
rssArray[1] = fav_2;
tipArray[0] = fav_3;
tipArray[1] = fav_4;
eventArray[0] = fav_5;
eventArray[1] = fav_6;
// test object

//this function needs to be the function that stores favorites object into the database
//for the button that adds favorites
function addFavorites(userId, type, typeId){
	alert("Favorites Added!");
}

//function for the button that deletes the favorites
//needs to delete the favorite object in the database
function deleteFavorites(userId, type, typeId){
	alert("Favorites Deleted!");
}

//display the favorites page
function displayFavorites(){

	var rssPointer = document.getElementById("newsHead");
	var tipPointer = document.getElementById("tipsHead");
	var eventPointer = document.getElementById("eventsHead");

	//print out news
	for(var i = 0; i < rssArray.length; i++) {

		//create new div element
		var rssElement = document.createElement("div");

		//button for rssElement
		rssElement.onclick = function(){
			alert("clicked");
		};

		//get the title		
		var rssTitle = rssArray[i].title;
		
		//create textNode
		var rssTitleNode = document.createTextNode(rssTitle);
		
		//rssElement.appendChild(rssUrlElement);
		rssElement.appendChild(rssTitleNode);
		rssPointer.parentNode.insertBefore(rssElement, rssPointer.nextSibling);

		//move the pointer down so that the list would be in order
		rssPointer = rssPointer.nextSibling;

	}

	//print out tips	
	for(var j = 0; j < tipArray.length; j++) {

		var tipElement = document.createElement("div");

		tipElement.onclick = function(){
			alert("clicked");
		};

		var tipTitle = tipArray[j].title;
		var tipTitleNode = document.createTextNode(tipTitle);

		tipElement.appendChild(tipTitleNode);	
		tipPointer.parentNode.insertBefore(tipElement, tipPointer.nextSibling);

		tipPointer = tipPointer.nextSibling;

	}

	//print out events
	for(var k = 0; k < eventArray.length; k++) {

		var eventElement = document.createElement("div");

		eventElement.onclick = function(){
			alert("clicked");
		};

		var eventTitle = eventArray[k].title;
		var eventTitleNode = document.createTextNode(eventTitle);

		eventElement.appendChild(eventTitleNode);
		eventPointer.parentNode.insertBefore(eventElement, eventPointer.nextSibling);

		eventPointer = eventPointer.nextSibling;

	}

}
