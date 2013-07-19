<?php 
	require("../../php/connect.php");							// Connects to the database
	$user_id = $_POST['user_id'];								// Extracts the user_ID
	echo json_encode(getIDArray($dbConnection, $user_id));		// Returns the array as a JSON object

	// Retrieve back an array full of rss IDs that the user favorited
	function getIDArray($dbConnection, $user_id) {
		$idArray = array();
		$querystring = "SELECT rss.rss_id, rss.rss_url
			FROM (favorites JOIN rss ON (favorites.fav_typeID = rss.rss_id AND favorites.fav_type = 'rss')) 
			WHERE favorites.fav_userID = $user_id AND favorites.fav_kept = 1";
		
		$result = mysqli_query($dbConnection, $querystring);
		while($row = mysqli_fetch_row($result)) {

			// Each pair represents a rss_id - rss_url pair
			$pair = array();
			array_push($pair, $row[0], $row[1]);
			array_push($idArray, $pair);

		}
		return $idArray;

	}
	


?>
