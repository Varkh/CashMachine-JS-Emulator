"use strict";

function GeneralView(core) {
	$('.number-buttons .number').click(function(e) {
		core.onNumBtnClick($(e.target).text());
	});
	var $ctrl = $('.control-buttons');
	$ctrl.find('#cancel').click(core.onCancelBtnClick);
	$ctrl.find('#clear').click(core.onClearBtnClick);
	$ctrl.find('#submit').click(core.onSubmitBtnClick)

<<<<<<< HEAD
	for (var i = 0; i < numbers.length; i++) {
		
		numbers[i].onclick = function(event) {
			core = event.target.innerText;
			console.log(core);
		}
	}
=======
>>>>>>> af25249cf693e193c1f82f9b488c1ba4fe65207f
}
