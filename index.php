<?php

function decimal_to_time($decimal) {
 	$hours = floor($decimal);
 	$minutes = (($decimal * 60) - floor($hours) * 60);
 	return str_pad($hours, 2, "0", STR_PAD_LEFT) . ':' . str_pad($minutes, 2, "0", STR_PAD_LEFT);
}

?>
<!doctype html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="description" content="A simple display to show you at what point you are in the current day, week, month and year." />
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

	Inspired by 'now' by the brilliant Randall Munroe -> https://xkcd.com/now/
	
	********************************************************************************************************-->
	<script src="assets/js/analytics.js"></script>
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
		<div id="optionsContainer">
			<form action="">
				<fieldset>
					<div class="field">
						<label for="in-show-work">Show work</label>
						<input type="checkbox" name="show-work">
					</div>
					<div class="field">
						<label for="in-show-sky">Show sky</label>
						<input type="checkbox" name="show-sky">
					</div>
				</fieldset>
				<fieldset>
					<div class="field">
						<label for="in-wake">Wake</label>
						<select name="wake" id="in-wake">
							<?php for($i = 1; $i < 49; $i++): ?>
								<option value="<?php echo $i / 2 ?>"><?php echo decimal_to_time($i / 2) ?></option>
							<?php endfor ?>
						</select>
					</div>
					<div class="field">
						<label for="in-start-work">Start work</label>
						<select name="start-work" id="in-start-work">
							<?php for($i = 1; $i < 49; $i++): ?>
								<option value="<?php echo $i / 2 ?>"><?php echo decimal_to_time($i / 2) ?></option>
							<?php endfor ?>
						</select>
					</div>
					<div class="field">
						<label for="in-end-work">Finish work</label>
						<select name="end-work" id="in-end-work">
							<?php for($i = 1; $i < 49; $i++): ?>
								<option value="<?php echo $i / 2 ?>"><?php echo decimal_to_time($i / 2) ?></option>
							<?php endfor ?>
						</select>
					</div>
					<div class="field">
						<label for="in-sleep">Sleep</label>
						<select name="sleep" id="in-sleep">
							<?php for($i = 1; $i < 49; $i++): ?>
								<option value="<?php echo $i / 2 ?>"><?php echo decimal_to_time($i / 2) ?></option>
							<?php endfor ?>
						</select>
					</div>
				</fieldset>
			</form>
		</div>
	</div>
	<!--<script src="assets/js/jsGradient.js"></script>
	<script src="assets/js/segments.js"></script>
	<script src="assets/js/markers.js"></script>
	<script src="assets/js/labels.js"></script>
	<script src="assets/js/sun.js"></script>
	<script src="assets/js/touch.js"></script>-->
	<script src="assets/js/options.js"></script>
	<!--<script src="assets/js/main.js"></script>-->
</body>
</html>