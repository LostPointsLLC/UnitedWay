<?php
	/*
		Basic mySQL connection to Lost Point Data base
		
	*/
	$server 	= "UnitedWayMobile.db.8668974.hostedresource.com";
	$username 	= "UnitedWayMobile";
	$user_password 	= "Un!t3dW@y";
	$database		= "UnitedWayMobile";
	
	// Create connection to my Cpanel database
	$dbConnection = mysqli_connect($server, $username, $user_password, $database);
	if(mysqli_connect_errno($dbConnection)) {
		echo "Database connection error, please check internet connection";
		echo "Error: could not establish database connection" . mysqli_connect_error();
	}
	mysqli_set_charset($dbConnection, "utf8");
?>
	
