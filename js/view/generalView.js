"use strict";

function GeneralView(core) {
	
	var numbers = $(".number");
	
	numbers.onclick(function(event) {
		var pushedButton = event.target.value;
		core.value = pushedButton.value;
	});
}