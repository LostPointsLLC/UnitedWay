<?php

	require("connect.php");
	
	$first 	= strip_tags($_POST['pFname']);
	$last	= strip_tags($_POST['pLname']);
	$phone	= strip_tags($_POST['pPhone']);
	$email	= strip_tags($_POST['pEmail']);
	$pass	= strip_tags($_POST['pPass']);
	
	// Need to first check whether this user already has an entry
	// in the database
	$querystring = "SELECT user_email FROM users WHERE user_email = 'mysqli_real_escape_string($email)'";
	$result = mysqli_query($dbConnection, $querystring);
	if(!$result) die("Error occured while checking against database") . mysqli_error($dbConnection);

	if(mysqli_fetch_array($result)){
		
		echo 1; // Indicates username was already taken in the database
		mysqli_close($dbConnection);
		return;
	}

	// Now we can safely insert these values into the database
	$query = $dbConnection->prepare("INSERT INTO users(user_first, user_last, user_email, user_phone, user_password) VALUES (?, ?, ?, ?, ?)");
	$query->bind_param('sssss', $first, $last, $phone, $email, $pass);
	if(!$query->execute()) die("Error encountered barggg") . mysqli_error($dbConnection);
	$query->store_result();
	echo 0;
	mysqli_close($dbConnection);

?>