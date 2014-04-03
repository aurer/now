var Markers = {

	init: function(){
		this.canvasSize = window.innerWidth > window.innerHeight ? window.innerHeight : window.innerWidth;
		this.canvas = document.getElementById('markers');
		this.ctx = this.canvas.getContext('2d');
		this.canvas.width = this.canvasSize;
		this.canvas.height = this.canvasSize;
		this.ctx.translate(0, this.canvas.height);
		this.ctx.rotate(Segments.radian(-90) );
		return this;
	},
	
	draw: function(){
		this.clear();
		this.showYear();
		this.showMonth();
		this.showWeek();
		this.showDay();
	},

	clear: function(){
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
	},

	showYear: function(){
		var today = new Date();
		var first = new Date(today.getFullYear(), 0, 1);
		var dayOfTheYear = Math.round(((today - first) / 1000 / 60 / 60 / 24) + .5, 0);
		var dayOfTheYearPercentage = (100 / 365 ) * dayOfTheYear;
		var pos = (365 / 100) * dayOfTheYearPercentage;
		this.drawIndicator(pos, 90);
	},

	showMonth: function(){
		var today = new Date().getDate();
		var days_in_month = Segments.daysInMonth( new Date().getMonth());
		var hours_in_month = 24 * days_in_month;
		var hour_of_day = new Date().getHours();
		var added_hours = Segments.fractionToDegree(hour_of_day, hours_in_month);
		var pos = Segments.fractionToDegree(today - 1, days_in_month);
		pos = pos + added_hours;
		this.drawIndicator(pos, 70);
	},

	showWeek: function(){
		var day_of_week = new Date().getDay();
		var days_in_week = 7;
		var hours_in_week = 24 * days_in_week;
		var hour_of_day = new Date().getHours();
		var added_hours = Segments.fractionToDegree(hour_of_day, hours_in_week);
		var pos = Segments.fractionToDegree(day_of_week - 1, days_in_week);
		pos = pos + added_hours;
		this.drawIndicator(pos, 50);
	},

	showDay: function(){
		var minutes_in_day = 60 * 24;
		var hour = new Date().getHours();
		var minute = (60 * hour) + new Date().getMinutes();
		var pos = Segments.fractionToDegree(minute, minutes_in_day);
		this.drawIndicator(pos, 30);	
	},

	drawIndicator: function(angle, radius){
		var x = y = this.canvasSize / 2;
		var size = ((this.canvasSize / 100) * radius) / 2;
		var ctx = this.ctx;
		var markerStyle = 'arrow';
		
		// Run the style
		this[markerStyle](ctx, x, y, angle, size);
		//this.segment(ctx, x, y, angle, size);
	},

	arrow: function(ctx, x, y, angle, size){
		ctx.save();
		
		ctx.translate(x,y);
		ctx.rotate( Segments.radian(90 + angle) );
	    ctx.translate(0, -(size + 15));
	    ctx.fillStyle = '#0A84FF';
	    ctx.beginPath();
	    ctx.moveTo(-6, -6);
	    ctx.lineTo(0, -3);
	    ctx.lineTo(6, -6);
	    ctx.lineTo(0, 6);
	    ctx.fill();

		ctx.restore();
	},

	line: function(ctx, x, y, angle, size){
			ctx.save();

			ctx.translate(x,y);
			ctx.rotate( Segments.radian(90 + angle) );
		    ctx.translate(-2, -size - 10);
		    ctx.beginPath();
		    ctx.moveTo(0, 20);
		    ctx.lineWidth = 2;
		    ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
		    ctx.lineTo(2, size+10);
		    ctx.stroke();	
			
			ctx.restore();
	},

	segment: function(ctx, x, y, angle, size){
			ctx.save();

			ctx.moveTo(x,y);
			ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
			ctx.beginPath();
			ctx.arc(x, y, size, 0, Segments.radian( angle) );
			ctx.lineTo(x,y);
			ctx.fill();
			
			ctx.restore();
	}
}