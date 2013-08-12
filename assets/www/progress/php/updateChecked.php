<?php
	/*
		Handle request for all checked tasks of a child
	*/
	require("../../php/connect.php");
	$childID = $_POST['childID']; 
	$catID = $_POST['taskID']; // category code for tasks
	$newString = (string)$_POST['newString'];
	
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
	$taskQuery = "UPDATE children SET $catString = '$newString' WHERE child_id = $childID";
	echo $taskQuery;
	$tqResult = mysqli_query($dbConnection, $taskQuery);
	
	if ($tqResult) {
		echo 1;
	}
	else {
		echo 0;
	}
?>
