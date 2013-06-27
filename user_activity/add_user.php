<?php

	//session_start();
	/* Logs into the database using the database information */
	$hostname 	= "UnitedWayMobile.db.8668974.hostedresource.com";
	$username 	= "UnitedWayMobile";
	$password 	= "Un!t3dW@y";
	$dbname		= "UnitedWayMobile";

	$con = mysqli_connect($hostname, $username, $password) 
	OR DIE ("Unable to connect to database! Please try again later." . mysqli_connect_error());
	mysqli_select_db($con, $dbname);

	
	$id = $_POST['user_id'];
	$pass = $_POST['user_password'];
	$phone = $_POST['user_phone'];
	$name = $_POST['user_name'];
	$email = $_POST['user_email'];
	$language = $_POST['user_language'];
	
	$return_url = "http://localhost/framework/";
	
	/* TODO: DEBUG THIS */
	$insertion = mysqli_query($con, 
		"INSERT INTO users(user_id, user_password, user_phone, user_name, user_email, user_language) 
		VALUES ($id, $pass, $phone, $name, $email, $language)");
	
	if($insertion) {
		echo "<h1>Success! Will redirect in 2 seconds</h1>";
		header("refresh: 2; url = $return_url");
		exit();
	}
	else {
		echo "<h1>Sorry, the row was not inserted properly. " . mysqli_error($con) . "</h1>";
		echo "<form action ='$return_url' method = 'post'>";
		echo "<button type='submit'>Click to return</button>";
		echo "</form>";
	}


?>