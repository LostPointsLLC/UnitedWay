<?php

	require("../../php/connect.php");
	require("../../php/phpass-0.3/PasswordHash.php");

	$email = mysqli_real_escape_string($dbConnection, $_POST['pEmail']);
	$temp_pw = strip_tags(get_post_var('pPassword'));

	// Base-2 logarithm of the iteration count used for password stretching
	$hash_cost_log2 = 8;
	// Do we require the hashes to be portable to older systems (less secure)?
	$hash_portable = FALSE;
	$hasher = new PasswordHash($hash_cost_log2, $hash_portable);
	$hash = $hasher->HashPassword($temp_pw);
	unset($hasher);

	//checks if the email exists in the database
	$querystring = "SELECT user_email FROM users WHERE user_email = '$email'";
	$result = mysqli_query($dbConnection, $querystring);
	if(!$result) die("-2" . " Query was " . $querystring . "Error is: " . mysqli_error($dbConnection)); 

	//user exists in database.
	if(mysqli_fetch_array($result)) {
		// step 1. hash the temp password and update it to the database
		//updates the database with the temp password
		($changeQuery = $dbConnection ->prepare("UPDATE users SET user_password = ? WHERE user_email = ?"))||fail('MySQL prepare', $db->error);
		$changeQuery->bind_param('ss',$hash, $email)|| fail('MySQL bind_param', $db->error);
		$changeQuery->execute()|| fail('MySQL execute', $db->error);
		
		// step 2. sends the unhashed password to the user's email
		//server email details
		/*$server_un = "joshua.hyk";
		$domain = "gmail.com";
		$server_email = $server_un.'@'.$domain;
		//recipients content and email
		$to = $email;
		$subject = "Forgot Password";
		$headers = "MIME-Version: 1.0rn"; 
    	$headers .= "Content-type: text/html; charset=iso-8859-1rn"; 
		$headers .= "From: Your Site <".$server_email.">\r\n";
        $message = "You have requested that you forgot your password.<br>
                    Password: <b>".$temp_pw."<b>";
        mail($to, $subject, $message, $headers);*/


        // step 3. print out a statement saying a password has been sent using an echo value
		echo -1;
		mysqli_close($dbConnection);
	}

	function get_post_var($var) {
		$val = $_POST[$var];
		if (get_magic_quotes_gpc())
			$val = stripslashes($val);
		return $val;
	}
?>