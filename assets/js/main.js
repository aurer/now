// Setup the canvas

// Draw the main infogram
Now.init().draw();

// Draw the labels
Labels.init().draw();

// Draw the markers
Markers.init().draw();

// Refresh the markers every 2 seconds
setInterval(function(){
	Markers.draw();
}, 2000);


navigator.geolocation.getCurrentPosition(function(a){
	var lat = a.coords.latitude;
	var lng = a.coords.longitude;
	
	var request = new XMLHttpRequest();
	request.onload = reqListener;
	request.open('get', '/sun.php?lat=' + lat + '&lng=' + lng, true);
	request.send();
});


function reqListener () {
	var times = JSON.parse(this.response);
	var sunrise = times.sunrise;
	var sunset = times.sunset;
	Now.drawSegments(Now.skySegments(sunrise, sunset), 26.5, .5);
}

window.addEventListener('load', function(){ // on page load
 	var labels = document.getElementById('labels');
	document.body.addEventListener('touchstart', function(e){
  		document.body.className = 'touched';
	}, false);

	document.body.addEventListener('touchend', function(e){
  		document.body.className = '';
	}, false);
 
}, false)
