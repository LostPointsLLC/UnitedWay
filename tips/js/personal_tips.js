/*
 *
 * Global variables used to update database
 * addFavArr
 * delFavArr
 *
 */
var addFavArr = new Array();
var delFavArr = new Array();

var addObj;
var delObj;
var addFavArrTarget;
var delFavArrTarget;

var ageIndex;
var taskCat;
 
$(document).ready(function() {
	// Display Picture
	var tipCategory = localStorage.tCat.toString();
	// PHP query 
	var jObj = jQuery.parseJSON(localStorage.childJsonObject);
	var pid = localStorage.pid.toString();
	var childID = localStorage.cid;
	taskCat = localStorage.tCat.toString();
	// Get child age in months (from functions.js)
	// Then get whatever age category the child fits in.
	var monthcount = calculateMonth(jObj[childID]["child_birthday"]);
	ageIndex = calcCat(monthcount);
	console.log("age in month is is : " + monthcount);
	console.log("age category is : " + ageIndex);
	
	// Initialize addFavArr and delFavArr
	addObj = jQuery.parseJSON(localStorage.addObj);
	addFavArrTarget = addObj[taskCat][ageIndex];
	
	delObj = jQuery.parseJSON(localStorage.delObj);
	delFavArrTarget = delObj[taskCat][ageIndex];
	
	/*
	var dataString = "pid=" + pid + "&taskCat=" + taskCat + "&ageIndex=" + ageIndex;
	$.ajax({
		type: "POST",
		url: "php/fetchFavTips.php",
		data: dataString,
		cache: false,
		success: function(data){
			console.log(data);
			displayTips(data);
		}
	 });
	 */
	 
	 // Get specific tip array.
	 var tipMasterArr = jQuery.parseJSON(localStorage.tipJsonObject);
	 var tipArr = tipMasterArr[taskCat][ageIndex];
	 displayTips(JSON.stringify(tipArr));
});

/**
 * Display tips for particular age/ category
 */

function displayTips(param) {
	// Use session data to figure out child age
	var jObj = jQuery.parseJSON(localStorage.childJsonObject);
	var childID = localStorage.cid;
	// Category ID "health", "growth", "safety", "playtime"
	var tipCategory = localStorage.tCat.toString();
	// Get child age in months (from functions.js)
	// Then get whatever age category the child fits in.
	var monthcount = calculateMonth(jObj[childID]["child_birthday"]);
	var ageIndex = calcCat(monthcount);
	var tipArray;
	switch(tipCategory) {
		case "health":
		if(localStorage.lang=="ENG"){
			tipArray = healthArray[ageIndex];
			break;
		}
		else{
			tipArray = healthArray_es[ageIndex];
			break;
		}
			
		case "growth":
		if(localStorage.lang=="ENG"){
			tipArray = growthArray[ageIndex];
			break;
		}
		else{
			tipArray = growthArray_es[ageIndex];
			break;
		}
			
		case "safety":
		if(localStorage.lang=="ENG"){
			tipArray = safetyArray[ageIndex];
			break;
		}
		else{
			tipArray = safetyArray_es[ageIndex];
			break;
		}
			
		case "playtime":
		if(localStorage.lang=="ENG"){
			tipArray = playtimeArray[ageIndex];
			break;
		}
		else{
			tipArray = playtimeArray_es[ageIndex];
			break;
		}
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
		
		// Determines whether an item is the last one or not. If it is, assign it the "last-item" class
		var last;
		if(i == tipArray.length - 1) 
			last = "";
		else last = "last-item";
		
		
			
		var entry;
		if (jQuery.inArray(i, favArray) != -1) {
			entry = "<div id = '" + i + "' class='" + ctnClass + "-fav tip-item " + last + "' ><div class='tip'><p class='" + ppClass + "'>" + tipArray[i] + "</p></div></div>";
		}
		else {
			entry = "<div id = '" + i + "' class='" + ctnClass + " tip-item " + last + "' ><div class='tip'><p class='" + ppClass + "'>" + tipArray[i] + "</p></div></div>";
		}
		

		$("#frontpiece").append(entry);
	}
	// Bind tips (.on, live method)
	// WHEN USER CLICKS TO FAVORITE
	$(document).on("click", ".tip-ctn-even", function() {
		$(this).removeClass("tip-ctn-even").addClass("tip-ctn-even-fav"); 
		var favIndex = $(this).attr('id');
		addToFavArr(favIndex);
	});
	
	$(document).on("click", ".tip-ctn-odd", function() {
		$(this).removeClass("tip-ctn-odd").addClass("tip-ctn-odd-fav");
		var favIndex = $(this).attr('id');
		addToFavArr(favIndex);
	});
	
	// WHEN USER CLICKS TO UNFAVORITE
	$(document).on("click", ".tip-ctn-even-fav", function() {
		$(this).removeClass("tip-ctn-even-fav").addClass("tip-ctn-even");
		var favIndex = $(this).attr('id');
		delToFavArr(favIndex);
	});

	$(document).on("click", ".tip-ctn-odd-fav", function() {
		$(this).removeClass("tip-ctn-odd-fav").addClass("tip-ctn-odd");
		var favIndex = $(this).attr('id');
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
console.log("=== debug tips === ");
console.log(JSON.stringify(addFavArr));
	// Loop through tip JSON object, adjust changes in add/delFavArrs
	var tipMasterArr = jQuery.parseJSON(localStorage.tipJsonObject);
	var tipArray = tipMasterArr[taskCat][ageIndex];
	for (var i = 0; i < addFavArr.length; i++) {
		tipArray.push(addFavArr[i]);
		var dIndex = delFavArrTarget.indexOf(addFavArr[i]);
		if (dIndex > -1 )
			delFavArrTarget.splice(dIndex, 1);
		else
			addFavArrTarget.push(addFavArr[i]);
	}
	
	for (var i = 0; i < delFavArr.length; i++) {
		var index = tipArray.indexOf(delFavArr[i]);
		if (index != -1) { // element exists
			tipArray.splice(index, 1);
		}
		var aIndex = addFavArrTarget.indexOf(delFavArr[i]);
		if (aIndex > -1 )
			addFavArrTarget.splice(aIndex, 1);
		else
			delFavArrTarget.push(delFavArr[i]);
	}
	// seal the deal
	localStorage.tipJsonObject = JSON.stringify(tipMasterArr);
	localStorage.addObj = JSON.stringify(addObj);
	localStorage.delObj = JSON.stringify(delObj);
	console.log("=== current tips object === ");
	console.log(localStorage.tipJsonObject);
	console.log("=== addObj === ");
	console.log(localStorage.addObj);
	console.log("=== delObj === ");
	console.log(localStorage.delObj);
	/*
	var addStr = JSON.stringify(addFavArr);
	var delStr = JSON.stringify(delFavArr);
	
	console.log("Add these items" + addStr);
	console.log("Remove these items" + delStr);
	var dataString = "user_id=" + localStorage.pid + "&removeString=" + delStr + "&addString=" + addStr + "&category=" + "tip" + "&age=" + ageIndex + "&tCat=" + taskCat;
	
	$.ajax({ // update database
		type: "POST",
		url: "../php/updateFavorites.php",
		data: dataString,
		cache: false,
		async: false, // must be asynchronous so the bars would be updated on previous page. Sorry!
		success: function(data){ 
			console.log(data);
		}
	});
	*/
});
