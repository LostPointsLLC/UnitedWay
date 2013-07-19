<?php

	require('connect.php');	
	$name 		= $_POST['name'];//(string)("'" + strip_tags($_POST['name']) + "'");
	$birthday 	= $_POST['birthday'];//(string)("'" + strip_tags($_POST['birthday']) + "'");
	$gender		= $_POST['gender'];//(string)("'" + strip_tags($_POST['gender'])+ "'");
	$color		= $_POST['color'];//(string)("'" + strip_tags($_POST['color'])+ "'");
	$parentID	= $_POST['child_parentID'];

	$health_code	= "'bbbbbb'";
	$language_code 	= "'bbbbbbbbbbbbbbb'";
	$social_code 	= "'bbbbbbbbb'";
	$other_code 	= "'bbbbbbbbbbbbbbbbbbbbbbbbb'";


	/* TODO LATER: Make sure duplicate children aren't added
	 * to the database. Use the same mechanism as adding a
	 * new user to the database.
	 */
	$querystring = "INSERT INTO children 
	(child_parentID, child_name, health_code, language_code, social_code, other_code, child_gender, child_birthday, child_color) VALUES 
	($parentID,  '$name', $health_code, $language_code, $social_code, $other_code, $gender, '$birthday', '$color')";
	

	mysqli_query($dbConnection, $querystring) or die ("error: $querystring" . mysqli_error($dbConnection));
	echo $querystring;
	mysqli_close($dbConnection);


?>
