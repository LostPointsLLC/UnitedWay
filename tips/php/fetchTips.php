<?php
	/*
		Handle request for all checked tasks of a child
	*/
	require("connect.php");
	$pid = $_POST['pid'];
	$taskCat = $_POST['taskCat']; // category code for tips (string)
	$childAge = $_POST['childAge']; // age (string)
	
	// Query for all tips in category + age
	$taskQuery = "SELECT tip_id, tip_content FROM tips WHERE tip_age = $childAge AND tip_category = '$taskCat'";
	$tqResult = mysqli_query($dbConnection, $taskQuery);
	$outputArray = array ();
	$tipArray1 = array ();
	while ($tqRow = mysqli_fetch_assoc($tqResult)) {
		array_push($tipArray1, $tqRow); 
	}
	array_push($outputArray, $tipArray1);
	
	// Query favorite index as well
	$taskQuery = "SELECT fav_typeID FROM favorites WHERE fav_userID = $pid AND fav_type = 'tip'";
	$tqResult = mysqli_query($dbConnection, $taskQuery);
	$tipArray2 = array ();
	while ($tqRow = mysqli_fetch_array($tqResult)) {
		array_push($tipArray2, $tqRow[0]);
	}
	array_push($outputArray, $tipArray2);
	
	echo json_encode($outputArray);
?>
