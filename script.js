//favorite object for testing
function favObject(type, title, content)
{
	this.type = type;
	this.title = title;
	this.content = content;
}

var fav_1 = new favObject("News", "What not to eat", "you should not eat coin");
var fav_2 = new favObject("News", "Chambana Mom fundraising", "We raised about 100 dollars");
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

	var rssElement = document.createElement("div");
	var tipElement = document.createElement("div");
	var eventElement = document.createElement("div");

	var rssPointer = document.getElementById("newsHead");
	var tipPointer = document.getElementById("tipsHead");
	var eventPointer = document.getElementById("eventsHead");

	/* test for null
	if(rssPointer == null){

		alert("rssPointer is null!");
	}

	if(tipPointer == null){

		alert("tipPointer is null!");
	}

	if(eventPointer == null){

		alert("eventPointer is null!");
	}
	*/

	//print out news
	for(var i = 0; i < rssArray.length; i++) {

		var rssTitle = rssArray[i].title;
		var rssTitleNode = document.createTextNode(rssTitle);

		rssElement.appendChild(rssTitleNode);
		rssPointer.parentNode.insertBefore(rssElement, rssPointer.nextSibling);

	}

	//print out tips	
	for(var j = 0; j < tipArray.length; j++) {

		var tipTitle = tipArray[j].title;
		var tipTitleNode = document.createTextNode(tipTitle);

		tipElement.appendChild(tipTitleNode);	
		tipPointer.parentNode.insertBefore(tipElement, tipPointer.nextSibling);

	}

	//print out events
	for(var k = 0; k < eventArray.length; k++) {

		var eventTitle = eventArray[k].title;
		var eventTitleNode = document.createTextNode(eventTitle);

		eventElement.appendChild(eventTitleNode);
		eventPointer.parentNode.insertBefore(eventElement, eventPointer.nextSibling);

	}

}

//displayFavorites(rssArray, tipArray, eventArray);
//rssArray, tipArray, eventArray