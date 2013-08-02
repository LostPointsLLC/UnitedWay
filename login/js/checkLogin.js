// Returns false if there is a non-alpha char
function checkAlpha(string) {
	var alphabet = /^[a-zA-Z]/;
	if(string.match(alphabet))
		return true;
	else return false;
}

// Returns false if there is a non-number char
/*function checkNumbers(string) {
	var numbers = /^[0-9]/;
	if(string.match(numbers))
		return true;
	else return false;

}
*/

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
		if(sessionStorage.lang=="ENG"){
		document.getElementById("result").innerHTML = "<p class='fail'>Registration failed. Your first name isn't all letters.</p>";
		}
		else{
		document.getElementById("result").innerHTML = "<p class='fail'>Error en el registro. Su nombre no es todas las letras.</p>";
		}
		flag = false; 
	}
	if(!checkAlpha(last)) {
		if(sessionStorage.lang=="ENG"){
		document.getElementById("result").innerHTML = "<p class='fail'>Registration failed. Your last name isn't all letters.</p>";
		}
		else{
		document.getElementById("result").innerHTML = "<p class='fail'>Error en el registro. Su apellido no es de todas las letras.</p>";
		}
		flag = false; 
	}
	if(!checkNumbers(phone)) {
		if(sessionStorage.lang=="ENG"){
		document.getElementById("result").innerHTML = "<p class='fail'>Registration failed. Your phone number isn't all numbers.</p>";
		}
		else{
		document.getElementById("result").innerHTML = "<p class='fail'>Error en el registro. Su n&uacute;mero de telé&eacute;fono no es todos los n&uacute;meros.</p>";
		}	
		flag = false; 
	}
	if(!checkEmail(email)) {
		if(sessionStorage.lang=="ENG"){
		document.getElementById("result").innerHTML = "<p class='fail'>Registration failed. Your email address is invalid.</p>";
		}
		else{
		document.getElementById("result").innerHTML = "<p class='fail'>Error en el registro. Su direcci&oacute;n de correo electr&oacute;nico no es v&aacute;lida.</p>";
		}
		flag = false; 
	}
	if(!pass) {
		if(sessionStorage.lang=="ENG"){
		document.getElementById("result").innerHTML = "<p class='fail'>Registration failed. Please type in a password.</p>";
		}
		else{
		document.getElementById("result").innerHTML = "<p class='fail'>Error en el registro. Por favor, introduzca una contrase&ntilde;a.</p>";
		}
		flag = false; 
	}

	return flag;
}
