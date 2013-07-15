var title;

function rssData(url, limit, title, source) {

	this.rssurl = rssurl;
	this.limit = limit;
	this.title = title;
	this.source = source;

}



$(document).ready() {
	
	google.load("feeds", "1");

	var rssurl = "http://host5.evanced.info/champaign/evanced/eventsxml.asp?lib=ALL&nd=30&feedtitle=Champaign+Public+Library+Events&dm=rss2";
	var limit = 4;
	var title = "Champaign Public Library Events";
	var source = "Champaign Public Library";
	

	var feedData = rssData(rssurl, limit, title, source);
	rssfeedsetup(feedData);	



}

function rssfeedsetup(feedData){
	var feedpointer = new google.feeds.Feed(feedData.rssurl);
	feedpointer.setNumEntries(feedData.limit);
	feedpointer.load(displayfeed); /* Calls the displayfeed function */
}


function displayfeed(result){

	if (!result.error){
	
		// thefeeds is an array of objects that contains the RSS feed information.
		// thefeeds[i].link is the URL.
		// thefeeds[i].title is the headline.
		var thefeeds = result.feed.entries; // theFeeds is a global variable to be accessed in add-remove-feed.js	
		
		/* Modifies the rssoutput variable, which will be interpreted as HTML 
		 * Each iteration appends the headline inside a list item <li>
		 */
		for (var i = 0; i < thefeeds.length; i++) {

			var inner = "<div class='inner-div'><p id='" + i + "' class='item-text'><a href='" + thefeeds[i].link + "'>" + thefeeds[i].title + "</a></p></div>"
			var star = "<a onClick='favFunction(" + i + ")'><img src='../images/star-button.png'></a>";

			if(i == thefeeds.length - 1) {
				rssoutput += " <div class='even item last-item'>" + inner + star + "</div>";
				break;
			}
			if(i % 2 == 0) {
				rssoutput += "<div class='even item'>" + inner + star + "</div>";
			}
			else {
				rssoutput += "<div class='odd item'>" + inner + star + "</div>";
			}
		}
		feedcontainer.innerHTML = rssoutput;
	}
	
	else
		alert("Error fetching feeds!");
}



