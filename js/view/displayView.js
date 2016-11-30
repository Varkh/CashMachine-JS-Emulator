"use strict";

function DisplayView() {
    var displayButtons = document.getElementsByClassName("empty");
    var displaySpace = document.getElementById("display");
    
    for (var i = 0; i < displayButtons.length; i++) {
    	displayButtons[i].textContent = i + 1;
    	displayButtons[i].onclick = function(event) {
			var entered = event.target.textContent;
			console.log(entered);
		}
    }
}