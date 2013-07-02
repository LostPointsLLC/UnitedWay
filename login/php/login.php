<?php
	/*
		Handles all data requests from web/mobile application
		
	*/
	require("connect.php");
	// Prevent Cross Site Scripting Attacks
    $user_email = strip_tags($_POST['pUser']);
    $user_pass = strip_tags($_POST['pPass']);
	
	// Prevent SQL injections with prepared statements
	// mySQL connection variable: $dbConnection 
    $userQuery = $dbConnection ->prepare("SELECT * FROM users WHERE user_email= ? AND user_password= ?");
    $userQuery->bind_param('ss', $user_email, $user_pass);
    if ($userQuery->execute()){
        $userQuery->store_result();
        $userQuery->bind_result($column1, $column2, $column3, $column4, $column5, $column6);
        $userQuery->fetch();
        if ($userQuery->num_rows == 1) {
			// Successful login, echo out parentID.
			echo $column1;
        }
        else {
			// Unsuccessful Login.
            echo 0;
        }
    }

?>