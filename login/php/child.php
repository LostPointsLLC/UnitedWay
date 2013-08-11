<?php

	require('../../php/connect.php');	
	$name 		= mysqli_real_escape_string($dbConnection, $_POST['name']);
	$birthday 	= $_POST['birthday'];
	$gender		= $_POST['gender'];
	$color		= $_POST['color'];
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
	($parentID, '$name', $health_code, $language_code, $social_code, $other_code, '$gender', '$birthday', '$color')";
	

	mysqli_query($dbConnection, $querystring) or die ("error: Querystring is $querystring:" . mysqli_error($dbConnection));
	echo $querystring;
	mysqli_close($dbConnection);


?>
