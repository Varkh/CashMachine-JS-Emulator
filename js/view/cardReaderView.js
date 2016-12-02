"use strict";

function CardReaderView() {
	var cardButton = document.getElementById("getCard");
	var event = new CustomEvent('cart-inserted', { 'detail': {
							username: new CardDataModel("Name"),
							cardNumber: new CardDataModel().cardNumber,
							date: new CardDataModel().expirationDate,
							cardType: new CardDataModel().cardType
							}
						});
	cardButton.onclick = function() {
		document.body.dispatchEvent(event);
	}
}


