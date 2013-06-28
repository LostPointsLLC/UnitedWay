<?php
	
	session_start();
	include("connect.php");

	$fav_userID = strip_tags($_POST['userID']);
	
	// Execute the query
	$query = $con->prepare("
		SELECT *
		FROM 
			(favorites JOIN rss ON (favorites.fav_typeID = rss.rss_id AND favorites.fav_type = 'rss'))
		WHERE favorites.fav_userID = ?		
	");
	$userQuery->bind_param('

