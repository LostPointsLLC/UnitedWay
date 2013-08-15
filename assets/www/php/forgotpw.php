<?php
	require("class.phpmailer.php");
	require("connect.php");
	require("phpass-0.3/PasswordHash.php");

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

        $mail = new PHPMailer();  
 
		$mail->IsSMTP();  // telling the class to use SMTP
		$mail->Mailer = "smtp";
		/*NEED TO GET FROM SHIREN*/
		//sender's details. e.g. Admin
		$mail->Host = "ssl://smtp.gmail.com";
		$mail->Port = 465;
		$mail->SMTPAuth = true; // turn on SMTP authentication
		/*NEED TO GET FROM SHIREN*/
		$mail->Username = "testing.prek@gmail.com"; // SMTP username
		$mail->Password = "UW5Tud3nt!"; // SMTP password 
 
 		//Contents in the email
		$mail->From     = "testing.prek@gmail.com"; //sender's email address
		$mail->FromName = "Pre-K Admin";
		$mail->AddAddress("$email");  
 
		$mail->Subject  = "UW Pre-K Forgot Password";
		$mail->Body     = "You have requested to reset your password. 

Password: ".$temp_pw." 

Please login with this password and change your password in the settings page.";
		// step 3. print out a statement saying a password has been sent using an echo value
		if(!$mail->Send()) {
			echo 'Message was not sent.';
			echo 'Mailer error: ' . $mail->ErrorInfo;
		}
		else {
			echo -1;
			mysqli_close($dbConnection);
		}
	}

	function get_post_var($var) {
		$val = $_POST[$var];
		if (get_magic_quotes_gpc())
			$val = stripslashes($val);
		return $val;
	}
?>