<?php

	require("../../php/connect.php");
	require("../../php/phpass-0.3/PasswordHash.php");

	$user_id = strip_tags(get_post_var('pid'));
	$user_currpw = strip_tags(get_post_var('curr_pw'));	//current password
	$user_newpw = strip_tags(get_post_var('new_pw'));	//new password

	// Base-2 logarithm of the iteration count used for password stretching
	$hash_cost_log2 = 8;
	// Do we require the hashes to be portable to older systems (less secure)?
	$hash_portable = FALSE;
	$hasher = new PasswordHash($hash_cost_log2, $hash_portable);
	$hash = $hasher->HashPassword($user_newpw);	//hashed version of new password

	//Step 1
	//verifies the current password matches the password in database
	$userQuery = $dbConnection->prepare("SELECT user_password FROM users WHERE user_id = ?");
	$userQuery->bind_param('i', $user_id);
	if ($userQuery->execute()){
        $userQuery->store_result();
        $userQuery->bind_result($pass);
		$userQuery->fetch();
		//current password matches the one on database
        if ($hasher->CheckPassword($user_currpw, $pass)) {
        	//Step 2
			//prepares to update the database with the new password
			($changeQuery = $dbConnection ->prepare("UPDATE users SET user_password = ? WHERE user_id = ?"))||fail('MySQL prepare', $db->error);
			$changeQuery->bind_param('si',$hash, $user_id)|| fail('MySQL bind_param', $db->error);
			$changeQuery->execute()|| fail('MySQL execute', $db->error);
			unset($hasher);
			echo "Password Changed";
		}
		else //unable to authenticate user
			echo "AUTH FAILED";
	}
	else
		echo "SERVER_FAIL|server"; 

	mysqli_close($dbConnection);

	function get_post_var($var) {
		$val = $_POST[$var];
		if (get_magic_quotes_gpc())
			$val = stripslashes($val);
		return $val;
	}
?>