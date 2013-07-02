<?php
	require("connect.php");
	$childID = $_POST['childID']; 
	
	// Query to figure out who the children are
	// Extract child_id's of parent's children into an array
	//$childQuery = "SELECT checked_category, COUNT(checked_category) FROM checked WHERE checked_childID = $childID GROUP BY (checked_category)";
	$childQuery = "SELECT health_code, language_code, social_code, other_code FROM children WHERE child_id = $childID"; // returns one tuple
	$cqResult = mysqli_query($dbConnection, $childQuery);
	$countArray = array();
	/*
	while ($cqRow = mysqli_fetch_array($cqResult)) {
		$countArray[$cqRow[0]] = $cqRow[1];
	}
	*/
	$countArray = mysqli_fetch_assoc($cqResult); // store as collection
	// json encode
	echo json_encode($countArray);
	
?>
