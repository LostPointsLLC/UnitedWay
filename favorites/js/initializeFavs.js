
/* Grabs the feeds from the database and displays them */
function initializeFavs() {
	var favHeap;
	if(localStorage.remember==1){
		favHeap = getFavHeap(parseInt(localStorage.pid));
	}
	else{
		favHeap = getFavHeap(parseInt(sessionStorage.pid));
	}
	displayFavNews(favHeap.rssArray);
	displayFavTips(favHeap.tipsArray);
	displayFavEvents(favHeap.eventsArray);
}

/* Displays the favorited rss feeds using
 * the rssArray.
 */
function displayFavNews(rssArray) {

	var rssPointer = document.getElementById("news-feed-content");

	/* Ideally, each div should look like this:
	 *
	 *	<div class="list-item parity" id="fav_id">
	 *		<div class="item-text-box">
	 *	 		<a href="rss_url">rss_title</a>
	 *		</div>
			<div><a class="delete" onClick="unfavorite(fav_id)"></div>
	 *	</div>
	 *
	 * We don't have the content from the scraper yet, so we'll let that one rest.
	 */
	var outputString = "";
	if(!rssArray.length) {
		outputString += "<p>No news to display!</p>";
		rssPointer.innerHTML += outputString;
		return;
	}	 
	for(var i = 0; i < rssArray.length && i < fav_limit; i++) {
		var rss = rssArray[i];
		var parity 		= (i % 2 == 0) ? "even" : "odd";
		var last 	= (i == rssArray.length-1) ? "last-item" : "";
		outputString += "<div class='list-item " +  parity + " " + last + "' id='" + rss.fav_id +"'>"
		outputString += "<div class='item-text-box'>";
		outputString += "<a href='" + rss.rss_url +"'>" + rss.rss_title + "</a>";
		outputString += "</div>";
		outputString += "<div class='delete-box'><img class='delete' src='../images/remove-button-blkoutline.png' class='delete' onClick='unfavorite(" + rss.fav_id + ")'/></div>";
		outputString += "</div>";
	}
	if(i < rssArray.length) {
		var parity 		= (i % 2 == 0) ? "even" : "odd";
		var last 	= "last-item";
		outputString += "<div class='list-item " +  parity + " " + last + "' id='seeMore'>"
		outputString += "<div class='item-text-box'>";
		outputString += "<a>See More</a>";
		outputString += "</div>";
		outputString += "<div class='delete-box'></div>";
		outputString += "</div>";		
	
	}
	rssPointer.innerHTML += outputString;
}


/* Displays the favorited tips using the
 * tipsArray.
 */
function displayFavTips(tipsArray) {
	var tipsPointer = document.getElementById("tips-content");

	/* Ideally, each div should look like this:
	 *
	 *	<div class="list-item parity" id="fav_id">
	 *		<div class="item-text-box">
	 *	 		<a>tip content</a>
	 *		</div>
			<div><a class="delete-box" onClick="unfavorite(fav_id)"></div>
	 *	</div>
	 *
	 */
	 
	var outputString = "";
	if(!tipsArray.length) {
		outputString += "<p>No tips to display!</p>";
		tipsPointer.innerHTML += outputString;
		return;
	}	
	for(var i = 0; i < tipsArray.length && i < fav_limit; i++) {
		var tip = tipsArray[i];
		var tipArray;
		switch(tip.tip_category) { // Get tip content
			case "health":
				tipArray = healthArray[parseInt(tip.tip_age)];
				break;
				
			case "growth":
				tipArray = growthArray[parseInt(tip.tip_age)];
				break;
				
			case "safety":
				tipArray = safetyArray[parseInt(tip.tip_age)];
				break;
				
			case "playtime":
				tipArray = playtimeArray[parseInt(tip.tip_age)];
				break;
		}
		var parity = (i % 2 == 0) ? "even" : "odd";
		var last 	= (i == tipsArray.length-1) ? "last-item" : "";

		outputString += "<div class='list-item " +  parity + " " + last + "' id='" + tip.fav_id +"'>"
		outputString += "<div class='item-text-box'>";
		outputString += "<a class='tip-content' title='" + tip.tip_id + "'>" + tipArray[parseInt(tip.tip_id)] + "</a>";
		outputString += "</div>";
		outputString += "<div class='delete-box'><img class='delete' src='../images/remove-button-blkoutline.png' class='delete' onClick='unfavorite(" + tip.fav_id + ")'/></div>";
		outputString += "</div>";
	}
	
	if(i < tipsArray.length) {
		var parity 		= (i % 2 == 0) ? "even" : "odd";
		var last 	= "last-item";
		outputString += "<div class='list-item " +  parity + " " + last + "' id='seeMore'>"
		outputString += "<div class='item-text-box'>";
		outputString += "<a>See More</a>";
		outputString += "</div>";
		outputString += "<div class='delete-box'></div>";
		outputString += "</div>";		
	
	}
	
	
	
	tipsPointer.innerHTML += outputString;

}

