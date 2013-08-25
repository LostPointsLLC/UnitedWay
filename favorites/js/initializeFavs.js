
/* Grabs the feeds from the database and displays them */
function initializeFavs() {
	displayFavNews();
	displayFavTips();
	assignDataRoles();
	$('#set').collapsibleset('refresh');
	
}

function assignDataRoles() {

	/* Assigns the "collapsible" data role to sections */
	var sections = document.getElementsByClassName("section");
	for(var i = 0; i < sections.length; i++)
		sections[i].setAttribute("data-role", "collapsible");

	/* Assigns 'collapsible-set' to the id = set */
	document.getElementById("set").setAttribute("data-role", "collapsible-set");
	
	/* Assigns 'content' to the id = content */
	document.getElementById("content").setAttribute("data-role", "content");
}



/* Displays the favorited rss feeds using localStorage.rssJsonObject
 * Displayall 
 */
 
 // "http://host5.evanced.info/champaign/evanced/eventsignup.asp?ID=8005":
 // ["294","FriendShop Bookstore: Members' Half-Price Sale","Champaign Public Library Events","483"],
 
 // {a, b, c, d}
function displayFavNews() {
	var rssObj = jQuery.parseJSON(localStorage.rssJsonObject);
	var rssPointer = document.getElementById("news-feed");
	var outputString = "";
	var isEmpty = true;
	var numFeeds = 0;
	// Check if there are any rss feeds at all
	for (var testEmpty in rssObj) {
		isEmpty = false;
		numFeeds++;
	}
	if(isEmpty) {	
		if(localStorage.lang=="ENG")
			outputString += "<p>No news to display!</p>";
		else
			outputString += "<p>No hay noticias para mostrar!</p>";
			
		rssPointer.innerHTML += outputString;
		return;
	}	 
	
	for (var feed in rssObj) {
		numFeeds--;
		var rssKey = rssObj[feed][0];
		var rssUrl = feed;
		var rssTitle = rssObj[feed][1];
		rssTitle = rssTitle.replace(/\'/g, "&#39;");
		rssTitle = rssTitle.replace(/\"/g, "&#34;");
		var last = (numFeeds == 0) ? "last-item" : "";
		outputString += "<div class='list-item " + last + "' id='" + rssKey +"'>"
		outputString += "<div class='item-text-box'>";
		outputString += "<a href='" + rssUrl +"'>" + rssTitle + "</a>";
		outputString += "</div>";
		outputString += "<div class='delete-box'><img class='delete' src='../images/remove-button-blkoutline.png' class='delete' onClick='unfavoriteRss(&quot;" + rssKey + " &quot; , &quot; " + rssTitle + " &quot; , &quot;" + rssUrl + "&quot;)'/></div>";
		outputString += "</div>";
	}
	rssPointer.innerHTML += outputString;
}

$(document).on("click", ".tip-content", function() {
	sessionStorage.currTip = $(this).text();
	alert(sessionStorage.currTip);
	//document.location.href = "singleTip.html";
});

/* Displays the favorited tips using localStorage.tipJsonObject
 */
function displayFavTips() {
	var tipObj = jQuery.parseJSON(localStorage.tipJsonObject);
	var tipsPointer = document.getElementById("tips");
	var outputString = "";
	
	// Else, loop through localStorage.tipJsonObject and display tips.
	var parity = "even";
	var catCount = 0;
	var last = "";
	var noTips = true;
	for (var category in tipObj) {
		catCount++; // To catch last category, for the sake of giving it the class "last-item".
		for (var i = 0; i < tipObj[category].length; i++) {
			for (var j = 0; j < tipObj[category][i].length; j++) {
				//tipPackage[category][i][j] // this is the actual tip! i is the age category, j is the fav_typeID
				noTips = false;
				if (catCount == 4 && (i == tipObj[category].length - 1) && (j == tipObj[category][i].length - 1))
					last = "last-item";
				var divID = category + i + j
				outputString += "<div class='list-item " +  parity + " " + last + "' id='" + divID + "'>"
				outputString += "<div class='item-text-box'>";
				if(localStorage.lang=="ENG")	
					outputString += "<a class='tip-content'>" + tipPackage[category][i][tipObj[category][i][j]] + "</a>";
				else
					outputString += "<a class='tip-content'>" + tipPackage_es[category][i][tipObj[category][i][j]] + "</a>";
				outputString += "</div>";
				outputString += "<div class='delete-box'><img class='delete' src='../images/remove-button-blkoutline.png' class='delete' onClick='unfavoriteTips(&quot;" + category + "&quot;, &quot;" + i + "&quot;, &quot;" + j + "&quot;)'/></div>";
				outputString += "</div>";
				parity = (parity == "even") ? "odd" : "even";
			}
		}
	}
	// If no tips have been favoured, display so
	if(noTips) {
		if(localStorage.lang=="ENG")
			outputString += "<p>No tips to display!</p>";
		else
			outputString += "<p>No hay consejos para mostrar!</p>";
		tipsPointer.innerHTML += outputString;
		return;
	}
	// Else, inject HTML and leave
	tipsPointer.innerHTML += outputString;
}
