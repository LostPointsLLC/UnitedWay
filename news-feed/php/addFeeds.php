<?php

	/* TODO: Make this function support deleting a list of RSS feed items */
	require("../../php/connect.php");							// Connects to the database

	$user_id = json_decode($_POST['user_id']);					// Extracts the user_ID
	$rssObjects = json_decode($_POST['rssObjects']);			// Extracts the array of rssObjects

	addToRSSTable($dbConnection, $rssObjects);					// Adds to the RSS table	
	addToFavoritesTable($dbConnection, $rssObjects, $user_id);	// Adds to the favorites table	
	mysqli_close($dbConnection);


	function addToRSSTable($dbConnection, $rssObjects) {

		$querystring = "INSERT INTO rss (rss_url, rss_title, rss_source, rss_dateadded) VALUES ";
		$querystring = $querystring . getRSSString($dbConnection, $rssObjects);
		if(!mysqli_query($dbConnection, $querystring))
			echo "Error: " . $querystring . mysqli_error($dbConnection);
	}
	
	// Adds the newly added RSS items into the favorites table
	function addToFavoritesTable($dbConnection, $rssObjects, $user_id) {

		$querystring = "INSERT INTO favorites (fav_type, fav_typeID, fav_userID) VALUES ";
		$querystring = $querystring . getFavString($dbConnection, $rssObjects, $user_id);
		if(!mysqli_query($dbConnection, $querystring))
			echo "Error: " . $querystring . mysqli_error($dbConnection);
		echo $querystring;
	}


	function getFavString($dbConnection, $rssObjects, $user_id) {
		
		// Finds the last rss item added to the rss table
		$last_id = mysqli_insert_id($dbConnection);
		echo $last_id;
		// Creates the string to be used in the query
		$favString = "";
		for($i = 0; $i < count($rssObjects); $i++) {
			$id = $last_id + $i;
			$favString = $favString . "('rss', $id, $user_id)";

			// Case when we continue iterating
			if($i != count($rssObjects) - 1)
				$favString = $favString . ", ";

			else
				$favString = $favString . ";";

		}
		return $favString;
	}


	/* Creates the string of tuples that need
	 * to be entered into the database.
	 *
	 * $rssObjects: An array of arrays.
	 *
	 * Note: For each of these rssObjects:
	 * rssObjects[i][0] = a link
	 * rssObjects[i][1] = a title
	 * rssObjects[i][2] = the source
	 */
	function getRSSString($dbConnection, $rssObjects) {

		$rss = "";
		for($i = 0; $i < count($rssObjects); $i++) {
			$link 	= mysqli_real_escape_string($dbConnection, $rssObjects[$i][0]);
			$title 	= mysqli_real_escape_string($dbConnection, $rssObjects[$i][1]);
			$source	= mysqli_real_escape_string($dbConnection, $rssObjects[$i][2]);

			$rss = $rss . "('$link', '$title', '$source', CURRENT_DATE())";

			if($i != count($rssObjects) - 1)
				$rss = $rss . ", ";
			else
				$rss = $rss . ";";
		}

		return $rss;
	}


?>
