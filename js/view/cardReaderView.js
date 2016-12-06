"use strict";

function CardReaderView() {
	var cardReader = $('#receiverWrap');
	//var event = new Event('card-inserted');
	var event = new CustomEvent('cart-inserted', { 'detail': JSON.stringify(new CardDataModel("Name", "000000000000", "28.10.2022", 500))});
	cardReader.click(function() {
		document.body.dispatchEvent(event);
	});
	glow();

	function glow(){
		$('#receiver').fadeOut('fast').fadeIn('fast');
		setTimeout(glow,1500);
	}
}

  
