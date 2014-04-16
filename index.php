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
			<canvas id="segments"></canvas>
			<canvas id="labels"></canvas>
		</div>
		<div id="optionsContainer">
			<form action="">
				<fieldset>
					<div class="field">
						<label for="in-show-sky">Show sky</label>
						<input type="checkbox" name="show-sky" id="in-show-sky">
					</div>
					<div class="field">
						<label for="in-show-work">Show work</label>
						<input type="checkbox" name="show-work" id="in-show-work">
					</div>
				</fieldset>
				<fieldset id="worktimes">
					<div class="field">
						<label for="in-workTimes-wake">Wake</label>
						<select name="workTimes-wake" id="in-workTimes-wake">
							<?php for($i = 1; $i < 49; $i++): ?>
								<option value="<?php echo $i / 2 ?>"><?php echo decimal_to_time($i / 2) ?></option>
							<?php endfor ?>
						</select>
					</div>
					<div class="field">
						<label for="in-workTimes-startWork">Start work</label>
						<select name="workTimes-startWork" id="in-workTimes-startWork">
							<?php for($i = 1; $i < 49; $i++): ?>
								<option value="<?php echo $i / 2 ?>"><?php echo decimal_to_time($i / 2) ?></option>
							<?php endfor ?>
						</select>
					</div>
					<div class="field">
						<label for="in-workTimes-endWork">Finish work</label>
						<select name="workTimes-endWork" id="in-workTimes-endWork">
							<?php for($i = 1; $i < 49; $i++): ?>
								<option value="<?php echo $i / 2 ?>"><?php echo decimal_to_time($i / 2) ?></option>
							<?php endfor ?>
						</select>
					</div>
					<div class="field">
						<label for="in-workTimes-sleep">Sleep</label>
						<select name="workTimes-sleep" id="in-workTimes-sleep">
							<?php for($i = 1; $i < 49; $i++): ?>
								<option value="<?php echo $i / 2 ?>"><?php echo decimal_to_time($i / 2) ?></option>
							<?php endfor ?>
						</select>
					</div>
				</fieldset>
			</form>
		</div>
	</div>
	<div id="canvases">
		<h1>Now</h1>
		<canvas id="markers">
			<p>This page does not load for you.</p>
			<p>You get nothing.</p>
			<p>You lose.</p>
			<p>Good day sir.</p>
		</canvas>
		<canvas id="segments"></canvas>
		<canvas id="labels"></canvas>
	</div>
</div>

<?php echo Asset::script('assets/build/main.js', array(
	'assets/js/jsGradient.js',
	'assets/js/effects.js',
	'assets/js/segments.js',
	'assets/js/markers.js',
	'assets/js/labels.js',
	'assets/js/sun.js',
	'assets/js/touch.js',
	'assets/js/options.js',
	'assets/js/main.js',
)); ?>
</body>
</html>