function changePw(){

	var id = localStorage.pid;
	var curr_pw = document.getElementById("curr_pw").value;
	var new_pw = document.getElementById("new_pw").value;
	var confirm_pw = document.getElementById("confirm_pw").value;
	if(new_pw!=confirm_pw){
		alert("Your passwords do not match");
		return;
	}
	if(new_pw.length<5){
		alert("Please enter a password that is at least 5 characters long.");
		return;
	}
	if(curr_pw==new_pw){
		alert("Please enter a new password that is different from your current password.");
		return;
	}
	
	var httpRequest;
	var phpUrl = "http://unitedway.lostpointsllc.com/php/changepw.php";
	var params = "pid=" + id +"&curr_pw=" + curr_pw +"&new_pw=" +new_pw;
	
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
			var result = httpRequest.responseText.trim();
			//Success
			if(result == "Password Changed") {
				alert("Password Changed");
			}

			//password authentication failed
			else if(result =="AUTH FAILED") {
				alert("Authentication Failed");
				return;
			}
			// Otherwise we have an error
			else {
				alert("Server Error");
			}
			document.location.href = "../settings/index.html";
		}
	}	
	// Send the request to server!
	httpRequest.open("POST", phpUrl, true);
	httpRequest.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	httpRequest.send(params);
}