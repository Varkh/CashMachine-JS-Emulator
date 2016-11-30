"use strict";
var display = document.getElementById("display");
function DisplayView() {
	this.message = document.createElement("DIV");
	this.showHello = function(text) {
		this.message.innerText = text;
		display.appendChild(this.message);
	}

	this.showInput = function(numbers) {
		this.message.innerText = numbers;
		display.appendChild(this.message);
	}
}
var a = new DisplayView().showHello("showHello");
console.log(a);