<?php

	if(!isset($_POST['submit2']))
	{
		//Form was not submitted
		//$message = "All fields are required:";
		// Henry: You should bounceback on the clientside. It'd be faster.
	}
	else {
		//Form was submitted
		$fname   = (isset($_POST['firstname']))   ? trim($_POST['firstname'])   : false;
		$lname   = (isset($_POST['lastname']))   ? trim($_POST['lastname'])   : false;
		$phone   = (isset($_POST['phone']))   ? trim($_POST['phone'])   : false;
		$email = (isset($_POST['email'])) ? trim($_POST['email']) : false;
		$password = (isset($_POST['password'])) ? trim($_POST['password']) : false;
			
		   

		if(empty($fname) || empty($lname) || empty($phone) || empty($password) || empty($email) ||  !(strpos($email, '@')) )
		{
			//Required fields were not set or were empty
			$message = "<span style='color:#ff0000'>Please verify your information</span>";
		}
		else {
			//Required fields were present. Connect to database
			$host= "UnitedWayMobile.db.8668974.hostedresource.com";
			$username2 = "UnitedWayMobile";
			$password1 = "Un!t3dW@y";
			$database = "UnitedWayMobile";
			$con = mysqli_connect($server, $username, $user_password, $database);
			if(mysqli_connect_errno($dbConnection)) {
			echo "Database connection error, please check internet connection";
			echo "Error: could not establish database connection" . mysqli_connect_error();
		} 

			//Sanitize values and create/run query
			$fname   =  mysql_real_escape_string($fname);
			$lname   =  mysql_real_escape_string($lname);
			$phone   =  mysql_real_escape_string($phone);
			$password =  mysql_real_escape_string($password);
			$email =  mysql_real_escape_string($email);
			
			$query2 = mysql_query("SELECT user_first FROM users");       
			
			$f = 1;
			
			while($row = mysql_fetch_array($query2)){
			
			if(in_array($username,$row)){        	       
				$f = 0;        
		}
			
			}
			if($f==1)
			{
			$query = "INSERT INTO users SET user_first = '$username', password='$password' , email = '$email'";
			
				 $result = mysql_query($query);
			}

		
			if(!$result)
			{
				$message = "<span style='color:#ff0000'>Username is already taken.</span>";
				//Next line for debugging purposes only.
				//$message .= "<br>Query: {$query}<br>Error: " . mysql_error();
			}
			else
			{
				$message = "You've been added to Lumos! <br> <a href='/index.php'>Login!</a>";
			}
			
		mysql_close($con);
		}

	}
?>