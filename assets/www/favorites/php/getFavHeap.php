<?php
	require("../../php/connect.php");
	$fav_userID = $_POST['userID'];
	$output = array();

	/* TODO: I unwisely made this into three separate server calls. However
	 * you could string these sql strings together to get only one call
	 */
	array_push($output, getRssArray($dbConnection, $fav_userID));
	array_push($output, getTipsArray($dbConnection, $fav_userID));
	array_push($output, getEventsArray($dbConnection, $fav_userID));
	echo json_encode($output);
	return;

	function getRssArray($dbConnection, $fav_userID) {
		// Execute the rss query
		$query = $dbConnection->prepare("
			SELECT rss_id, rss_url, rss_title, rss_source, favorites.fav_id 
			FROM 
				(favorites JOIN rss 
				ON (favorites.fav_typeID = rss.rss_id 
				AND favorites.fav_type = 'rss'))
			WHERE favorites.fav_userID = ? AND favorites.fav_kept = 1;
		");
		$query->bind_param('i', $fav_userID); // Sets params to sql query
		if(!($query->execute())) die("Failed to execute RSS query" . mysqli_error($dbConnection));
		$query->store_result();
		$query->bind_result($rss_id, $rss_url, $rss_title, $rss_source, $fav_id);
		
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
			$row[4] = $fav_id;	
			array_push($rssArray, $row);
		}
		
		return $rssArray;	
	}
		
	function getTipsArray($dbConnection, $fav_userID) {	
		/*
		// Execute the tip query
		$query = $dbConnection->prepare("
			SELECT tip_id, tips.tip_age, tips.tip_category, tips.tip_content, favorites.fav_id
			FROM 
				(favorites JOIN tips 
				ON (favorites.fav_typeID = tips.tip_id 
				AND favorites.fav_type = 'tip'))
			WHERE favorites.fav_userID = ? AND favorites.fav_kept = 1;
		");
		$query->bind_param('i', $fav_userID); // Sets params to sql query
		if(!($query->execute())) die("Failed to execute RSS query" . mysqli_error($dbConnection));
		
		$query->store_result();
		$query->bind_result($tip_id, $tip_age, $tip_category, $tip_content, $fav_id);
		
		$tipsArray = array();
		
		// Now we need to return this as a tips array
		// $row is an array of a row's items
		while($query->fetch()) {
			$row = array();
			$row[0] = $tip_id;
			$row[1] = $tip_age;
			$row[2] = $tip_category;
			$row[3] = $tip_content;
			$row[4] = $fav_id;	
			array_push($tipsArray, $row);
		}
		
		return $tipsArray;
		*/
		// Execute the tip query
		$query = $dbConnection->prepare("
			SELECT fav_typeID, tip_age, tip_category, fav_id
			FROM 
				favorites
			WHERE fav_userID = ? AND fav_type='tip' AND fav_kept = 1;
		");
		
		$query->bind_param('i', $fav_userID); // Sets params to sql query
		if(!($query->execute())) die("Failed to execute RSS query" . mysqli_error($dbConnection));
		
		$query->store_result();
		$query->bind_result($tip_id, $tip_age, $tip_category, $fav_id);
		
		$tipsArray = array();
		
		// Now we need to return this as a tips array
		// $row is an array of a row's items
		while($query->fetch()) {
			$row = array();
			$row[0] = $tip_id;
			$row[1] = $tip_age;
			$row[2] = $tip_category;
			$row[3] = $fav_id;	
			array_push($tipsArray, $row);
		}
		
		return $tipsArray;
	}	
		
	function getEventsArray($dbConnection, $fav_userID) {	
		// Execute the query
		$query = $dbConnection->prepare("
			SELECT event_id, event_date, event_time, event_url, event_place, event_title, event_sponsor, favorites.fav_id
			FROM 
				(favorites JOIN events 
				ON (favorites.fav_typeID = events.event_id AND favorites.fav_type = 'event'))
			WHERE favorites.fav_userID = ? AND favorites.fav_kept = 1;
		");
		$query->bind_param('i', $fav_userID); // Sets params to sql query
		if(!($query->execute())) die("Failed to execute RSS query" . mysqli_error($dbConnection));
		$query->store_result();
		$query->bind_result($event_id, $event_date, $event_time, $event_url, $event_place, $event_title, $event_sponsor, $fav_id);
		
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
			$row[7] = $fav_id;
			array_push($eventsArray, $row);
		}

		return $eventsArray;	
	
	} 
	
?>
