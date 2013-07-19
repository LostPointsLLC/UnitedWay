<?php
	/*
		Handle request for all checked tasks of a child
	*/
	require("../../php/connect.php");

	$childID = $_POST['childID']; 
	$catID = $_POST['taskID']; // category code for tasks
	
	$catString = "";
	switch ($catID) {
		case 1:
			$catString = "health_code";
			break;
		case 2:
			$catString = "language_code";
			break;
		case 3:
			$catString = "social_code";
			break;
		case 4:
			$catString = "other_code";
	}
	
	// Query binary string for task
	$taskQuery = "SELECT $catString FROM children WHERE child_id = $childID";
	$tqResult = mysqli_query($dbConnection, $taskQuery);
	$row = mysqli_fetch_array($tqResult);
	echo (string)$row[0]; // Send result back to requesting client's javascript code	
?>
