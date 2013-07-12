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
	var loginUrl = "php/registration.php";
	var params = "pFname=" + first + "&pLname=" + last+ "&pPhone=" + phone+ "&pEmail=" + email +"&pPass=" + pass;

	$.ajax({
		type: "POST",
		url: "php/registration.php",
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
					alert("The return value is " + ret + ". Make sure this is an integer.");
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


//				// Create XML/HTTP Request object.
//				// Different browsers use different objects!
//				if (window.XMLHttpRequest)
//					{// code for IE7+, Firefox, Chrome, Opera, Safari
//					httpRequest= new XMLHttpRequest();
//					}
//				else
//					{// code for IE6, IE5
//					httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
//					}
//					
//				// Handle PHP returns
//				httpRequest.onreadystatechange = function() {
//					if (httpRequest.readyState == 4 && httpRequest.status == 200) {
//						alert(ret);	
//						var ret = parseInt(httpRequest.responseText);
//						/* if 0, then we have a successful creation
//						 * if 1, then the email was already taken
//						 */
//						if(ret == -1) {
//							alert("Sorry this email address has already been used.");
//							return;
//						}
//						else if(ret >= 0) {
//
//							// USE HTML5 WEB STORAGE : SUPPORTED BY IE 8+ 
//							/* Incorrect code */
//							if(typeof(Storage) !== "undefined"){
//								sessionStorage.pid = ret;	
//								alert("The return value is " + ret + ". Make sure this is an integer.");
//								document.location.href="child.html";
//							}
//							
//							else {
//								// Add old client support (cookies) later, browser share for IE 7- 
//								document.getElementById("result").innerHTML = "Sorry, your browser does not support web storage...";
//							}
//
//						}
//						else {
//							alert("Strange error occured. Check code");
//						
//						}
//
//					}
//				}
//				
//				// Send the request to server!
//				httpRequest.open("POST", loginUrl, true);
//				httpRequest.setRequestHeader("Content-type","application/x-www-form-urlencoded");
//				httpRequest.send(params);
//			


