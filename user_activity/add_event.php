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

	
	$id = $_POST['event_id'];
	$date = $_POST['event_date'];
	$time = $_POST['event_time'];
	$url = $_POST['event_url'];
	$place = $_POST['event_place'];
	$title = $_POST['event_title'];
	$sponsor = $_POST['event_sponsor'];
	
	$return_url = "http://localhost/framework/";
	
	/* TODO: DEBUG THIS */
	$insertion = mysqli_query($con, 
		"INSERT INTO events(event_id, event_date, event_time, event_url, event_place, event_title, event_sponsor) 
		VALUES ($id, $date, $time, $url, $place, $title, $sponsor)");
	
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