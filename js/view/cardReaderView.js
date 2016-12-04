"use strict";

function CardReaderView() {
	var cardButton = document.getElementById("getCard");
	var event = new Event('card-inserted');
	cardButton.onclick = function() {
		document.body.dispatchEvent(event);
	}
}
//code for glowing button
$(document).ready(function() {
	function glow(){
		var  glowingBtn = $('#glowingReceiver');
		glowingBtn.fadeOut('fast').fadeIn('fast');
		setTimeout(glow,1500);
	}
	
	glow();
});

//code for overlapping and cardInsertion action
var draggME = document.getElementById('draggME');
var  glowingBtn = document.getElementById('glowingReceiver').getBoundingClientRect();
var cardYX = draggME.getBoundingClientRect();

function overlap(coordinates) {
	var overlap = !(coordinates.right < glowingBtn.left ||
		coordinates.left > glowingBtn.right ||
		coordinates.bottom < glowingBtn.top ||
		coordinates.top > glowingBtn.bottom);
	return overlap
	};

//code for dragging (from LearnJavascript)
draggME.onmousedown = function(event) {
	draggME.style.position = 'absolute';
	moveAt(event);
	document.body.appendChild(draggME);
	draggME.style.zIndex = 1000; 
	
	function moveAt(event2) {
		draggME.style.left = event2.pageX - draggME.offsetWidth / 2 + 'px';
		draggME.style.top = event2.pageY - draggME.offsetHeight / 2 + 'px';
	}
	
	document.onmousemove = function(event3) {
		moveAt(event3);
	}
	
	draggME.onmouseup = function() {
		document.onmousemove = null;
		draggME.onmouseup = null;
	}
	if (overlap(cardYX)) {
		console.log("HI");
	};
}

  
