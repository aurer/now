var Options = {

	init: function(){
		this.options = {
			show: {
				work: true,
				sky: true
			},
			workTimes: {
				wake: 8,
				startWork: 9,
				endWork: 17,
				sleep: 23
			}
		};
	},
	
	set: function(option, value){
		var optionPath = option.split('.');
		this.options[optionPath[0]][optionPath[1]] = value;
	},

	get: function(option){
		var optionPath = option.split('.');
		return this.options[optionPath[0]][optionPath[1]];
	}
}

Options.init();
Options.set('show.work', true);