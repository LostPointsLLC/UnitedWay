<?php
	require("connect.php");
	$fav_userID = 3;
	//$fav_userID = $_POST['userID'];
	
	$output = array();
	
	// Execute the rss query
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
		
		$rssArray = array();
		
		// Now we need to return this as an RSS array
		// $row is an array of a row's items
		// fetch() changes the query row into php data
		while($query->fetch()) {
			$row = array();
			$row[0] = $rss_id;
			$row[1] = $rss_url;
			$row[2] = $rss_title;
			$row[3] = $rss_source;
			
			array_push($rssArray, $row);
		}

		array_push($output, $rssArray);
		
	} else echo "alert('Failed to execute RSS query)" . mysqli_error($con);

	
	
	
	// Execute the tip query
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
		
		$tipsArray = array();
		
		// Now we need to return this as a tips array
		// $row is an array of a row's items
		while($query->fetch()) {
			$row = array();
			$row[0] = $tip_id;
			$row[1] = $tip_age;
			$row[2] = $tip_category;
			$row[3] = $tip_title;
			
			array_push($tipsArray, $row);
		}
		array_push($output, $tipsArray);
		
	} else echo "alert('Failed to execute tip query)" . mysqli_error($con);
	
	
	
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
		
		$eventsArray = array();
		
		// Now we need to return this as an events array
		// $row is an array of a row's items
		while($query->fetch()) {
			$row = array();
			$row[0] = $event_id;
			$row[1] = $event_date;
			$row[2] = $event_time;
			$row[3] = $event_url;
			$row[4] = $event_place;
			$row[5] = $event_title;
			$row[6] = $event_sponsor;
			
			array_push($eventsArray, $row);
		}

		array_push($output, $eventsArray);
	
	
	} else echo "alert('Failed to execute RSS query)" . mysqli_error($con);
	
	echo json_encode($output);
?>