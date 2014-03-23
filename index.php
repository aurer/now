<!doctype html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Now</title>
	<link href='http://fonts.googleapis.com/css?family=Oxygen:300' rel='stylesheet' type='text/css'>
	<link rel="stylesheet" href="assets/css/main.css">
	
	<!--*******************************************************************************************************
		
			 ________   ________  ___       __   ___       
			|\   ___  \|\   __  \|\  \     |\  \|\  \      
			\ \  \\ \  \ \  \|\  \ \  \    \ \  \ \  \     
			 \ \  \\ \  \ \  \\\  \ \  \  __\ \  \ \  \    
			  \ \  \\ \  \ \  \\\  \ \  \|\__\_\  \ \__\   
			   \ \__\\ \__\ \_______\ \____________\|__|   
			    \|__| \|__|\|_______|\|____________|   ___ 
			                                          |\__\
			                                          \|__|
	                                        
	A simple display to show you at what point you are in the current day, week, month and year. 

	Inspired by 'now' by the brilliant Randall Munroe -> https://xkcd.com/now/
	
	********************************************************************************************************-->
</head>
<body>
	<div class="page">
		
		<div id="canvasContainer">
			<h1>Now</h1>
			<canvas id="markers">
				<p>This page does not load for you.</p>
				<p>You get nothing.</p>
				<p>You lose.</p>
				<p>Good day sir.</p>
			</canvas>
			<canvas id="c"></canvas>
			<canvas id="labels"></canvas>
		</div>
	</div>
	<script src="assets/js/jsGradient.js"></script>
	<script src="assets/js/segments.js"></script>
	<script src="assets/js/markers.js"></script>
	<script src="assets/js/labels.js"></script>
	<script src="assets/js/main.js"></script>
	<script>
	  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
	  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
	  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
	  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

	  ga('create', 'UA-31871536-1', 'aurer.co.uk');
	  ga('send', 'pageview');

	</script>
</body>
</html>