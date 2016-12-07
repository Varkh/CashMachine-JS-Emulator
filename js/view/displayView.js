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
	
	this.createMenu=function (val,append) {
		var table=$('<TABLE>');

		for (var i=0;i<4;i++) {
			var tr=($('<tr>'))
			.append($('<td>'))
			.append($('<td>'));
			table.append(tr)
		}

		table.find('td:even').each(
			function (i) {
				if (val instanceof window.Array) {
					$(this).text(val[i]);
				}else {
					$(this).text(val[i+1]);
				}
			});

		table.find('td:odd').each(
			function (i) {
				if (val instanceof window.Array) {
					$(this).text(val[i+4]);
				}else {
					$(this).text(val[i+5]);
				}
			});

		if (!append) {
			$display.html(table);
		} else {
			table.css('margin-top','0px');$display.append(table)
		}
	}

	buttonInitialization();

	function buttonInitialization() {
	    var displayButtons = document.getElementsByClassName("empty");
	    var displaySpace = document.getElementById("display");
	    
	    for (var i = 0; i < displayButtons.length; i++) {
	    	displayButtons[i].textContent = i + 1;
	    	displayButtons[i].onclick = function(event) {
				var entered = event.target.textContent;
				atm.selectMenuBtnClickAction(entered);
			}
		}
	}
}
