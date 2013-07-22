function verfiyRegistration() {
	var first = document.getElementById("firstname").value;
	var last = document.getElementById("lastname").value;
	var phone = document.getElementById("phone").value;
	var email = document.getElementById("email").value;
	var pass = document.getElementById("password").value;
	
	// Check checkLogin.js for documentation
	// DOES NOT VERIFY THE PASSWORD
	if(!checkLogin(first, last, phone, email, pass)) return;
	
	
	// Variables used for XML/HTTP Request.
	var httpRequest;
	var loginUrl = "http://web.engr.illinois.edu/~heng3/php/login/registration.php";
	var params = "pFname=" + first + "&pLname=" + last+ "&pPhone=" + phone+ "&pEmail=" + email +"&pPass=" + pass;

	$.ajax({
		type: "POST",
		url: "http://web.engr.illinois.edu/~heng3/php/login/registration.php",
		data: params,
		cache: false,
		async: false,
		success: function(data) {
			var ret = parseInt(data);
			
			// Returns -1 if the data was already taken
			if(ret == -1) {
				alert("Sorry this email address has already been used.");
				return;
			}

			// Returns an int >= 0 that represents the user ID
			else if(ret >= 0) {
																														 
				// USE HTML5 WEB STORAGE : SUPPORTED BY IE 8+ 
				/* Incorrect code */
				if(typeof(Storage) !== "undefined"){
					sessionStorage.pid = ret;	
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
}
