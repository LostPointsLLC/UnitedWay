// Returns false if there is a non-alpha char
function checkAlpha(string) {
	var alphabet = /^[a-zA-Z]/;
	if(string.match(alphabet))
		return true;
	else return false;
}

// Returns false if there is a non-number char
function checkNumbers(string) {
	var numbers = /^[0-9]/;
	if(string.match(numbers))
		return true;
	else return false;

}

// TODO: Figure out how to check for the
// existence of an email address
function checkEmail(email) {
	var character = /@/;
	if(email.match(character)) return true;
	else return false;
}
/* Verifies that the first, last, phone, email, and pass are
 * in a permissible form.
 * Returns an associative array of  five strings. If any given 
 * string is non-empty, then the string will describe the error
 */
function checkLogin(first, last, phone, email, pass) {
	
	var flag = true;
	
	// Checks the first name
	if(!checkAlpha(first)) {
		alert("First name does not contain only alphabet characters."); 
		flag = false; 
	}
	
	if(!checkAlpha(last)) {

		alert("Last name does not contain only alphabet characters.");
		flag = false; 
	}

	if(!checkNumbers(phone)) { 

		alert("Please provide your phone number in the format specified.");
		flag = false;
	}
	
	if(!checkEmail(email)) {
		alert("Domain name is not recognized.");
		flag = false;
	}
	
	// Checks for the empty string
	if(!pass) {
		alert("Please provide a password.");
		flag = false;
	}
	
	if(!flag) alert("TODO: I'll try to style these into the page later instead of having annoying pop-ups");
	
	return flag;
}




