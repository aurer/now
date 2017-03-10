var App = {
	progressElements: [],
	segmentElements: [],

	init: function() {
		this.svg = document.querySelector('svg.clock');
		this.setSize();
		this.addProps();
		this.setupCircles();
		this.setupSegments();
		this.setTimouts();
		this.enableDisplayOptions();
		this.updateMinute();
		this.updateHour();
		this.updateDay();
		this.updateWeek();
		this.updateMonth();
		this.updateYear();
	},

	addProps: function() {
		SVGElement.prototype.circumference = function() {
			return (this.getAttribute('r') * 2) * Math.PI;
		}
	},

	setupCircles: function() {
		this.svg.querySelectorAll('circle').forEach(function(circle) {
			var className = circle.getAttribute('class');

			// Add progress circle
			var progress = circle.cloneNode(true);
			progress.setAttribute('stroke-dasharray', circle.circumference());
			progress.setAttribute('stroke-dashoffset', circle.circumference());
			progress.setAttribute('class', className + ' progress');
			App.progressElements[className] = App.svg.appendChild(progress);

			// Add segments circle
			var segment = circle.cloneNode(true);
			segment.setAttribute('class', className + ' segments');
			App.segmentElements[className] = App.svg.appendChild(segment);
		});
	},

	setupSegments: function() {
		function calculateSegments(element) {
			var circle = App.segmentElements[element];
			var date = new Date();
			var segmentCounts = {
				minute: 60,
				hour: 60,
				day: 24,
				week: 7,
				month: new Date(date.getFullYear(), date.getMonth(), 0).getDate(),
				year: 12
			}

			return (circle.getAttribute('r') * 2 * Math.PI ) / segmentCounts[element] - 1;
		}

		this.segmentElements.minute.setAttribute('stroke-dasharray', '1 ' + calculateSegments('minute'));
		this.segmentElements.hour.setAttribute('stroke-dasharray', '1 ' + calculateSegments('hour'));
		this.segmentElements.day.setAttribute('stroke-dasharray', '1 ' + calculateSegments('day'));
		this.segmentElements.week.setAttribute('stroke-dasharray', '1 ' + calculateSegments('week'));
		this.segmentElements.month.setAttribute('stroke-dasharray', '1 ' + calculateSegments('month'));
		this.segmentElements.year.setAttribute('stroke-dasharray', '1 ' + calculateSegments('year'));
	},

	setSize: function() {
		var y = window.innerHeight;
		var x = window.innerwidth;
		var max = x > y ? x : y;
		this.svg.setAttribute('height', max-20);
		this.svg.setAttribute('width', max-20);
	},

	enableDisplayOptions: function() {
		var toggleDetails = function() {
			App.svg.classList.toggle('hide-details');
		}
		setTimeout(toggleDetails, 2000);

		document.body.onclick = toggleDetails;
		document.body.ontouchend = toggleDetails;
	},

	updateMinute: function() {
		var circle = this.progressElements.minute;
		var second = new Date().getSeconds();
		var pos = second / 60 * 100;
		var offset = circle.circumference() - (circle.circumference() / 100) * pos;
		circle.setAttribute('stroke-dashoffset', offset);
		if (pos == 0) {
			circle.setAttribute('data-ending', true);
		} else {
			circle.removeAttribute('data-ending');
		}
	},

	updateHour: function() {
		var hour = this.progressElements.hour;
		var now = new Date();
		var minutesInHour = 60;
		var minute = now.getMinutes();
		var second = now.getSeconds();
		minute += (second/60);
		var pos = (minute / minutesInHour) * 100;
		hour.setAttribute('stroke-dasharray', hour.circumference());
		hour.setAttribute('stroke-dashoffset', hour.circumference() - (hour.circumference()/100) * pos);
	},

	updateDay: function() {
		var circle = this.progressElements.day;
		var minutesInDay = 60 * 24;
		var hour = new Date().getHours();
		var minute = (60 * hour) + new Date().getMinutes();
		var pos = minute / minutesInDay * 100;
		circle.setAttribute('stroke-dasharray', circle.circumference());
		circle.setAttribute('stroke-dashoffset', circle.circumference() - (circle.circumference()/100) * pos);
	},

	updateWeek: function() {
		var circle = this.progressElements.week;
		var date = new Date();
		var dayOfWeek = new Date().getDay();
		var hours = date.getHours();
		var minutes = new Date().getMinutes() / 60;
		var hourInWeek = ( (hours + minutes) / (7*24) * 100 );
		var pos = dayOfWeek / 7 * 100 + hourInWeek;
		circle.setAttribute('stroke-dasharray', circle.circumference());
		circle.setAttribute('stroke-dashoffset', circle.circumference() - (circle.circumference()/100) * pos);
	},

	updateMonth: function() {
		var circle = this.progressElements.month;
		var date = new Date();
		var today = date.getDate();
		var daysInMonth = new Date(date.getYear(), date.getMonth(), 0).getDate();
		var hours = date.getHours();
		var hoursInDay = hours / 24;
		var pos = (today+hoursInDay) / daysInMonth * 100;
		circle.setAttribute('stroke-dasharray', circle.circumference());
		circle.setAttribute('stroke-dashoffset', circle.circumference() - (circle.circumference()/100)*pos );
	},

	updateYear: function() {
		var circle = this.progressElements.year;
		var today = new Date();
		var first = new Date(today.getFullYear(), 0, 1);
		var dayOfTheYear = Math.round(((today - first) / 1000 / 60 / 60 / 24) + .5, 0);
		var pos = (100 / 365 ) * dayOfTheYear;
		circle.setAttribute('stroke-dasharray', circle.circumference());
		circle.setAttribute('stroke-dashoffset', circle.circumference() - (circle.circumference()/100)*pos );
	},

	setTimouts: function(){
		var date = new Date();
		var seconds = date.getSeconds();
		var secondsUntilNextMinute = (60 - seconds) * 1000;

		// Update every second
		setInterval(this.updateMinute.bind(this), 1000);
		setInterval(this.updateHour.bind(this), 1000);

		// Update every minute
		setTimeout(function(){
			setInterval(function(){
				App.updateDay();
				App.updateWeek();
				App.updateMonth();
				App.updateYear();
			}, 60000);

			App.updateDay();
			App.updateWeek();
			App.updateMonth();
			App.updateYear();
		}, secondsUntilNextMinute);
	}
}

App.init();
