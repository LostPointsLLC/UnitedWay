<?php
	// Query to figure out who the children are
	// Extract child_id's of parent's children into an array
	
	require("connect.php");
	$parentID = $_POST['parentID']; 
	$childQuery = "SELECT child_id, child_birthday, child_color, child_name, child_gender, health_code, language_code, social_code, other_code
				   FROM children WHERE child_parentID = $parentID";
	$cqResult = mysqli_query($dbConnection, $childQuery);
	$childArray = array();
	while ($cqRow = mysqli_fetch_assoc($cqResult)) {
		$childArray[$cqRow["child_id"]] = $cqRow; 
	}
	echo json_encode($childArray);
?>
