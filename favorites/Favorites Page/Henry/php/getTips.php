<?php

	require("connect.php");
	//$fav_userID = 3;
	$fav_userID = $_POST['userID'];
	
	// Execute the query
	$query = $con->prepare("
		SELECT tip_id, tip_age, tip_category, tip_title
		FROM 
			(favorites JOIN tips 
			ON (favorites.fav_typeID = tips.tip_id 
			AND favorites.fav_type = 'tip'))
		WHERE favorites.fav_userID = ?
	");
	$query->bind_param('i', $fav_userID); // Sets params to sql query
	if($query->execute()) {
		$query->store_result();
		$query->bind_result($tip_id, $tip_age, $tip_category, $tip_title);
		
		$results = array();
		
		// Now we need to return this as a tips array
		// $row is an array of a row's items
		for($i = 0; $query->fetch(); $i++) {
			$row = array();
			$row[0] = $tip_id;
			$row[1] = $tip_age;
			$row[2] = $tip_category;
			$row[3] = $tip_title;
			
			$results[$i] = $row;
		}
		echo json_encode($results);
		
	} else echo "alert('Failed to execute tip query)" . mysqli_error($con);

?>