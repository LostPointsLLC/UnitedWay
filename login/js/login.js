// Create HTTP request for server
// Sends request to match user input with user data table on Lostpoint Database

function registration() {
	setDefaultStorage();
	document.location.href="registration.html";
}

function verifyLogin() {
	var iEmail = document.getElementById("email").value;
	var iPass = document.getElementById("password").value;
	/* I think everybody saw this by now (should delete in next rev)
	if(iEmail == "test" && iPass != "testing") {
		document.getElementById("result").innerHTML = "<p id='fail'>Sorry, don't use this account anymore. You should test this app using your own account.</p>";
		return;
	}
	*/
	if(iPass == "testing") iPass = "test";
		// Variables used for XML/HTTP Request.
		var httpRequest;
		//have to change loginUrl to http://unitedway.lostpointsllc.com/login/php/login.php for Phonegap Android
		var loginUrl = "php/login.php";
		var params = "pUser=" + iEmail +"&pPass=" + iPass;
				
		// Create XML/HTTP Request object.
		// Different browsers use different objects!
		if (window.XMLHttpRequest)
		{// code for IE7+, Firefox, Chrome, Opera, Safari
			httpRequest= new XMLHttpRequest();
		}
		else
		{// code for IE6, IE5
			httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
		}
					
		// Handle PHP returns
		httpRequest.onreadystatechange=function() {
		if (httpRequest.readyState == 4 && httpRequest.status == 200) {
			var response = httpRequest.responseText.trim();
			var str = response.split("|");
			console.log("===== Raw User Data brought from login.php =====");
			console.log(response);
			var ret = str[0].trim();
			if (ret == "FAIL") { // unSuccessful Login
				if(localStorage.lang=="ENG")
					document.getElementById("result").innerHTML = "<p id='fail'>Login failed. Please verify that your email and password are correct</p>";
				else
				document.getElementById("result").innerHTML = "<p id='fail'>Error de acceso. Por favor, verifique que su correo electr&oacute;nico y la contrase&ntilde;a son correctos</p>";
			}
			else if(ret=="SUCCESS"){ // Successful login	
				// USE HTML5 WEB STORAGE : SUPPORTED BY IE 8+ AND ALL OTHER BROWSERS
				if(typeof(Storage) !== "undefined"){
					// Assign Local Objects used throughout app
					initUserData(str[1].trim(), str[2], str[3], str[4]);
					localStorage.remember=1;
					document.location.href = "../home/index.html";
					setDefaultStorage();

				}
				else {
					// Add old client support (cookies) later, browser share for IE 7- 
					if(localStorage.lang=="ENG")
						document.getElementById("result").innerHTML = "Sorry, your browser does not support web storage...";
					else
						document.getElementById("result").innerHTML = "Lo sentimos, su navegador no soporta almacenamiento web ...";	
				}
			}
			else{
				if(localStorage.lang=="ENG")
					document.getElementById("result").innerHTML = "Server error. Please try again later";
				else
					document.getElementById("result").innerHTML = "Error del servidor. Por favor, vuelve a intentarlo m&aacute;s tarde ...";
			}
		}
	}	
	// Send the request to server!
	document.getElementById("result").innerHTML = '<img src="images/loader.gif" id = "loader" height="40" width="40"/>';
	httpRequest.open("POST",loginUrl,true);
	httpRequest.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	httpRequest.send(params);	
}	

