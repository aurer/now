var fadeOut = function(element, callback){
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
	}
	setTimeout(step, 0);
}

var fadeIn = function(element, callback){
	var opacity = 0;

	if( element.style.display !== 'none' && window.getComputedStyle(element).getPropertyValue('display') ){
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
	}
	setTimeout(step, 0);
}

var toggleClass = function(element, className){
	var currentClass = element.className;
	var classPattern = RegExp('\\s*' + className + '\\s*', 'gi');

	console.log(classPattern);
	// Element has the class so remove it
	if( currentClass.indexOf(className) > -1 ){
		element.className = currentClass.replace(classPattern, '');
	} else {
		element.className = currentClass + ' ' + className;
	}
}