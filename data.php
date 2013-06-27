<?php
	
	/* Logs into the database using the database information */
	$hostname 	= "UnitedWayMobile.db.8668974.hostedresource.com";
	$username 	= "UnitedWayMobile";
	$password 	= "Un!t3dW@y";
	$dbname		= "UnitedWayMobile";

	$con = mysqli_connect($hostname, $username, $password) 
	OR DIE ("Unable to connect to database! Please try again later." . mysqli_connect_error());
	mysqli_select_db($con, $dbname);
	
	/* Filling up the table with some preliminary information! */
	/* Note that $con is defined in connect.php */
	mysqli_query($con, 
		"INSERT INTO users(user_password, user_phone, user_name, user_email, user_language) 
		VALUES ('mypassword', '847-769-8729', 'HENRY', 'hlin117@gmail.com', 'ENG')")
	OR DIE ("Sorry, data 1 was not inserted properly." . mysqli_error($con));
	
	mysqli_query($con, 
		"INSERT INTO users(user_password, user_phone, user_name, user_email, user_language) 
		VALUES ('mypassword', '847-769-8729', 'doug', 'booobbboo@gggg', 'ESP')")
	OR DIE ("Sorry, data 2 was not inserted properly" . mysqli_error($con));
	
	echo "<h1>Hello world!</h1>";
	
	mysqli_close($con);
?>