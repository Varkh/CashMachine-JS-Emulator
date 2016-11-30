"use strict";
function CardReaderView() {
	var cardButton = document.getElementById("getCard");
	var event = new Event('card-inserted');
	cardButton.onclick = function() {
		document.body.dispatchEvent(event);
	}
}
