function fadeOut(element, callback){
	var opacity = 1;
	
	if( element.style.display === 'none' ){
		return;
	}

	function step(){
		element.style.opacity = opacity -= 0.15;
		if( opacity > 0){
			setTimeout(step, 20);
		} else {
			element.style.opacity = null;
			element.style.display = 'none';
			if( typeof callback == 'function' ){
				callback();
			}
		}
		console.log(opacity);
	}
	setTimeout(step, 0);
}

function fadeIn(element, callback){
	var opacity = 0;

	if( element.style.display !== 'none' ){
		return;
	}

	function step(){
		element.style.display = 'block';
		element.style.opacity = opacity += 0.15;
		if( opacity < 1){
			setTimeout(step, 20);
		} else {
			element.style.opacity = null;
			if( typeof callback == 'function'){
				callback();
			}
		}
		console.log(opacity);
	}
	setTimeout(step, 0);
}