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

	
	$id = $_POST['rss_id'];
	$url = $_POST['rss_url'];
	$title = $_POST['rss_title'];
	$source = $_POST['rss_source'];
	
	$return_url = "http://localhost/framework/";
	
	/* TODO: DEBUG THIS */
	$insertion = mysqli_query($con, 
		"INSERT INTO rss(rss_id, rss_url, rss_title, rss_source) 
		VALUES ($id, $url, $title, $source)");
	
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