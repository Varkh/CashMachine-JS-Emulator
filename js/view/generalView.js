"use strict";

function GeneralView(core) {
	
	var numbers = $(".numbers");
	
	numbers.onclick(function(event) {
		var pushedButton = event.target.value;
		core.value = pushedButton.value;
	});
}