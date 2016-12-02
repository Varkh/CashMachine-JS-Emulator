"use strict";

function GeneralView(core) {
	$('.number-buttons .number').click(function() {
		core.onNumBtnClick(this.value);
	});
	var $ctrl = $('.control-buttons');
	$ctrl.find('#cancel').click(core.onCancelBtnClick);
	$ctrl.find('#clear').click(core.onClearBtnClick);
	$ctrl.find('#submit').click(core.onSubmitBtnClick)

}
