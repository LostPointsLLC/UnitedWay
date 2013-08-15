function checkEmail(email) {
	// http://stackoverflow.com/a/46181/11236
  
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function forgotpw(){
	
	//takes email address
	var email = document.getElementById("email").value;
	//checks if the email field is empty
	if(localStorage.lang=="ENG"){
		if(email==""){
			document.getElementById("result").innerHTML = "<p id='fail'>Please enter the email address you would like the temporary password to be sent to.</p>";
			return;
		}
		//checks if the input email is valid
		else if(!checkEmail(email)){
			document.getElementById("result").innerHTML = "<p id='fail'>Please enter a valid email address for the temporary password to be sent to.</p>";
			return;
		}
	}
	else{
		if(email==""){
			document.getElementById("result").innerHTML = "<p id='fail'>Por favor, introduzca la direcci&oacute;n de correo electr&oacute;nico que desea que la contrase&ntilde;a temporal que se enviar&aacute; a.</p>";
			return;
		}
		//checks if the input email is valid
		else if(!checkEmail(email)){
			document.getElementById("result").innerHTML = "<p id='fail'>Introduzca una direcci&oacute;n de correo electr&oacute;nico v&aacute;lida para la contrase&ntilde;a temporal que se enviar&aacute; a.</p>";
			return;
		}
	}
	
	//generates a random 8 char long pw
	//source: http://www.latestcode.net/2012/12/javascript-random-password-generator.html
	var temp_pw='';
	var password_characters='0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
	for(var i=0;i<8;i++){ 
		temp_pw+=password_characters.charAt(Math.floor(Math.random()*password_characters.length))
	}
	
	// Variables used for XML/HTTP Request.
	var httpRequest;
	var params = "pEmail=" + email + "&pPassword=" + temp_pw;
	var phpUrl = "php/forgotpw.php";

	// Create XML/HTTP Request object.
	// Different browsers use different objects!
	if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
		httpRequest= new XMLHttpRequest();
	}
	else {// code for IE6, IE5
		httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
	}
	
	// Handle PHP returns
	httpRequest.onreadystatechange=function() {
		if (httpRequest.readyState == 4 && httpRequest.status == 200) {
			var res = httpRequest.responseText.trim();
			//temp pw successfully sent to user email
			console.log(res);
			if(localStorage.lang=="ENG"){
				if(res == -1){
					document.getElementById("result").innerHTML = "A temporary password has been sent to your email.";
				}
				//email was not found on database
				else{
					document.getElementById("result").innerHTML = "Email was not found on database.";
					return;
				}
			}
			else{
				if(res == -1){
					document.getElementById("result").innerHTML = "Una contrase&ntilde;a temporal ha sido enviada a su correo electr&oacute;nico.";
				}
				//email was not found on database
				else{
					document.getElementById("result").innerHTML = "El correo electr&oacute;nico no se encuentra en la base de datos.";
					return;
				}
			}
		}
	}	
	// Send the request to server!
	document.getElementById("result").innerHTML = '<img src="images/loader.gif" id = "loader" height="40" width="40"/>';
	httpRequest.open("POST", phpUrl, true);
	httpRequest.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	httpRequest.send(params);
	
	//saves it to send to user
	//hash password
	//change pw in database

	//sends pw to user's email.
}
