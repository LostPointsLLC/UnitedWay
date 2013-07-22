/*
 *
 * Global variables used to update database
 * addFavArr
 * delFavArr
 *
 */

var addFavArr = new Array ();
var delFavArr = new Array ();
 
$(document).ready(function() {
	// Display Picture
	var tipCategory = sessionStorage.tCat.toString();
	
	// PHP query 
	var jObj = jQuery.parseJSON(sessionStorage.jsonString);
	var pid = sessionStorage.pid.toString();
	var taskCat = sessionStorage.tCat.toString();
	var childID = sessionStorage.cid;
	
	// Get child age in months (from functions.js)
	// Then get whatever age category the child fits in.
	var monthcount = calculateMonth(jObj[childID]["child_birthday"]);
	var ageIndex = calcCat(monthcount);
	
	var dataString = "pid=" + pid + "&taskCat=" + taskCat + "&ageIndex=" + ageIndex;
	console.log("age in month is is : " + monthcount);
	console.log("age category is : " + ageIndex);
	
	$.ajax({
		type: "POST",
		url: "http://web.engr.illinois.edu/~heng3/php/tips/fetchFavTips.php",
		data: dataString,
		cache: false,
		success: function(data){
			console.log(data);
			displayTips(data);
		},
		error: function(xhr, error){
			alert("error");
		}
	 });
	 
	 
	 //displayTips();
});

/**
 * Display tips for particular age/ category
 */

function displayTips(param) {
	// Use session data to figure out child age
	var jObj = jQuery.parseJSON(sessionStorage.jsonString);
	var childID = sessionStorage.cid;
	// Get child age in months (from functions.js)
	// Then get whatever age category the child fits in.
	var monthcount = calculateMonth(jObj[childID]["child_birthday"]);
	var ageIndex = calcCat(monthcount);
	// Category ID "health", "growth", "safety", "playtime"
	var tipCategory = sessionStorage.tCat.toString();
	var tipArray;
	switch(tipCategory) {
		case "health":
			tipArray = healthArray[ageIndex];
			break;
			
		case "growth":
			tipArray = growthArray[ageIndex];
			break;
			
		case "safety":
			tipArray = safetyArray[ageIndex];
			break;
			
		case "playtime":
			tipArray = playtimeArray[ageIndex];
			break;
	}
	
	// Parse Favorites Array Here
	// All favorite ID's will be pushed into favArray
	var fObj = jQuery.parseJSON(param);
	var favArray = new Array();
	for (var key in fObj) {
		favArray.push(parseInt(fObj[key]));
	}
		
	for (var i = 0; i < tipArray.length; i++) {
		// Determine odd or even background
		var ctnClass;
		var ppClass;
		if (i % 2 == 0) {
			ctnClass = "tip-ctn-even";
			ppClass = "pp-even";
		}
		else{
			ctnClass = "tip-ctn-odd";
			ppClass = "pp-odd";
		}
			
		var entry;
		if (jQuery.inArray(i, favArray) != -1) {
			entry = "<div id = '" + i + "' class='" + ctnClass + "-fav' ><div class='tip'><p class='" + ppClass + "'>" + tipArray[i] + "</p></div></div>";
		}
		else {
			entry = "<div id = '" + i + "' class='" + ctnClass + "' ><div class='tip'><p class='" + ppClass + "'>" + tipArray[i] + "</p></div></div>";
		}
		$("#frontpiece").append(entry);
	}
	// Bind tips (.on, live method)
	// WHEN USER CLICKS TO FAVORITE
	$(document).on("click", ".tip-ctn-even", function() {
		$(this).attr("class","tip-ctn-even-fav");
		var favIndex = $(this).attr('id');
		var favIndex = parseInt(favIndex);
		addToFavArr(favIndex);
	});
	
	$(document).on("click", ".tip-ctn-odd", function() {
		$(this).attr("class","tip-ctn-odd-fav");
		var favIndex = $(this).attr('id');
		var favIndex = parseInt(favIndex);
		addToFavArr(favIndex);
	});
	
	// WHEN USER CLICKS TO UNFAVORITE
	$(document).on("click", ".tip-ctn-even-fav", function() {
		$(this).attr("class","tip-ctn-even");
		var favIndex = $(this).attr('id');
		var favIndex = parseInt(favIndex);
		delToFavArr(favIndex);
	});

	$(document).on("click", ".tip-ctn-odd-fav", function() {
		$(this).attr("class","tip-ctn-odd");
		var favIndex = $(this).attr('id');
		var favIndex = parseInt(favIndex);
		delToFavArr(favIndex);
	});
}

/*
 *
 * Global variables used to update database
 * addFavArr
 * delFavArr
 *
 * If in del array, remove this index from del array (which means that user had attempted to favourite this item)
 * else, put in add To FavArr (never been favourited, so add to add array
 */
 
function addToFavArr(favIndex) {
	var index = delFavArr.indexOf(favIndex);
	if (index != -1) {
		delFavArr.splice(index, 1);
	}
	else {
		addFavArr.push(favIndex);
	}
}

// Opposite of addToFavArr
function delToFavArr(favIndex) {
	var index = addFavArr.indexOf(favIndex)
	if (index 	!= -1) {
		addFavArr.splice(index, 1);
	}
	else {
		delFavArr.push(favIndex);
	}
}

function goBack() {
	document.location.href = "personal_cat.html";
}

$(window).unload( function () {
	var addStr = JSON.stringify(addFavArr);
	var delStr = JSON.stringify(delFavArr);
	
	console.log("Add these items" + addStr);
	console.log("Remove these items" + delStr);
	/*
	var updateString = dataString + "&newString=" + newProgressStr;
	
	$.ajax({ // update database with new check binary string
		type: "POST",
		url: "php/updateChecked.php",
		data: updateString,
		cache: false,
		async: false // must be asynchronous so the bars would be updated on previous page. Sorry!
	});
	
	*/
});
