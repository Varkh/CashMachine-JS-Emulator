"use strict";

function GeneralView(core) {
	var numbers = $(".number");

	for (var i = 0; i < numbers.length; i++) {
		
		numbers[i].onclick = function(event) {
			core = event.target.textContent;
			console.log(core);
		}
	}
}
