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
	var loginUrl = "http://unitedway.lostpointsllc.com/login/php/registration.php";
	var params = "pFname=" + first + "&pLname=" + last+ "&pEmail=" + email +"&pPass=" + pass;

	$.ajax({
		type: "POST",
		//change url to http://unitedway.lostpointsllc.com/login/php/registration.php for phonegap
		url: loginUrl,
		data: params,
		cache: false,
		async: false,
		success: function(data) {
			var ret = parseInt(data);
			
			// Returns -1 if the data was already taken
			if(ret == -1) {
				document.getElementById("result").innerHTML = "<p class='fail'>Sorry, this email has already been used.</p>";
				return;
			}
			// Returns an int >= 0 that represents the user ID
			else if(ret >= 0) {
				// USE HTML5 WEB STORAGE : SUPPORTED BY IE 8+ 
				/* Incorrect code */
				if(typeof(Storage) !== "undefined"){
					localStorage.pid = ret;
					var tipObjStr = '{"growth":[[],[],[],[],[],[],[],[],[],[]],"safety":[[],[],[],[],[],[],[],[],[],[]],"playtime":[[],[],[],[],[],[],[],[],[],[]],"health":[[],[],[],[],[],[],[],[],[],[]]}';
					initUserData(ret, '{}', tipObjStr, '{}');
					document.location.href="child.html";
				}
				else {
					// Add old client support (cookies) later, browser share for IE 7- 
					document.getElementById("result").innerHTML = "Sorry, your browser does not support web storage...";
				}
													}
	// Otherwise we have an error
			else {
				alert("Strange error occured. Check code");
			
			}


		}

	});
	localStorage.remember=1;
}
