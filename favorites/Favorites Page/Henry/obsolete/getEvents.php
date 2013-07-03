<?php

	require("connect.php");
	//$fav_userID = 3;
	$fav_userID = $_POST['userID'];
	
	// Execute the query
	$query = $con->prepare("
		SELECT event_id, event_date, event_time, event_url, event_place, event_title, event_sponsor
		FROM 
			(favorites JOIN events 
			ON (favorites.fav_typeID = events.event_id
			AND favorites.fav_type = 'event'))
		WHERE favorites.fav_userID = ?
	");
	$query->bind_param('i', $fav_userID); // Sets params to sql query
	if($query->execute()) {
		$query->store_result();
		$query->bind_result($event_id, $event_date, $event_time, $event_url, $event_place, $event_title, $event_sponsor);
		
		$results = array();
		
		// Now we need to return this as an events array
		// $row is an array of a row's items
		for($i = 0; $query->fetch(); $i++) {
			$row = array();
			$row[0] = $event_id;
			$row[1] = $event_date;
			$row[2] = $event_time;
			$row[3] = $event_url;
			$row[4] = $event_place;
			$row[5] = $event_title;
			$row[6] = $event_sponsor;
			
			$results[$i] = $row;
		}

		echo json_encode($results);
	
	
	} else echo "alert('Failed to execute RSS query)" . mysqli_error($con);

?>