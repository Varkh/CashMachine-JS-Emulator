"use strict";

function GeneralView(core) {
	$('.number-buttons .number').click(function(e) {
		core.onNumBtnClick($(e.target).text());
	});
	var $ctrl = $('.control-buttons');
	$ctrl.find('#cancel').click(core.onCancelBtnClick);
	$ctrl.find('#clear').click(core.onClearBtnClick);
	$ctrl.find('#submit').click(core.onSubmitBtnClick)
}
