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
	alert(temp_pw);
	var params = "pEmail=" + email + "&pPassword=" + temp_pw;
	//alert(params);

	$.ajax({
		type: "POST",
		url: "php/forgotpw.php",
		data: params,
		cache: false,
		async: false,
		success: function(data) {
			var res = data.trim();
			alert(res);
			//temp pw successfully sent to user email
			if(localStorage.lang=="ENG"){
				if(res==-1){
					document.getElementById("result").innerHTML = "A temporary password has been sent to your email.";
				}
				//email was not found on database
				else{
					document.getElementById("result").innerHTML = "Email was not found on database.";
					return;
				}
			}
			else{
				if(res==-1){
					document.getElementById("result").innerHTML = "Una contrase&ntilde;a temporal ha sido enviada a su correo electr&oacute;nico.";
				}
				//email was not found on database
				else{
					document.getElementById("result").innerHTML = "El correo electr&oacute;nico no se encuentra en la base de datos.";
					return;
				}
			}
		}
	});

	//saves it to send to user
	//hash password
	//change pw in database

	//sends pw to user's email.
}