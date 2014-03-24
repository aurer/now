var Touch = {
	init: function(){
		window.addEventListener('load', function(){ // on page load
		 	var labels = document.getElementById('labels');
			
			document.body.addEventListener('touchstart', function(e){
		  		document.body.className = 'touched';
			}, false);

			document.body.addEventListener('touchend', function(e){
		  		document.body.className = '';
			}, false);
		 
		}, false);
	}
}