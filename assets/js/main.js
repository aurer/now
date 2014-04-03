
// Handle options
Options.init();


// Draw the main infogram
Segments.init();
Segments.draw();


// Draw the labels
Labels.init().draw();

// Draw the markers
Markers.init().draw();

// Refresh the markers every 2 seconds
setInterval(function(){
	Markers.draw();
}, 2000);

// Show the sunrise and sunset segments
Sun.init().draw();

// Enable touch events to show and hide the labels
Touch.init();