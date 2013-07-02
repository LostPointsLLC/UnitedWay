<!--
<?php 
  
    //session_start(); 
    /* Logs into the database using the database information */
    $hostname   = "UnitedWayMobile.db.8668974.hostedresource.com"; 
    $username   = "UnitedWayMobile"; 
    $password   = "Un!t3dW@y"; 
    $dbname     = "UnitedWayMobile"; 
  
    $con = mysqli_connect($hostname, $username, $password)  
    OR DIE ("Unable to connect to database! Please try again later." . mysqli_connect_error()); 
    mysqli_select_db($con, $dbname); 
  
      
    $pPass = $_POST['user_password']; 
    $pPhone = $_POST['user_phone']; 
    $pFirst = $_POST['user_first']; 
    $pLast = $_POST['user_last']; 
    $pEmail = $_POST['user_email']; 
      
//    $return_url = "http://localhost/home.html"; 
      

    $insertion = mysqli_query($con,  
        "INSERT INTO users(user_password, user_phone, user_first, user_last, user_email)  
        VALUES ($pass, $phone, $first, $last, $email)"); 
      
    if($insertion) { 
        echo "<h1>Success! Will redirect in 2 seconds</h1>"; 
        header("refresh: 2; url = $return_url"); 
        exit(); 
    } 
    else { 
        echo "<h1>Sorry, the row was not inserted properly. " . mysqli_error($con) . "</h1>"; 
        echo "<form action ='$return_url' method = 'post'>"; 
        echo "<button type='submit'>Click to return</button>"; 
        echo "</form>"; 
    } 
  
  
?>
-->


<?php

   require("mobileConnect.php");

    $pPass = $_POST['password']; 
    $pPhone = $_POST['phone']; 
    $pFirst = $_POST['first']; 
    $pLast = $_POST['last']; 
    $pEmail = $_POST['email']; 
   
   mysqli_query($con,"INSERT INTO users (user_first, user_last, user_phone, user_email, user_password)
   VALUES ('$_POST[First]', '$_POST[Last]', '$_POST[Phone]', '$_POST[Email]', '$_POST[Pass]')");

   if (!mysqli_query($con,$sql))
     {
     die('Error: ' . mysqli_error($con));
     }
   echo "Registration Complete!";
   

   mysqli_close($con);
?>


<!--
<?php


   $sql="INSERT INTO Persons (FirstName, LastName, Age)
   VALUES
   ('$_POST[firstname]','$_POST[lastname]','$_POST[age]')";

   if (!mysqli_query($con,$sql))
     {
     die('Error: ' . mysqli_error($con));
     }
   echo "1 record added";

   mysqli_close($con);
?>
-->

<!--
<?php
	/*
		Handles all data requests from web/mobile application
		
	*/
	require("mobileConnect.php");
	// Prevent Cross Site Scripting Attacks
    $user_email = strip_tags($_POST['pUser']);
    $user_pass = strip_tags($_POST['pPass']);
	
	// Prevent SQL injections with prepared statements
	// mySQL connection variable: $dbConnection 
    $userQuery = $dbConnection ->prepare("SELECT * FROM users WHERE user_email= ? AND user_password= ?");
    $userQuery->bind_param('ss', $user_email, $user_pass);
    if ($userQuery->execute()){
        $userQuery->store_result();
        $userQuery->bind_result($column1, $column2, $column3, $column4, $column5, $column6, $column7);
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
-->
