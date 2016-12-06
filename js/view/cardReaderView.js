"use strict";

function CardReaderView() {
	var cardReader = $('#receiverWrap');
	var event = new CustomEvent('cart-inserted', { 'detail': JSON.stringify(new CardDataModel('Имя Фамилия', [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],  [30,1,2018], 500))});
	cardReader.click(function() {
		document.body.dispatchEvent(event);
	});
	glow();

	function glow(){
		$('#receiver').fadeOut('fast').fadeIn('fast');
		setTimeout(glow,1500);
	}

}
