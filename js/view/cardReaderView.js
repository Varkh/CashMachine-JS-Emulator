"use strict";

function CardReaderView() {
	var cardButton = document.getElementById("getCard");
	var event = new Event('card-inserted');
	cardButton.onclick = function() {
		document.body.dispatchEvent(event);
	}
}

$(document).ready(function() {
	function blink(){
		$('#glowingReceiver').fadeOut('fast').fadeIn('fast');
		setTimeout(blink,1500);
	}
	blink();
});

