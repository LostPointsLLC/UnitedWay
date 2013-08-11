<?php
	/**
	 * php/Favorites.php
	 * Author: Henry Lin (Minor additions: Paul Kim, update with PHPASS encryption)
	 * PHPASS: http://www.openwall.com/phpass/
	 * PHP script used by :
	 *     login/js/registration.js
	 *
	 * Queries from tables: users
	 * Updates tables: users
	 */
	 
	require("../../php/connect.php");
	require("../../php/phpass-0.3/PasswordHash.php");
	$first 	= strip_tags(get_post_var('pFname')); 
	$last	= strip_tags(get_post_var('pLname'));
	$pass	= strip_tags(get_post_var('pPass'));
	$email	= mysqli_real_escape_string($dbConnection, $_POST['pEmail']);
	
	// Base-2 logarithm of the iteration count used for password stretching
	$hash_cost_log2 = 8;
	// Do we require the hashes to be portable to older systems (less secure)?
	$hash_portable = FALSE;
	$hasher = new PasswordHash($hash_cost_log2, $hash_portable);
	$hash = $hasher->HashPassword($pass);
	unset($hasher);
	
	// Need to first check whether this user already has an entry
	// in the database
	$querystring = "SELECT user_email FROM users WHERE user_email = '$email'";
	
	$result = mysqli_query($dbConnection, $querystring);
	if(!$result) die("-2" . " Query was " . $querystring . "Error is: " . mysqli_error($dbConnection)); 

	if(mysqli_fetch_array($result)) {
		echo -1; // Indicates username was already taken in the database
		mysqli_close($dbConnection);
		return;
	}

	// Now we can safely insert these values into the database
	// Note that this is object oriented style of programming, but the above is using procedural style
	$query = $dbConnection->prepare("INSERT INTO users(user_first, user_last, user_email, user_password) VALUES (?, ?, ?, ?)");
	$query->bind_param('ssss', $first, $last, $email, $hash);
	if(!$query->execute()) die("Error: " . mysqli_error($dbConnection) . ". Query was " . $querystring);
	$query->store_result();

	// Make this function echo a user_id
	echo $query->insert_id;		

	// Close database connections
	$query->close();
	$dbConnection->close();
	
	
	function get_post_var($var) {
		$val = $_POST[$var];
		if (get_magic_quotes_gpc())
			$val = stripslashes($val);
		return $val;
	}

?>
