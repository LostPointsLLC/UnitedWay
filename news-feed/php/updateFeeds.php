<?php

	require("../../php/connect.php");							// Connects to the database

	$user_id 		= json_decode($_POST['user_id']);			// Extracts the user_ID
	$removeArray	= json_decode($_POST['removeString']);		// Extracts the string of rss ids to be removed
	$addArray 		= json_decode($_POST['addString']);			// Extracts the array of rss objects

	// Executes the remove query on the favorites table
	if(count($removeArray) != 0) {
		$removeQuerystring = getRemoveQuerystring($removeArray, $user_id);
		if(!mysqli_query($dbConnection, $removeQuerystring))
			echo "Error: " . mysqli_error($dbConnection);
		echo $removeQuerystring;
	}

	// Adds all of the new data to the rss and favorites tables
	if(count($addArray) != 0) {
		// Executes the add query on the rss table
		$rssString = getRssString($dbConnection, $addArray, $user_id);
		if(!mysqli_query($dbConnection, $rssString))
			echo "Error: " . mysqli_error($dbConnection);

		echo $rssString;
		// Now we update the favorites table
		$favQuerystring	= getFavString($dbConnection, $addArray, $user_id);
		if(!mysqli_query($dbConnection, $favQuerystring))
			echo "Error: Querystring is " . $favQuerystring . " Error is " . mysqli_error($dbConnection);

	}
	mysqli_close($dbConnection);


	// Creates the querystring associated with updating entries in the favorites table
	function getRemoveQuerystring($removeArray, $user_id) {

		$querySubstring = "";
		for($i = 0; $i < count($removeArray); $i++) {
			if($i == 0)
				$querySubstring = $querySubstring . $removeArray[$i];

			else
				$querySubstring = $querySubstring . ", " . $removeArray[$i];
		}
		return "UPDATE favorites SET fav_kept=0 WHERE fav_type='rss' and fav_typeID in ($querySubstring);";

	}

	function getRssString($dbConnection, $addArray, $user_id) {
		$rssString = "INSERT INTO rss (rss_url, rss_title, rss_source, rss_dateadded) VALUES ";
		$rssString = $rssString . getRssSubstring($dbConnection, $addArray);
		return $rssString;
	}
	
	// Adds the newly added RSS items into the favorites table
	function getFavString($dbConnection, $addArray, $user_id) {
		$querystring = "INSERT INTO favorites (fav_type, fav_typeID, fav_userID) VALUES ";
		$querystring = $querystring . getFavSubstring($dbConnection, $addArray, $user_id);
		return $querystring;
	}

	/* Creates the string of tuples that need
	 * to be entered into the database.
	 *
	 * $addArray: An array of arrays.
	 *
	 * Note: For each of these arrays
	 * addArray[i][0] = a link
	 * addArray[i][1] = a title
	 * addArray[i][2] = the source
	 */
	function getRssSubstring($dbConnection, $addArray) {

		$rss = "";
		for($i = 0; $i < count($addArray); $i++) {
			$link 	= mysqli_real_escape_string($dbConnection, $addArray[$i][0]);
			$title 	= mysqli_real_escape_string($dbConnection, $addArray[$i][1]);
			$source	= mysqli_real_escape_string($dbConnection, $addArray[$i][2]);

			$rss = $rss . "('$link', '$title', '$source', CURRENT_DATE())";

			if($i != count($addArray) - 1)
				$rss = $rss . ", ";
		}

		return $rss;
	}


	function getFavSubstring($dbConnection, $addArray, $user_id) {
		
		// Finds the last rss item added to the rss table
		$last_id = mysqli_insert_id($dbConnection);
		
		// Creates the string to be used in the query
		$favString = "";
		for($i = 0; $i < count($addArray); $i++) {
			$id = $last_id + $i;
			$favString = $favString . "('rss', $id, $user_id)";

			// Case when we continue iterating
			if($i != count($addArray) - 1)
				$favString = $favString . ", ";

			else
				$favString = $favString . ";";

		}
		return $favString;
	}



?>
