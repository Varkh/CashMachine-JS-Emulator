"use strict";

function DisplayView() {
	var that = this;

    var display = document.getElementById("display");
	this.message = document.createElement("DIV");
	this.showMessage = function(text) {
		this.message.innerText = text;
		display.appendChild(this.message);
	};

	this.showInput = function(text, inputValue, hide) {
		this.message.innerText = text;
		display.appendChild(this.message);

        this.input = document.createElement("input");
        this.input.className = "addedInput";
        this.input.value = inputValue;

        this.input.setAttribute("readonly","readonly");

        display.appendChild(this.input);

        if(hide == true){
            this.input.setAttribute("type","password");
        }
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
