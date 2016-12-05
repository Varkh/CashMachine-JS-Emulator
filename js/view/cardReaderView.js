"use strict";

function CardReaderView() {
	var cardReader = $('#receiverWrap');
	var event = new CustomEvent('cart-inserted', { 'detail': JSON.stringify(new CardDataModel(holderName, cardNumber, expirationDate, balance)});
	cardReader.click(function() {
		document.body.dispatchEvent(event);
	});
	glow();
	function glow(){
		$('#receiver').fadeOut('fast').fadeIn('fast');
		setTimeout(glow,1500);
	}
}

  
