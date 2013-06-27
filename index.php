<?php
	session_start();
?>

<html>
	<head>
		<title>Henry's Webpage</title>
		
		<link rel='stylesheet' type='text/css' href='stylesheet.css'>
		<script src="//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js" ></script>
		
		<link rel='stylesheet' type='text/css' href='input.css'>
	</head>

	<body>
		<div id="container">

			<!-- Cover photo and navigation should go here-->
			<div id="header"></div>

			<!-- Content for the page should go here -->
			<div id="content">
				<div class="con_title">
					<h1>Welcome!</h1>
				</div>
				<p>Please feel free to reach me at halin2@illinois.edu.</p>
				
				<!-- These divs will be populated by the jQuery below -->
				<div id="checklist"></div>
				<div id="rss"></div>
				<div id="children"></div>
				<div id="tips"></div>
				<div id="favorites"></div>
				<div id="users"></div>
				<div id="events"></div>
				
				<!-- Quickly loads up some html, which contains forms -->
				<script type='text/javascript'>
				$(document).ready(function() {

					$("#checklist").load("user_activity/checklist.html");
					$("#rss").load("user_activity/rss.html");
					$("#children").load("user_activity/children.html");
					$("#tips").load("user_activity/tips.html");
					$("#favorites").load("user_activity/favorites.html");
					$("#users").load("user_activity/users.html");
					$("#events").load("user_activity/events.html");
				});
				</script>
				
				<!-- Just something cute... -->
				<div class="construction"></div>
				
			</div>
			
			<!-- Footer info -->
			<div id="footer">
				
				<div id="timestamp">
					<p>Updated June 27, 2013</p>
				</div>
				
				
				
			</div>

		</div>

	</body>


</html>