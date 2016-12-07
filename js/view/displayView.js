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
			var tr=($('<tr>'));
			tr.css('height','30px');
			tr.append($('<td>'));
			tr.append($('<td>'));
			table.append(tr)
		}
		table.css('width','100%');
        table.css('margin-top','18px');

		for (var i=0;i<4;i++) {

			if (val instanceof window.Array) {
				table.find('td:even').eq(i).text(val[i]);
				table.find('td:odd').eq(i).text(val[i+4]);
			} else {
				if (!val[i+1]) val[i+1]='';
				table.find('td:even').eq(i).text(val[i+1]);
				table.find('td:odd').eq(i).text(val[i+5]);
			}
		}

		table.find('td:even').css('text-align','left');
		table.find('td:odd').css('text-align','right');

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
