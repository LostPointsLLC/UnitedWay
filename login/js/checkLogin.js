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
		document.getElementById("result").innerHTML = "<p class='fail'>Registration failed. Your first name isn't all letters.</p>";
		flag = false; 
	}
	if(!checkAlpha(last)) {
		document.getElementById("result").innerHTML = "<p class='fail'>Registration failed. Your last name isn't all letters.</p>";
		flag = false; 
	}
	if(!checkNumbers(phone)) {
		document.getElementById("result").innerHTML = "<p class='fail'>Registration failed. Your phone number isn't all numbers.</p>";
		flag = false; 
	}
	if(!checkEmail(email)) {
		document.getElementById("result").innerHTML = "<p class='fail'>Registration failed. Your email address is invalid.</p>";
		flag = false; 
	}
	if(!pass) {
		document.getElementById("result").innerHTML = "<p class='fail'>Registration failed. Please type in a password.</p>";
		flag = false; 
	}

	return flag;
}
