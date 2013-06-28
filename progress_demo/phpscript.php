<?php
header('Content-type: application/javascript');

//Defines the username, password and hostname
$username = "sql312369";
$password = "lR6!gD5%";
$hostname = "sql3.freesqldatabase.com";
$db = "sql312369";

// Connects to your Database
$dbhandle = mysqli_connect($hostname, $username, $password, $db);

//execute the SQL query and fetches the records
$result = mysqli_query($dbhandle, "SELECT COUNT(Checked) FROM child WHERE Checked = 1");
$row = mysqli_fetch_assoc($result);

// outputs JSON object containing "3"
echo json_encode($row['COUNT(Checked)']);

?>
