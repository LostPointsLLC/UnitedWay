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
					localStorage.pid = str[1]; // pid
					// Child JSON Object
					localStorage.childJsonObject = str[2];
					// Tip JSON Object
					localStorage.childJsonObject = str[3];
					// Rss JSON Object
					localStorage.childJsonObject = str[4];
					
					localStorage.remember=1;
					setDefaultStorage();								
					document.location.href = "../home/";
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

function setDefaultStorage() {
	localStorage.rss = 'cpl';				// For the news feed page.
	localStorage.dirty = '0';				// A dirty bit indicating whether the localStorage.jsonString variable is dirty
	localStorage.edit_childID = '-1';		// Indicates that we're not editing a child
	localStorage.fromSettings = '0';	
}
