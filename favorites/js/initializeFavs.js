

/* Grabs the feeds from the database and displays them */
function initializeFavs() {

	//alert(sessionStorage.pid);
	var favHeap = getFavHeap(parseInt(sessionStorage.pid));

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
	if(!rssArray.length) {
		outputString += "<p>No events to display!</p>";
		rssPointer.innerHTML += outputString;
		return;
	}	 
	for(var i = 0; i < rssArray.length; i++) {
		var rss = rssArray[i];
		var parity 		= (i % 2 == 0) ? "even" : "odd";
		var last 	= (i == rssArray.length-1) ? "last-item" : "";
		var outputString = "";
		outputString += "<div class='list-item " +  parity + " " + last + "' id='" + rss.fav_id +"'>"
		outputString += "<div class='item-text-box'>";
		outputString += "<a href='" + rss.rss_url +"'>" + rss.rss_title + "</a>";
		outputString += "</div>";
		outputString += "<div class='delete-box'><img src='../images/remove-button.png' class='delete' onClick='unfavorite(" + rss.fav_id + ")'/></div>";
		outputString += "</div>";
		rssPointer.innerHTML += outputString;
	}
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
	 *	 		<a>tip_content</a>
	 *		</div>
			<div><a class="delete-box" onClick="unfavorite(fav_id)"></div>
	 *	</div>
	 *
	 */
	if(!tipsArray.length) {
		outputString += "<p>No events to display!</p>";
		tipsPointer.innerHTML += outputString;
		return;
	}	
	for(var i = 0; i < tipsArray.length; i++) {
		var tip = tipsArray[i];
		var parity = (i % 2 == 0) ? "even" : "odd";
		var last 	= (i == tipsArray.length-1) ? "last-item" : "";
		var outputString = "";
		outputString += "<div class='list-item " +  parity + " " + last + "' id='" + rss.fav_id +"'>"
		outputString += "<div class='item-text-box'>";
		outputString += "<a>" + tip.tip_content + "</a>";
		outputString += "</div>";
		outputString += "<div class='delete-box'><img src='../images/remove-button.png' class='delete' onClick='unfavorite(" + tip.fav_id + ")'/></div>";
		outputString += "</div>";
		tipsPointer.innerHTML += outputString;
	}

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
	
	for(var i = 0; i < eventsArray.length; i++) {
		console.log("Hello world!");
		var event = eventsArray[i];
		var parity = (i % 2 == 0) ? "even" : "odd";
		var last 	= (i == eventsArray.length-1) ? "last-item" : "";
		outputString += "<div class='list-item " +  parity + " " + last + "' id='" + event.fav_id +"'>"
		outputString += "<div class='item-text-box'>";
		outputString += "<a href='" + event.event_url +"'>" + event.event_title + "</a>";
		outputString += "<br><p><b>Where: </b>" + event.event_place + "</p>";
		outputString += "<br><p><b>When: </b>" + event.event_date + ", " + event.event_time + "</p>";
		outputString += "</div>";
		outputString += "<div class='delete-box'><img src='../images/remove-button.png' class='delete' onClick='unfavorite(" + event.fav_id + ")'/></div>";
		outputString += "</div>";
		eventsPointer.innerHTML += outputString;
	 
	}
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

