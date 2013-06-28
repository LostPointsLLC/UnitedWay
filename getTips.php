<?php
	
	session_start();
	include("connect.php");

	$fav_userID = strip_tags($_POST['userID']);
	
	// Execute the query
	$query = $con->prepare("
		SELECT tip_id, tip_age, tip_category, tip_title
		FROM 
			(favorites JOIN tips 
			ON (favorites.fav_typeID = tips.tip_id 
			AND favorites.fav_type = 'tip'))
		WHERE favorites.fav_userID = ?
	");
	$userQuery->bind_param('i', $fav_userID); // Sets params to sql query
	if($query->execute()) {
		$query->store_result();
		$query->bind_result($tip_id, $tip_age, $tip_category, $tip_title);
		
		// Now we need to return this as an RSS array
		while($row = mysqli_fetch_assoc($query)) {
			foreach($row as $rss_attr => $rss_val) {
				/* TODO: THIS PART OF CODE */
			}
		}
		
	
	
	} else echo "alert('Failed to execute tip query)" . mysqli_error($con);

