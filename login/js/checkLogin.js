// Returns false if there is a non-alpha char
function checkAlpha(string) {
	var alphabet = /^[a-zA-Z]/;
	return string.match(alphabet)
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
	// http://stackoverflow.com/a/46181/11236
  
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

//checks if a password length is at least 5 characters long or 20 characters long
//return 0 = acceptable length
//return 1 = length less than 5
//return 2 = length greater than 20
function checkPass(pass){
	if(pass.length<5){
		return 1;
	}
	else if(pass.length>20){
		return 2;
	}
	else
		return 0;
}

//function to check if your password matches with confirm password.
function matchPass(pass,confirm){
	return (pass==confirm)

}

//function to check if all the fields are filled
function checkInputs(first,last,email,pass,confirm){
	if((first==null||first=="")&&(last==null||last=="")&&(email==null||email=="")&&(pass==null||pass=="")&&(confirm==null||confirm=="")){
		return false;
	}
	else if((first==null||first=="")||(last==null||last=="")||(email==null||email=="")||(pass==null||pass=="")||(confirm==null||confirm=="")){
		return false;
	}
	else
		return true;
}
/* Verifies that the first, last, phone, email, and pass are
 * in a permissible form.
 * Returns an associative array of  five strings. If any given 
 * string is non-empty, then the string will describe the error
 */
function checkLogin(first, last, email, pass, confirm) {

	var flag = true;
	//Checks if all the inputs are empty
	if(!checkInputs(first,last,email,pass,confirm)){
		if(sessionStorage.lang=="ENG"){
		document.getElementById("result").innerHTML = "<p class='fail'>Registration failed. Please fill in all the fields.</p>";
		}
		else{
		document.getElementById("result").innerHTML = "<p class='fail'>Error en el registro. Por favor, rellene todos los campos.</p>";
		}
		flag = false;
	}
	// Checks the first name
	else if(!checkAlpha(first)) {
		if(sessionStorage.lang=="ENG"){
		document.getElementById("result").innerHTML = "<p class='fail'>Registration failed. Your first name isn't all letters.</p>";
		}
		else{
		document.getElementById("result").innerHTML = "<p class='fail'>Error en el registro. Su nombre no es todas las letras.</p>";
		}
		flag = false; 
	}
	else if(!checkAlpha(last)) {
		if(sessionStorage.lang=="ENG"){
		document.getElementById("result").innerHTML = "<p class='fail'>Registration failed. Your last name isn't all letters.</p>";
		}
		else{
		document.getElementById("result").innerHTML = "<p class='fail'>Error en el registro. Su apellido no es de todas las letras.</p>";
		}
		flag = false; 
	}
	else if(!checkEmail(email)) {
		if(sessionStorage.lang=="ENG"){
		document.getElementById("result").innerHTML = "<p class='fail'>Registration failed. Your email address is invalid.</p>";
		}
		else{
		document.getElementById("result").innerHTML = "<p class='fail'>Error en el registro. Su direcci&oacute;n de correo electr&oacute;nico no es v&aacute;lida.</p>";
		}
		flag = false; 
	}
	else if(checkPass(pass)==1 || checkPass(pass)==2) {
		if(checkPass(pass)==1){
			if(sessionStorage.lang=="ENG"){
			document.getElementById("result").innerHTML = "<p class='fail'>Registration failed. Please type in a password that is at least 5 characters long.</p>";
			}
			else{
			document.getElementById("result").innerHTML = "<p class='fail'>Error en el registro. Por favor escriba una contrase&ntilde;a de al menos 5 caracteres.</p>";
			}
		}
		else{
			if(sessionStorage.lang=="ENG"){
			document.getElementById("result").innerHTML = "<p class='fail'>Registration failed. Please type in a password that is at most 20 characters long.</p>";
			}
			else{
			document.getElementById("result").innerHTML = "<p class='fail'>Error en el registro. Por favor, escriba una contrase&ntilde;a que tenga al como m&aacute;ximo 20 caracteres de longitud.</p>";
			}
		}
		flag = false; 
	}
	else if(!matchPass(pass,confirm)){
		if(sessionStorage.lang=="ENG"){
		document.getElementById("result").innerHTML = "<p class='fail'>Registration failed. Passwords do not match.</p>";
		}
		else{
		document.getElementById("result").innerHTML = "<p class='fail'>Error en el registro. Las contrase&ntilde;a no coinciden.</p>";
		}
		flag = false;
	}
	return flag;
}