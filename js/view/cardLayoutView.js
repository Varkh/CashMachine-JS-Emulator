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
            $('div')
                .addClass("new-card")
                .data(newcard)
                .appendTo($nameInput.parent());
        }
    });
}

//code for dragging (from LearnJavascript)
var draggME = document.getElementById('draggME');

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
    };

    draggME.onmouseup = function() {
        document.onmousemove = null;
        draggME.onmouseup = null;
    }
};