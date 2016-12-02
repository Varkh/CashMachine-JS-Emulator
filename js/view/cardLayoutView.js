"use strict";

function CardLayoutView(wallet) {
    $(".add-card-button").click(function () {
        $(".name-input").toggle();
    });
    $(".name-input").keydown(function (e) {
        if (e.keyCode == 13){
            var newcard = new CardDataModel();
            newcard._holderName = this.value;
            var newCardView = $("<div>");
            newCardView.className = "new-card";
            newCardView.Data = newcard;
            this.parent.appendChild(newCardView);
        }
    })
}