/* Displays the favorited events using the
 * eventsArray
 */
function displayFavEvents(eventsArray) {

	var eventsPointer = document.getElementById("events-content");
	var outputString = "";
	/* Ideally, each div should look like this:
	 *
	 *	<div class="list-item parity" id="fav_id">
	 *		<div class="item-text-box">
	 *	 		<a href="events_url">events.title</a>
				<br><p><b>Where: </b>event_place</p>
				<br><p><b>When: </b>event_date, event_time</p>
	 *		</div>
			<div><a class="delete-box" onClick="unfavorite(fav_id)"></div>
	 *	</div>
	 *
	 * We don't have the content from the scraper yet, so we'll let that one rest.
	 */
	if(!eventsArray.length) {
		outputString += "<p>No events to display!</p>";
		eventsPointer.innerHTML += outputString;
		return;
	}
	
	for(var i = 0; i < eventsArray.length && i < fav_limit; i++) {
		var event = eventsArray[i];
		var parity = (i % 2 == 0) ? "even" : "odd";
		var last 	= (i == eventsArray.length-1) ? "last-item" : "";
		outputString += "<div class='list-item " +  parity + " " + last + "' id='" + event.fav_id +"'>"
		outputString += "<div class='item-text-box'>";
		outputString += "<a href='" + event.event_url +"'>" + event.event_title + "</a>";
		outputString += "<br><p><b>Where: </b>" + event.event_place + "</p>";
		outputString += "<br><p><b>When: </b>" + event.event_date + ", " + event.event_time + "</p>";
		outputString += "</div>";
		outputString += "<div class='delete-box'><img class='delete' src='../images/remove-button-blkoutline.png' class='delete' onClick='unfavorite(" + event.fav_id + ")'/></div>";
		outputString += "</div>";
	 
	}
	
	if(i < eventsArray.length) {
		var parity 		= (i % 2 == 0) ? "even" : "odd";
		var last 	= "last-item";
		outputString += "<div class='list-item " +  parity + " " + last + "' id='seeMore'>"
		outputString += "<div class='item-text-box'>";
		outputString += "<a>See More</a>";
		outputString += "</div>";
		outputString += "<div class='delete-box'></div>";
		outputString += "</div>";		
	
	}	
	
	eventsPointer.innerHTML += outputString;
}

// Function that returns an array of all of the favorite objects.
// Returns a favHeap object.
function getFavHeap(userID) {
	var datastring = 'userID=' + userID;
	
	var rssArray = new Array();
	var tipsArray = new Array();
	var eventsArray = new Array();
	
	$.ajax({
		type: "POST",
		url: "php/getFavHeap.php",
		data: datastring,
		async: false,
		cache: false,
		success: function(data) {
	
			// Makes the JSON string into a workable string
			var query_output = jQuery.parseJSON(data);

			// First make an array full of RSS objects
			$.each(query_output[0], function(index_of_row, row) {
				rssArray.push(new rss(row));
			});
			
			$.each(query_output[1], function(index_of_row, row) {
				tipsArray.push(new tip(row));
			});
			
			$.each(query_output[2], function(index_of_row, row) {
				eventsArray.push(new _event(row));
			});
		}
	
	});
	
	return new favHeap(rssArray, tipsArray, eventsArray);
}


