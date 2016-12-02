"use strict";

function DisplayView() {

	var display = document.getElementById("display");
	this.message = document.createElement("DIV");
	this.showMessage = function(text) {
		this.message.innerText = text;
		display.appendChild(this.message);
	};

	this.showInput = function(text, inputValue) {
		this.message.innerText = text;
		display.appendChild(this.message);
	};

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
