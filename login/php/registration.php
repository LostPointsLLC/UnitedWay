<?php

	require("connect.php");
	$first 	= strip_tags($_POST['pFname']);
	$last	= strip_tags($_POST['pLname']);
	$phone	= strip_tags($_POST['pPhone']);
	$pass	= strip_tags($_POST['pPass']);
	$email	= mysqli_real_escape_string($dbConnection, $_POST['pEmail']);
	
	
	// Need to first check whether this user already has an entry
	// in the database
	$querystring = "SELECT user_email FROM users WHERE user_email = '$email'";
	
	$result = mysqli_query($dbConnection, $querystring);
	if(!$result) die("-2" . " Query was " . $querystring . "Error is: " . mysqli_error($dbConnection)); 

	if(mysqli_fetch_array($result)) {
		
		echo -1; // Indicates username was already taken in the database
		mysqli_close($dbConnection);
		return;
	}


	// Now we can safely insert these values into the database
	// Note that this is object oriented style of programming, but the above is using procedural style
	$query = $dbConnection->prepare("INSERT INTO users(user_first, user_last, user_email, user_phone, user_password) VALUES (?, ?, ?, ?, ?)");
	$query->bind_param('sssss', $first, $last, $email, $phone, $pass);
	if(!$query->execute()) die("Error: " . mysqli_error($dbConnection) . ". Query was " . $querystring);
	$query->store_result();

	
	// Make this function echo a user_id
	echo $query->insert_id;		

	mysqli_close($dbConnection);

?>
