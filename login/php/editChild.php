<?php

	require('../../php/connect.php');	
	$name 		= mysqli_real_escape_string($dbConnection, $_POST['name']);
	$birthday 	= $_POST['birthday'];
	$gender		= $_POST['gender'];
	$color		= $_POST['color'];
	$id			= $_POST['id'];

	$setString = createSetString($name, $birthday, $gender, $color);
	
	$querystring = "UPDATE children SET $setString WHERE child_ID=$id";
	mysqli_query($dbConnection, $querystring) or die ("error: Querystring is $querystring:" . mysqli_error($dbConnection));
	mysqli_close($dbConnection);

	function createSetString($name, $birthday, $gender, $color) {
		$setString = "";
		if($name) {
			$setString = "child_name='$name' ";
		}
		
		if($birthday) {
			if($setString)
				$setString .= ", child_birthday='$birthday' ";
			else $setString = "child_birthday='$birthday' ";
		}
		
		if($gender) {
			if($setString)
				$setString .= ", child_gender='$gender' ";
			else $setString = "child_gender='$gender' ";
		}
		
		if($color) {
			if($setString)
				$setString .= ", child_color='$color' ";
			else $setString = "child_color='$color' ";
		}
		
		return $setString;
	}


?>
