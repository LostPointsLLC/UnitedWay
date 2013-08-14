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

	var params = "pid=" + id +"&curr_pw=" + curr_pw +"&new_pw=" +new_pw;
	
	$.ajax({
		type: "POST",
		//change url to http://unitedway.lostpointsllc.com/settings/php/changepw.php for phonegap
		url: "http://unitedway.lostpointsllc.com/settings/php/changepw.php",
		data: params,
		cache: false,
		async: false,
		success: function(data) {
			//there might be whitspaces in the return value from php
			var result = data.trim();
			
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
			return;
		}
	});
}