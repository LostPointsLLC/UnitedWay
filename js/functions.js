/**
 * Calculate age of child in months.
 *
 */
 
 function calculateMonth(birthdate) {
 	var currentdate = new Date(); 
	var currentYr =  currentdate.getFullYear();
	var currentMth = currentdate.getMonth() + 1;
	var dateArray = birthdate.split("-");
	var birthYr = parseInt(dateArray[0]);
	var birthMth = parseInt(dateArray[1]);
	var diff = (currentMth - birthMth + (12 * (currentYr - birthYr)));
	return diff;
 }


/**
 * Calculates accurate age of child (Returns string)
 *
 */

function calculateAge(months) {
	if ( (months % 12) > 0) {
		var year = String(parseInt(months / 12));
		var month = String(months % 12);
		var retStr = year + " Yrs, " + month + " Mths";
		return retStr;
	}
	else {
		var month = String(months);
		var retStr = month + "Mths";
		return retStr;
	}
}
