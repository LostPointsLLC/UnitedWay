<?php
	
	session_start();
	include("connect.php");

	$fav_userID = strip_tags($_POST['userID']);
	
	// Execute the query
	$query = $con->prepare("
		SELECT event_id, event_date, event_time, event_url, event_place, event_title, event_sponsor
		FROM 
			(favorites JOIN events 
			ON (favorites.fav_typeID = events.event_id
			AND favorites.fav_type = 'event'))
		WHERE favorites.fav_userID = ?
	");
	$userQuery->bind_param('i', $fav_userID); // Sets params to sql query
	if($query->execute()) {
		$query->store_result();
		$query->bind_result($event_id, $event_date, $event_time, $event_url, $event_place, $event_title, $event_sponsor);
		
		// Now we need to return this as an RSS array
		while($row = mysqli_fetch_assoc($query)) {
			foreach($row as $rss_attr => $rss_val) {
				/* TODO: THIS PART OF CODE */
			}
		}
		
	
	
	} else echo "alert('Failed to execute RSS query)" . mysqli_error($con);

