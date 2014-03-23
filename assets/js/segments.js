var Now = {
	
	init: function(){
		this.canvasSize = window.innerWidth > window.innerHeight ? window.innerHeight : window.innerWidth;
		
		var canvasContainer = document.getElementById('canvasContainer');
		window.canvas = document.getElementById('c');
		window.ctx = canvas.getContext('2d');
		canvas.width = this.canvasSize;
		canvas.height = this.canvasSize;
		
		canvasContainer.style.width = this.canvasSize + 'px';
		canvasContainer.style.height = this.canvasSize + 'px';
		
		ctx.translate(0, canvas.height);
		ctx.rotate(this.radian(-90) );

		return this;
	},

	draw: function(){
		this.drawSegments(this.daySegments(), 29.5, .5);
		this.drawSegments(this.workSegments(), 28, .5);
		
		this.drawSegments(this.weekSegments(), 49.5, 1.5);
		this.drawSegments(this.monthSegments(), 69.5, 1.5);
		this.drawSegments(this.yearSegments(), 89.5, 1.5);
	},

	daySegments: function(){
		return jsgradient.generateGradient('#17C9FF', '#FF9124', 24);
	},

	weekSegments: function(){
		return jsgradient.generateGradient('#17C9FF', '#FF9124', 7);
	},

	monthSegments: function(){
		var days = this.daysInMonth( new Date().getMonth() );
		return jsgradient.generateGradient('#17C9FF', '#FF9124', days);
	},

	yearSegments: function(){
		var months = [], colors = [], allColors = [];
		
		colors[0] = jsgradient.generateGradient('#D6EEFF', '#A2E01B', 4);
		colors[1] = jsgradient.generateGradient('#A2E01B', '#FADD1E', 2);
		colors[2] = jsgradient.generateGradient('#FADD1E', '#BF7206', 2);
		colors[3] = jsgradient.generateGradient('#BF7206', '#D6EEFF', 4);

		// Concatinate all the arrays
		allColors = allColors.concat(colors[0], colors[1], colors[2], colors[3]);

		// Loop over months and set colors and sizes
		for(var i=0; i<12; i++){
			months.push([
				allColors[i],
				this.fractionToDegree(this.daysInMonth(i+1), 365)
			]);
		}
		return months;
	},

	workSegments: function(){
		var times = {
			wake: 16,
			workStart: 18,
			workEnd: 35,
			sleep: 46
		}

		var colors = {
			sleep: '#132A4F',
			free: '#17C9FF',
			work: '#FF9124',
		}

		var segments = new Array(48);
		for(var i = 0; i < 48; i++){
			if(i >= times.wake && i < times.workStart){
				segments[i] = colors.free;
			}
			else if(i >= times.workStart && i < times.workEnd){
				segments[i] = colors.work;
			}
			else if(i >= times.workEnd && i < times.sleep){
				segments[i] = colors.free;
			}
			else{
				segments[i] = colors.sleep;
			}
		}
		return segments;
	},

	skySegments: function(sunrise, sunset){
		var segments = [];
		var sunrise = sunrise * 2;
		var sunset = sunset * 2;
		for(var i=0; i < 48; i++){
			var color = '#000';
			
			// Pre sunrise, post sunset
			if(i == (sunrise-1) || i == (sunset+1)){
				color = '#5C3605';
			}

			// Sunrise, sunset
			if(i == sunrise || i == sunset ){
				color = '#F7900A';	
			}

			// Post sunrise, pre sunset
			if(i == (sunrise+1) || i == (sunset-1)){
				color = '#658F81';
			}

			// Blue sky
			if(i > (sunrise+1) && i < (sunset-1)){
				color = '#2465FF';
			} 

			segments.push(color);
		}
		return segments;
	},

	// Draw a segment of an arc
	drawSegment: function(radius, start, end, color, line){
		var x = y = this.canvasSize / 2;
		var size = ((this.canvasSize / 100) * radius) / 2;
		var line = line != undefined ? line : 1;
		var lineWidth = (this.canvasSize / 100) * line;
		
		ctx.beginPath();
		ctx.arc(x, y, size, this.radian(start), this.radian(end), false);
		ctx.lineWidth = lineWidth;
		ctx.strokeStyle = color;
		ctx.stroke();
	},

	// Draw an array of colors as segments of an arc
	drawSegments: function(segments, radius, width){
		var i, l = segments.length;
		var start = 0, end = 0;
		var gap = 1.3 - (radius / 130);

		for(i=0; i < l; i++){
			var segment = segments[i];	

			if( typeof segment == 'object' ){
				end	= start + segment[1];
				color = segment[0];
			} else {
				start = (360/l) * i;
				end = (360/l) * (i+1);
				color = segment;
			}

			this.drawSegment(radius, start+(gap/2), end-(gap/2), color, width);

			start = end;
		}
	},

	// return the number of days in the specified month for the current year
	daysInMonth: function(month) {
		var year = new Date().getFullYear();
	    return new Date(year, month, 0).getDate();
	},

	// Convert a fraction (a from b) into a degree for use in the wheel
	fractionToDegree: function(a, b){
		return (360 / 100) * ((100 / b) * a);
	},

	// Convert degree to radian
	radian: function(degrees){
		return degrees * (Math.PI / 180);
	}
}