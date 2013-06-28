<?php
	
	session_start();
	include("connect.php");

	$fav_userID = strip_tags($_POST['userID']);
	
	// Execute the query
	$query = $con->prepare("
		SELECT rss_id, rss_url, rss_title, rss_source
		FROM 
			(favorites JOIN rss 
			ON (favorites.fav_typeID = rss.rss_id 
			AND favorites.fav_type = 'rss'))
		WHERE favorites.fav_userID = ?
	");
	$userQuery->bind_param('i', $fav_userID); // Sets params to sql query
	if($query->execute()) {
		$query->store_result();
		$query->bind_result($rss_id, $rss_url, $rss_title, $rss_source);
		
		// Now we need to return this as an RSS array
		while($row = mysqli_fetch_assoc($query)) {
			foreach($row as $rss_attr => $rss_val) {
				/* TODO: THIS PART OF CODE */
			}
		}
		
	
	
	} else echo "alert('Failed to execute RSS query)" . mysqli_error($con);

