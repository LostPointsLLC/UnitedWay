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

	
	$id = $_POST['check_id'];
	$age = $_POST['check_age'];
	$tip = $_POST['check_tip'];
	$category = $_POST['check_category'];
	$completed = $_POST['check_completed'];
	
	$return_url = "http://localhost/framework/";
	
	$insertion = mysqli_query($con, 
		"INSERT INTO checklist(check_id, check_age, check_tip, check_category, check_completed) 
		VALUES ($id, $age, $tip, $category, $completed)");
	
	if($insertion) {
		echo "<h1>Success! Will redirect in 2 seconds</h1>";
		header("refresh: 2; url = $return_url");
		exit();
	}
	else {
		echo "<h1>Sorry, the row was not inserted properly " . mysqli_error($con) . "</h1>";
		echo "<form action ='$return_url' method = 'post'>";
		echo "<button type='submit'>Click to return</button>";
		echo "</form>";
	}


?>