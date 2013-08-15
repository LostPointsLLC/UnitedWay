function verifyRegistration() {
	var first = document.getElementById("firstname").value;
	var last = document.getElementById("lastname").value;
	var email = document.getElementById("email").value;
	var pass = document.getElementById("password").value;
	var confirm = document.getElementById("confirm").value;
	
	// Check checkLogin.js for documentation
	// DOES NOT VERIFY THE PASSWORD

	if(!checkLogin(first, last, email, pass, confirm)) return;

	// Variables used for XML/HTTP Request.
	var httpRequest;
	var phpUrl = "../php/registration.php";
	var params = "pFname=" + first + "&pLname=" + last+ "&pEmail=" + email +"&pPass=" + pass;

	/*
	 * Make Ajax Call here
	 */ 
	
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
			var ret = parseInt(response);
			if(ret == -1) {
				if(localStorage.lang=="ENG")
					document.getElementById("result").innerHTML = "<p class='fail'>Sorry, this email has already been used.</p>";
				else
					document.getElementById("result").innerHTML = "<p class='fail'>Lo sentimos, la direcci&on de correo electr&onico ya ha sido utilizado.</p>";
				return;
			}
			// Returns an int >= 0 that represents the user ID
			else if(ret >= 0) {
				// USE HTML5 WEB STORAGE : SUPPORTED BY IE 8+ 
				if(typeof(Storage) !== "undefined"){
					localStorage.pid = ret;
					var tipObjStr = '{"growth":[[],[],[],[],[],[],[],[],[],[]],"safety":[[],[],[],[],[],[],[],[],[],[]],"playtime":[[],[],[],[],[],[],[],[],[],[]],"health":[[],[],[],[],[],[],[],[],[],[]]}';
					initUserData(ret, '{}', tipObjStr, '{}');
					localStorage.remember=1;
					document.location.href="child.html";
				}
				else {
					// Add old client support (cookies) later, browser share for IE 7- 
					if(localStorage.lang=="ENG")
						document.getElementById("result").innerHTML = "Sorry, your browser does not support web storage...";
					else
						document.getElementById("result").innerHTML = "Lo sentimos, su navegador no soporta almacenamiento web...";
				}
				
			}
			// Otherwise we have an error
			else {
				alert("Strange error occurred. Please contact UnitedWay! ");
			}
		}
	}	
	// Send the request to server!
	document.getElementById("result").innerHTML = '<img src="../images/loader.gif" id = "loader" height="40" width="40"/>';
	httpRequest.open("POST", phpUrl, true);
	httpRequest.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	httpRequest.send(params);
}
