"use strict";

function CardLayoutView() {
    var $nameInput = $(".name-input");
    $(".add-card-button").click(function () {
        $nameInput.toggle();
       // $(".ok-button").toggle();
    });
    $nameInput.keydown(function (e) {
        if (e.keyCode == 13) {
            var newcard = new CardDataModel();
            newcard._holderName = this.value;
            $('<div>')
                .addClass("new-card")
                .data(newcard)
                .appendTo($nameInput.parent());
        }
    });
}

