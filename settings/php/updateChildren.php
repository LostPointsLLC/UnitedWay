
<?php

	require("../../php/connect.php");
	$id_array = json_decode($_POST['jsonString']);
	updateChildren($dbConnection, $id_array);
	mysqli_close($dbConnection);

	// Executes a query that deletes a list of fav_id's from the favorites table
	// Actually it updates the "kept" bit in the favorites table, so we don't have to
	// delete any rows per se. We just update some data
	function updateChildren($dbConnection, $id_array) {
		
		$querysubstring = ""; 

		for($i = 0; $i < count($id_array); $i++) {

			$id = $id_array[$i];

			// If $i > 0, then each command will have an appended "or"
			if($i != 0) $querysubstring = $querysubstring . "OR child_id = $id ";
			

			// The first command has no OR
			else 		$querysubstring = "child_id = $id ";
			

		}
		$querystring = "DELETE FROM children WHERE " . $querysubstring;
		mysqli_query($dbConnection, $querystring);
		echo $querystring;
	}



?>
