var Sun = {
	init: function(){
		this.bindEvents();
		return this;
	},

	bindEvents: function(){

	},

	draw: function(){
		this.locate();
	},

	locate: function(){
		navigator.geolocation.getCurrentPosition(function(a){
			var lat = a.coords.latitude;
			var lng = a.coords.longitude;
			var request = new XMLHttpRequest();
			request.onload = Sun.onLocate;
			request.open('get', '/sun.php?lat=' + lat + '&lng=' + lng, true);
			request.send();
		});
	},

	onLocate: function(){
		var times = JSON.parse(this.response);
		var sunrise = times.sunrise;
		var sunset = times.sunset;
		Segments.drawSegments(Segments.skySegments(sunrise, sunset), 26.5, .5);
	}
}