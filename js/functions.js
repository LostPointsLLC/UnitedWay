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
		var retStr = year + " Yrs,<br> " + month + " Mths";
		return retStr;
	}
	else {
		var month = String(months);
		var retStr = month + " Mths";
		return retStr;
	}
}

/**
 * Returns number of index (category) used as the first index for any of the 4 tip arrays.
 *
 */
// categories:
// 0: At 0 ~ 2 months
// 1: At 2 ~ 4 months
// 2: At 4 ~ 6 months
// 3: At 6 ~ 12 months
// 4: At 12 ~ 18 months
// 5: At 18 ~ 24 months
// 6: At 24 ~ 36 months
// 7: At 3 yrs old
// 8: At 4 yrs old
// 9: At 5 yrs old

function calcCat(monthcount) {
    if (monthcount >= 0 && monthcount < 2) {
        return 0;   
    }
    else if (monthcount >= 2 && monthcount < 4) {
        return 1;   
    }
    else if (monthcount >= 4 && monthcount < 6) {
        return 2;   
    }
    else if (monthcount >= 6 && monthcount < 12) {
        return 3;   
    }
    else if (monthcount >= 12 && monthcount < 18) {
        return 4;   
    }
    else if (monthcount >= 18 && monthcount < 24) {
        return 5;   
    }
    else if (monthcount >= 24 && monthcount < 36) {
        return 6;   
    }
    else if (monthcount >= 36 && monthcount < 48) {
        return 7;   
    }
    else if (monthcount >= 48 && monthcount < 60) {
        return 8;   
    }
    else if (monthcount >= 60 && monthcount < 72) {
        return 9;   
    }
    else {
        return -1;    
    }
}
