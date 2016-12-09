"use strict";

function CardReaderView() {
	var cardReader = $('#receiverWrap');
	glow();

	function glow(){
		$('#receiver').fadeOut('fast').fadeIn('fast');
		setTimeout(glow,1500);
	}

}
