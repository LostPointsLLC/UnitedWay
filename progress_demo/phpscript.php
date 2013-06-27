<?php

//Defines the username, password and hostname
$username = "sql312369";
$password = "lR6!gD5%";
$hostname = "sql3.freesqldatabase.com";

// Connects to your Database
$dbhandle = mysql_connect($hostname, $username, $password)or die("Unable to connect to MySQL");
echo "Connected to MySQL<br/>";

//selects a database to work with
$selected = mysql_select_db('sql312369',$dbhandle) 
  or die("Could not select examples");
echo "connected to db<br/>";

//execute the SQL query and fetches the records
$result = mysql_query("SELECT COUNT(Checked) FROM child WHERE Checked = 1");
$row = mysql_fetch_assoc($result);
echo "Count = ";
echo($row['COUNT(Checked)']); //the numerical value of count

echo json_encode($row['COUNT(Checked)']);// outputs JSON object containing "3"
exit();
?>
