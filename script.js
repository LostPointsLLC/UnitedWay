
function favObject(type, title, content)
{
	this.type = type;
	this.title = title;
	this.content = content;
}

var fav_1 = new favObject("Tips", "What not to eat", "you should not eat coin");
var fav_2 = new favObject("Events", "Chambana Mom fundraising", "We raised about 100 dollars");
var fav_3 = new favObject("Tips", "Which book is good for you son?", "Nothing");
var fav_4 = new favObject("Tips", "Make your child happy", "Laugh, laugh, and laugh");
var fav_5 = new favObject("Events", "Buy your daughter a doll!", "Don't");
var fav_6 = new favObject("News", "google","google.com");

var favArray = new Array();
favArray[0] = fav_1;
favArray[1] = fav_2;
favArray[2] = fav_3;
favArray[3] = fav_4;
favArray[4] = fav_5;
favArray[5] = fav_6;


function addFavorites(href, title){
	alert(title);
}


function displayFavorites(favArray)
{
	for(var i = 0; i < favArray.length; i++)
	{
		if(favArray[i].type == "Tips")
		{

			alert(favArray[i].title);
			
		}
		else if(favArray[i].type == "Events")
		{
			alert(favArray[i].title);
		}
		else if(favArray[i].type == "News")
		{
			alert(favArray[i].title);
		}
	}
}

displayFavorites(favArray);
