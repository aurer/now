
// Setup the canvas
window.canvas = document.getElementById('c');
window.context = canvas.getContext('2d');

// Set the canvas size
scale = window.innerWidth > window.innerHeight ? window.innerHeight : window.innerWidth;
canvas.width = scale;
canvas.height = scale;


// offset context centre then rotate 90deg
context.translate(0, canvas.height);
context.rotate(radian(-90) );

var day = function(){
	return jsgradient.generateGradient('#C552FF', '#00F4FF', 24);
}

var week = function(){
	return jsgradient.generateGradient('#00F4FF', '#0CE87D', 7);
}

var month = function(){
	var days = daysInMonth( new Date().getMonth() );
	return jsgradient.generateGradient('#0CE87D', '#9FE80C', days);
}

var year = function(){
	var months = [],
		colors = [];
	colors[0] = jsgradient.generateGradient('#D6EEFF', '#A2E01B', 4);
	colors[1] = jsgradient.generateGradient('#A2E01B', '#FADD1E', 2);
	colors[2] = jsgradient.generateGradient('#FADD1E', '#BF7206', 2);
	colors[3] = jsgradient.generateGradient('#BF7206', '#D6EEFF', 4);

	var allColors = [];
	allColors = allColors.concat(colors[0], colors[1], colors[2], colors[3]);

	for(var i=0; i<12; i++){
		months.push([
			allColors[i],
			fractionToDegree(daysInMonth(i+1), 365)
		]);
	}
	return months;
}

// return the number of days in the specified month for the current year
function daysInMonth(month) {
	var year = new Date().getFullYear();
    return new Date(year, month, 0).getDate();
}

// Convert a fraction (a from b) into a degree for use in the wheel
function fractionToDegree(a, b){
	return (360 / 100) * ((100 / b) * a);
}

// Convert degree to radian
function radian(degrees){
	return degrees * (Math.PI / 180);
}

// Draw a segment of an arc
function drawSegment(radius, start, end, color, line){
	var x = y = scale / 2;
	var size = ((scale / 100) * radius) / 2;
	var line = line != undefined ? line : 1;
	var lineWidth = (scale / 100) * line;
	
	context.beginPath();
	context.arc(x, y, size, radian(start), radian(end), false);
	context.lineWidth = lineWidth;
	context.strokeStyle = color;
	context.stroke();
}

// Draw an array of colors as segments of an arc
function drawSegments(segments, radius){
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

		drawSegment(radius, start+(gap/2), end-(gap/2), color);

		start = end;
	}
}

var writeText = function(text, angle, radius, color, fontSize){
	var x = y = scale / 2;
	var size = ((scale / 100) * radius) / 2;
	text = text.toString();
	var wordwidth = 4 * text.length;

	var color = color || '#fff';
	var fontSize = fontSize || 10;

	context.save();
	context.translate(x,y);
	context.rotate( radian(90 + angle) );
	context.translate(-wordwidth, -size);
	context.font = fontSize+'px sans-serif';
	context.fillStyle = color;
	context.fillText(text, 0, 0);
	context.restore();
};

var drawDot = function(angle, radius){
	var x = y = scale / 2;
	var size = ((scale / 100) * radius) / 2;
	context.save();
	context.translate(x,y);
	context.rotate( radian(90 + angle) );
	context.translate(-2, -size);
	// context.fillStyle = '#0A84FF';
	context.fillStyle = '#f00';
	
	context.beginPath();
    context.arc(0, 0, 4, 0, 2 * Math.PI, false);
    context.fill();

	context.restore();
};


// Draw these items
drawSegments(day(), 30);
drawSegments(week(), 50);
drawSegments(month(), 70);
drawSegments(year(), 90);


// Show a marker for each time period
var Markers = {
	
	draw: function(){
		this.showYear();
		this.showMonth();
		this.showWeek();
		this.showDay();
	},

	showYear: function(){
		var today = new Date();
		var first = new Date(today.getFullYear(), 0, 1);
		var dayOfTheYear = Math.round(((today - first) / 1000 / 60 / 60 / 24) + .5, 0);
		var dayOfTheYearPercentage = (100 / 365 ) * dayOfTheYear;
		var pos = (365 / 100) * dayOfTheYearPercentage;
		pos -= .2; // Remove a fraction to account for the width of the marker
		drawDot(pos, 92.4);
	},

	showMonth: function(){
		var today = new Date().getDate();
		var days_in_month = daysInMonth( new Date().getMonth());
		var hours_in_month = 24 * days_in_month;
		var hour_of_day = new Date().getHours();
		var added_hours = fractionToDegree(hour_of_day, hours_in_month);
		var pos = fractionToDegree(today - 1, days_in_month);
		pos = pos + added_hours;
		pos -= .2; // Remove a fraction to account for the width of the marker
		drawDot(pos, 72.4);
	},

	showWeek: function(){
		var day_of_week = new Date().getDay();
		var days_in_week = 7;
		var hours_in_week = 24 * days_in_week;
		var hour_of_day = new Date().getHours();
		var added_hours = fractionToDegree(hour_of_day, hours_in_week);
		var pos = fractionToDegree(day_of_week - 1, days_in_week);
		pos = pos + added_hours;
		pos -= .2; // Remove a fraction to account for the width of the marker
		drawDot(pos, 52.4);
	},

	showDay: function(){
		var minutes_in_day = 60 * 24;
		var hour = new Date().getHours();
		var minute = (60 * hour) + new Date().getMinutes();
		var pos = fractionToDegree(minute, minutes_in_day);
		pos += 0.5; // Add a fraction
		drawDot(pos, 32.4);	
	}
}
Markers.draw();


var Labels = {
	
	draw: function(){
		this.showHoursOfDay();
		this.showDaysOfWeek();
		this.showDaysOfMonth();
		this.showMonthsOfYear();
		this.showLabels();
	},

	showHoursOfDay: function(){
		for(var i =0; i<24; i++){
			writeText(i, fractionToDegree(i, 24) + 8, 27);
		}
	},

	showDaysOfWeek: function(){
		var days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
		for(var i =0; i<7; i++){
			writeText(days[i], fractionToDegree(i, 7) + 27, 47);
		}
	},

	showDaysOfMonth: function(){
		var days_in_month = daysInMonth( new Date().getMonth());
		for(var i =0; i<days_in_month; i++){
			writeText(i, fractionToDegree(i, days_in_month) + 6, 67);
		}
	},

	showMonthsOfYear: function(){
		var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
		for(var i =0; i<months.length; i++){
			writeText(months[i], fractionToDegree(i, months.length) + 15, 87);
		}
	},

	showLabels: function(){
		writeText('Day', 0, 33, '#555', 13);
		writeText('Week', 0, 53, '#555', 13);
		writeText('Month', 0, 73, '#555', 13);
		writeText('Year', 0, 93, '#555', 13);
	}
}
Labels.draw();