"use strict";

function DisplayView() {
	var $display = $('#display');

	this.showMessage = function(text) {
		$display.html(createTitle(text));
	};

	this.showInput = function(text, inputValue, hide) {
		$display
			.empty()
			.append(createTitle(text))
			.append(createInput(inputValue, hide));
	};

	function createTitle(text) {
		return $('<DIV>').text(text);
	}

	function createInput(value, hide) {
		return $('<input>')
			.addClass('addedInput')
			.val(value)
			.prop('readonly', true)
			.prop('type', hide ? 'password' : 'text');
	}

	buttonInitialization();

	function buttonInitialization() {
	    var displayButtons = document.getElementsByClassName("empty");
	    var displaySpace = document.getElementById("display");
	    
	    for (var i = 0; i < displayButtons.length; i++) {
	    	displayButtons[i].textContent = i + 1;
	    	displayButtons[i].onclick = function(event) {
				var entered = event.target.textContent;
				displaySpace.textContent = entered + " option selected";
			}
		}
	}
}
