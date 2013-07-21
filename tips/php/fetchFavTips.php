<?php
	/*
		Handle request for all checked tasks of a child
	*/
	require("../../php/connect.php");
	$pid = $_POST['pid'];
	$taskCat = $_POST['taskCat']; // category code for tips (string)
	$ageIndex = $_POST['ageIndex']; // age (string)
	
	// Query for all tips in category + age
	$taskQuery = "SELECT fav_typeID FROM favorites WHERE tip_age = $ageIndex AND tip_category = '$taskCat' AND fav_kept = 1";
	$tqResult = mysqli_query($dbConnection, $taskQuery);
	$outputArray = array ();
	while ($tqRow = mysqli_fetch_array($tqResult)) {
		array_push($outputArray, $tqRow[0]); 
	}
	echo json_encode($outputArray);
?>
