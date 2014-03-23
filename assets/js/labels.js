var Labels = {
	
	init: function(){
		this.canvas = document.getElementById('labels');
		this.ctx = this.canvas.getContext('2d');
		this.canvasSize = window.innerWidth > window.innerHeight ? window.innerHeight : window.innerWidth;
		this.canvas.width = this.canvasSize;
		this.canvas.height = this.canvasSize;
		this.ctx.translate(0, canvas.height);
		this.ctx.rotate(Segments.radian(-90) );
		return this;
	},

	draw: function(){
		this.showHoursOfDay();
		this.showDaysOfWeek();
		this.showDaysOfMonth();
		this.showMonthsOfYear();
		this.showLabels();
	},

	showHoursOfDay: function(){
		for(var i =0; i<24; i++){
			this.writeText(i.toString(), Segments.fractionToDegree(i, 24) + 8, 22);
		}
	},

	showDaysOfWeek: function(){
		var days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
		for(var i =0; i<7; i++){
			this.writeText(days[i], Segments.fractionToDegree(i, 7) + 27, 46);
		}
	},

	showDaysOfMonth: function(){
		var days_in_month = Segments.daysInMonth( new Date().getMonth());
		for(var i = 0; i<days_in_month; i++){
			this.writeText((i + 1).toString(), Segments.fractionToDegree(i, days_in_month) + 6, 66);
		}
	},

	showMonthsOfYear: function(){
		var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
		for(var i =0; i<months.length; i++){
			this.writeText(months[i], Segments.fractionToDegree(i, months.length) + 15, 86);
		}
	},

	showLabels: function(){
		this.writeText('Day', 0, 35, 'rgba(255, 255, 255, 0.3)', 13);
		this.writeText('Week', 0, 53, 'rgba(255, 255, 255, 0.3)', 13);
		this.writeText('Month', 0, 73, 'rgba(255, 255, 255, 0.3)', 13);
		this.writeText('Year', 0, 93, 'rgba(255, 255, 255, 0.3)', 13);
	},

	writeText: function(text, angle, radius, color, fontSize){
		var ctx = this.ctx;
		var x = y = this.canvasSize / 2;
		var size = ((this.canvasSize / 100) * radius) / 2;
		var wordwidth = 4 * text.length;
		var color = color || 'rgba(255, 255, 255, 0.8)';
		var fontSize = fontSize || 10;
		text = text.toString();

		ctx.save();
		
		ctx.translate(x,y);
		ctx.rotate( Segments.radian(90 + angle) );
		ctx.translate(-wordwidth, -size);
		ctx.font = fontSize+'px sans-serif';
		ctx.fillStyle = color;
		ctx.fillText(text, 0, 0);
		
		ctx.restore();
	}
}