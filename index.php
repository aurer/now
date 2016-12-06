<?php include 'asset.php' ?>
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
	<script src="assets/js/analytics.js"></script>
</head>
<body class="body">
<div id="options">
	<h2>Options</h2>
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
<div class="page">
	<div id="options-handle">
		<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
		 width="31px" height="30px" viewBox="0 0 31 30" style="enable-background:new 0 0 31 30;" xml:space="preserve">
		<g>
			<path d="M15.604,25.217l-5.563,4.586l-6.205-4.479l2.816-6.615l-6.313-4.071l2.229-7.166l7.512,0.726l1.841-7.558l7.353-0.026
				l1.852,7.587l7.607-0.712l2.216,7.065l-6.399,4.153l2.834,6.708l-6.179,4.405L15.604,25.217L15.604,25.217z M20.775,17.55
				l6.601-4.282l-0.797-2.539l-7.773,0.728L16.9,3.647l-2.6,0.009l-1.902,7.805l-7.671-0.742L3.91,13.342l6.524,4.208l-2.869,6.737
				l2.352,1.698l5.684-4.685l5.733,4.711l0,0l2.32-1.653L20.775,17.55z"/>
		</g>
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

<script>
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-31871536-2', 'auto');
  ga('send', 'pageview');
</script>

</body>
</html>
