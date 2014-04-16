var Options = {

	init: function(){
		this.options = {
			show: {
				work: false,
				sky: false
			},
			workTimes: {
				wake: 8,
				startWork: 9,
				endWork: 17,
				sleep: 23
			}
		};
		this.loadOptions();
		this.bindEvents();
		this.handleWorkTimeDisplay();
		return this;
	},

	bindEvents: function(){
		for(var key in this.options){
			for(var subKey in this.options[key]){
				var elementId = 'in-' + key + '-' + subKey;
				var ele = document.getElementById(elementId);
				ele.onchange = this.handleElementChange;
			}
		}
		document.querySelector('#options-handle').onclick = this.handleOptionsVisibility;
	},

	handleOptionsVisibility: function(){
		var options = document.querySelector('#options');
		toggleClass(document.body, 'panel-open');
	},

	handleElementChange: function(){
		
		var optionName = this.id.replace('in-', '').replace('-', '.');
		var optionValue;
		if( this.type == 'checkbox' ){
			optionValue = this.checked;
		} else {
			optionValue = this.value;
		}
		Options.set(optionName, optionValue);
		Options.handleWorkTimeDisplay();
		Segments.draw();
		Sun.draw();
	},

	handleWorkTimeDisplay: function(){
		var show = document.getElementById('in-show-work').checked;
		var workTimeOptions = document.getElementById('worktimes');
		if(show){
			fadeIn(workTimeOptions);
		} else {
			fadeOut(workTimeOptions);
		}
	},

	saveOptions: function(){
		if (this.options != null) {
			localStorage.setItem('now-options', JSON.stringify(this.options));
		};
	},

	loadOptions: function(){
		var options = JSON.parse( localStorage.getItem('now-options') );
		
		if (options != null) {
			this.options = options;
		};

		for(var key in options){
			for(var subKey in options[key]){
				this.setElement( key + '.' + subKey, options[key][subKey] );
			}
		}
	},

	set: function(option, value){
		var optionPath = option.split('.');
		this.options[optionPath[0]][optionPath[1]] = value;
		this.saveOptions();
	},

	get: function(option){
		var optionPath = option.split('.');
		return this.options[optionPath[0]][optionPath[1]];
	},

	setElement: function(option, value){
		var optionName = option.replace('.', '-');
		var ele = document.getElementById('in-' + optionName);
		if(!ele){
			//console.log('Element with id "in-' + optionName + '" could not be found');
		}
		if(ele.type == 'checkbox'){
			ele.checked = value
		}
		else{
			ele.value = value;
		}
	}
}