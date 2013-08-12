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
	// Prevent Cross Site Scripting Attacks
    $user_email = strip_tags(get_post_var('pUser'));
    $user_pass = strip_tags(get_post_var('pPass'));
	
	// Base-2 logarithm of the iteration count used for password stretching
	$hash_cost_log2 = 8;
	// Do we require the hashes to be portable to older systems (less secure)?
	$hash_portable = FALSE;
	$hasher = new PasswordHash($hash_cost_log2, $hash_portable);
	//unset($hasher);
	
	// Prevent SQL injections with prepared statements
	// mySQL connection variable: $dbConnection 
    $userQuery = $dbConnection ->prepare("SELECT user_id, user_password FROM users WHERE user_email = ?");
    $userQuery->bind_param('s', $user_email);
    if ($userQuery->execute()){
        $userQuery->store_result();
        $userQuery->bind_result($pid, $pass);
		$userQuery->fetch();
        if ($hasher->CheckPassword($user_pass, $pass)) {
			// Successful login, now perform multiple queries to get all user data
			// Prepare query statements
			$childQuery = "SELECT child_id, child_birthday, child_color, child_name, child_gender, health_code, language_code, social_code, other_code 
								FROM children 
								WHERE child_parentID = $pid;\n";
			$tipQuery = "SELECT fav_typeID, tip_age, tip_category 
							  FROM favorites 
							  WHERE fav_type = 'tip' AND fav_userID = $pid AND fav_kept = 1;\n";
			$rssQuery = "SELECT rss.rss_id, rss.rss_url
							  FROM (favorites JOIN rss ON (favorites.fav_typeID = rss.rss_id AND favorites.fav_type = 'rss')) 
							  WHERE favorites.fav_userID = $pid AND favorites.fav_kept = 1;\n";
			$multiQuery = $childQuery.$tipQuery.$rssQuery;
			
			// Prepare result holders
			$childResult = array();
			$keys = array('growth', 'safety', 'playtime', 'health'); // 4 categories
			$tipResult = array_fill_keys($keys, array_fill(0, 10, array())); // 10 age categories (0 ~ 9)
			$rssResult = array();
			
			/* 
			 * Organize multi query result to send back to client.
			 */
			 
			if (mysqli_multi_query($dbConnection, $multiQuery)) {
				// First result is from childQuery, this returns 9 attributes for each child
				// No ordering is required, but group in array by child_id
				if ($result = mysqli_store_result($dbConnection)) {
					while ($row = mysqli_fetch_assoc($result)) {
						$childResult[$row["child_id"]] = $row; 
					}
				}
				// Second result is from tipQuery, this returns tip Id's of all age groups.
				// 
				if (mysqli_more_results($dbConnection) && mysqli_next_result($dbConnection)) {
					$result = mysqli_store_result($dbConnection);
					while ($row = mysqli_fetch_assoc($result)) {
					/*
						$catMap = $tipResult[$row['tip_category']];
						$ageArr = $catMap[intval($row['tip_age'])];
						array_push($ageArr, $row['fav_typeID']);
						*/
						array_push($tipResult[$row['tip_category']][intval($row['tip_age'])], $row['fav_typeID']);
					}
				}
				// Third result is from rssQuery, this returns rss ids, urls
				// 
				if (mysqli_more_results($dbConnection) && mysqli_next_result($dbConnection)) {
					$result = mysqli_store_result($dbConnection);
					while($row = mysqli_fetch_row($result)) {
						// Each pair represents a rss_id - rss_url pair
						$pair = array();
						array_push($pair, $row[0], $row[1]);
						array_push($rssResult, $pair);
					}
				}
				/*
				do {
					if ($result = mysqli_store_result($dbConnection)) {
						while ($row = mysqli_fetch_row($result)) {
							$retStr = $retStr . $row[0];
						}
						mysqli_free_result($result);
					}
				} while (mysqli_more_results($dbConnection) && mysqli_next_result($dbConnection));
				*/
				$childString = json_encode($childResult);
				$tipString = json_encode($tipResult);
				$rssString = json_encode($rssResult);
				echo "SUCCESS|$pid|$childString|$tipString|$rssString";
			}
			else {
				echo "FAIL|db";
			}
        }
        else {
			// Unsuccessful Login.
            echo "FAIL|auth";
        }
    } else echo "SERVER_FAIL|server"; 
	
	mysqli_close($dbConnection);

	function get_post_var($var) {
		$val = $_POST[$var];
		if (get_magic_quotes_gpc())
			$val = stripslashes($val);
		return $val;
	}
?>
