<?php
	require("connect.php");
	//$fav_userID = 3;
	$fav_userID = $_POST['userID'];
	
	// Execute the query
	$query = $con->prepare("
		SELECT rss_id, rss_url, rss_title, rss_source
		FROM 
			(favorites JOIN rss 
			ON (favorites.fav_typeID = rss.rss_id 
			AND favorites.fav_type = 'rss'))
		WHERE favorites.fav_userID = ?
	");
	$query->bind_param('i', $fav_userID); // Sets params to sql query
	if($query->execute()) {
		$query->store_result();
		$query->bind_result($rss_id, $rss_url, $rss_title, $rss_source);
		
		$results = array();
		
		// Now we need to return this as an RSS array
		// $row is an array of a row's items
		// fetch() changes the query row into php data
		for($i = 0; $query->fetch(); $i++) {
			$row = array();
			$row[0] = $rss_id;
			$row[1] = $rss_url;
			$row[2] = $rss_title;
			$row[3] = $rss_source;
			
			$results[$i] = $row;
		}

		echo json_encode($results);
		
	} else echo "alert('Failed to execute RSS query)" . mysqli_error($con);

?>