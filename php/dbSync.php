<?php
	/**
	 * php/dbSync.php
	 * Author: Paul Kim
	 * 
	 * PHP script used throughout the program when the app needs to sync data with the database
	 *
	 * Updates database tables depending on which JS script makes the ajax call
	 */
	
	require("connect.php");
	
	$user_id = $_POST['pid'];
	$new_children = json_decode($_POST['new_children'], true);
	$del_children = json_decode($_POST['del_children']);
	$modified_children = json_decode($_POST['modified_children'], true);
	$fav_tips = json_decode($_POST['fav_tips'], true);
	$unfav_tips = json_decode($_POST['unfav_tips'], true);
	$add_rss = json_decode($_POST['add_rss'], true);
	$del_rss = json_decode($_POST['del_rss']);
	
	// Assemble Query string for new_children
	$nc_qs = "";
	if (count($new_children) != 0) {
		$nc_qs = "INSERT INTO children (child_parentID, child_name, health_code, language_code, social_code, other_code, child_gender, child_birthday, child_color) VALUES ";
		$comma = "";
		foreach ($new_children as $key=>$child) {
			$name = $child['child_name'];
			$hCode = $child['health_code'];
			$lCode = $child['language_code'];
			$sCode = $child['social_code'];
			$oCode = $child['other_code'];
			$gender = $child['child_gender'];
			$bday = $child['child_birthday'];
			$color = $child['child_color'];
			
			$nc_qs = $nc_qs . $comma . "($user_id, '$name', '$hCode', '$lCode', '$sCode',
										'$oCode', '$gender', '$bday', '$color')";
			$comma = ",";
		}
		$nc_qs = $nc_qs . ";\n";
	}
	
	// Assemble Query string for del_children
	$dc_qs = "";
	if (count($del_children) != 0) {
		$qss = "";
		$OR = "";
		for($i = 0; $i < count($del_children); $i++) {
			$id = $del_children[$i];
			$qss = $qss . $OR . " child_id = $id ";
			$OR = "OR";
		}
		$dc_qs = "DELETE FROM children WHERE " . $qss . ";\n";
	}

	// Assemble Query string for modified children
	// UPDATE tbl_accounts SET nation_id = 3331, groupid = 3332 WHERE id_account = 3
	$updateChildren = array ();
	if (count($modified_children) != 0) {
		foreach ($modified_children as $key=>$child) {
			$cid = $key;
			$name = $child['child_name'];
			$hCode = $child['health_code'];
			$lCode = $child['language_code'];
			$sCode = $child['social_code'];
			$oCode = $child['other_code'];
			$gender = $child['child_gender'];
			$bday = $child['child_birthday'];
			$color = $child['child_color'];
			$uc_qs = "UPDATE children SET child_name = '$name', health_code = '$hCode', language_code = '$lCode',
					  social_code = '$sCode', other_code = '$oCode', child_gender = '$gender', child_birthday = '$bday', child_color = '$color'
					  WHERE child_id = $cid;\n";
			array_push($updateChildren, $uc_qs);
		}
	}
	// Assemble Query string for fav_tips
	$ft_qs = "";
	if (count($fav_tips) != 0) {
		// Create (values) substring
		$ft_ss = "";
		$comma = "";
		foreach ($fav_tips as $category => $age_group) {
			for ($i = 0; $i < count($age_group); $i++) {
				for ($j = 0; $j < count($age_group[$i]); $j++) {
					$fav_typeID = $age_group[$i][$j];
					$ft_ss = $ft_ss . $comma . "('tip', $fav_typeID , $user_id, $i, '$category', 1)";
					$comma = ",";
				}
			}
		}
		if (!empty($ft_ss)) {
			$ft_qs = "INSERT INTO favorites (fav_type, fav_typeID, fav_userID, tip_age, tip_category, fav_kept)
					  VALUES $ft_ss
					  ON DUPLICATE KEY UPDATE fav_kept = 1;\n";
		}
	}
	
	// Assemble Query string for unfav_tips
	$uft_qs = "";
	if (count($unfav_tips) != 0) {
		// Create (values) substring
		$uft_ss = "";
		foreach ($unfav_tips as $category => $age_group) {
			for ($i = 0; $i < count($age_group); $i++) {
				for ($j = 0; $j < count($age_group[$i]); $j++) {
					$fav_typeID = $age_group[$i][$j];
					$uft_ss = $uft_ss . "WHEN fav_type = 'tip' AND fav_typeID = '$fav_typeID' AND fav_userID = '$user_id' AND tip_age = $i AND tip_category = '$category' THEN 0 ";
				}
			}
		}
		if (!empty($uft_ss)) {
			$uft_qs = "UPDATE favorites SET fav_kept = CASE $uft_ss ELSE fav_kept END;\n";
		}
	}
	
	// Assemble Query string for add_rss
	$ar_qs1 = "";
	$ar_qs2 = "";
	if (count($add_rss) != 0) {
		$qss1 = "";
		$qss2 = "";
		$comma = "";
		$incr = 0;
		foreach ($add_rss as $key=>$feed) {
			$url = $key;
			$title = $feed[1];
			$source = $feed[2];
			$qss1 = $qss1 . $comma . "('$url', '$title', '$source', CURRENT_DATE())";
			$qss2 = $qss2 . $comma . "('rss', LAST_INSERT_ID() + $incr, $user_id)";
			$comma = ",";
			$incr++;
		}
		$ar_qs1 = "INSERT INTO rss (rss_url, rss_title, rss_source, rss_dateadded) VALUES $qss1 ;\n";
		$ar_qs2 = "INSERT INTO favorites (fav_type, fav_typeID, fav_userID) VALUES $qss2 ;\n";
	}
	
	
	// Assemble Query string for del_rss
	$dr_qs = "";
	if (count($del_rss) != 0) {
		$qss = "";
		$comma = "";
		for ($i = 0; $i < count($del_rss); $i++) {
			$qss = $qss . $comma . $del_rss[$i];
			$comma = ",";
		}
		
		$dr_qs = "UPDATE favorites SET fav_kept=0 WHERE fav_id in ($qss);\n";
	}
	$rssQuery = "SELECT rss.rss_id, rss.rss_url, rss_title, rss_source, favorites.fav_id 
							  FROM (favorites JOIN rss ON (favorites.fav_typeID = rss.rss_id AND favorites.fav_type = 'rss')) 
							  WHERE favorites.fav_userID = $user_id AND favorites.fav_kept = 1;\n";
	$multiQuery = $nc_qs . $dc_qs;
	for ($i = 0; $i < count($updateChildren); $i++) {
		$multiQuery = $multiQuery . $updateChildren[$i];
	}
	
	$multiQuery = $multiQuery . $ft_qs . $uft_qs . $ar_qs1 . $ar_qs2 . $dr_qs . $rssQuery;
	$rssResult = array();
	if (mysqli_multi_query($dbConnection, $multiQuery)) {
		while (mysqli_more_results($dbConnection) && mysqli_next_result($dbConnection)) {
			if ($result = mysqli_store_result($dbConnection)) {
				while($row = mysqli_fetch_row($result)) {
					// Each pair represents a rss_id - rss_url pair
					$pair = array();
					array_push($pair, $row[0], $row[1], $row[2], $row[3], $row[4]);
					array_push($rssResult, $pair);
				}
			}
		}
		
		$rssString = json_encode($rssResult);
		echo "SUCCESS|$rssString";
	}
	else {
		echo "FAIL|XX";
	}
	mysqli_close($dbConnection)
?>
