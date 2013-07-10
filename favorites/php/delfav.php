<?php

	require("connect.php");
	$id_array = json_decode($_POST['jsonString']);

	$querysubstring; 

	for($i = 0; $i < count($id_array); $i++) {
		$id = $id_array[$i];

		// If $i > 0, then each command will have an appended "or"
		if($i != 0) {
			$querysubstring = $querysubstring . "OR fav_id = $id ";
		}

		// The first command has no OR
		else {
			$querysubstring = "fav_id = $id ";
		}

	}

	$querystring = "DELETE FROM favorites WHERE $querysubstring";
	var_dump($querystring);
	mysqli_query($con, $querystring); 

	mysqli_close($con);


?>
