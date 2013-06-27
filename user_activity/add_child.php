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

	
	$id = $_POST['child_id'];
	$parentID = $_POST['child_parentID'];
	$age = $_POST['child_age'];
	$color = $_POST['child_color'];
	$name = $_POST['child_name'];
	$gender = $_POST['child_gender'];
	
	$return_url = "http://localhost/framework/";
	
	/* TODO: DEBUG THIS */
	$insertion = mysqli_query($con, 
		"INSERT INTO children(child_id, child_parentID, child_age, child_color, child_name, child_gender) 
		VALUES ($id, $parentID, $age, $color, $name, $gender)");
	
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