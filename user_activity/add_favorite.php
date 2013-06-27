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

	
	$id = $_POST['fav_id'];
	$userID = $_POST['fav_userID'];
	$type = $_POST['fav_type'];
	$typeID = $_POST['fav_typeID'];
	
	$return_url = "http://localhost/framework/";
	
	/* TODO: DEBUG THIS */
	$insertion = mysqli_query($con, 
		"INSERT INTO favorites(fav_id, fav_userID, fav_type, fav_typeID) 
		VALUES ($id, $userID, $type, $typeID)");
	
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