"use strict";

function CardLayoutView() {
    var $nameInput = $(".name-input");
    $(".add-card-button").click(function () {
        $nameInput.toggle();
        $(".bal-input").toggle();
        $(".date-button").toggle();
        $(".pin-button").toggle();
    });
    $(".ok-button").click(function () {
            var newcard = new CardDataModel();
            newcard._holderName = $nameInput[0].value;
            newcard._cardNumber = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
            newcard._expirationDate = [1,10,18];
            var holderName = $('<p>')
                .addClass("holder-name")
                .append(newcard._holderName);
            var cardNumber = $('<p>')
                .addClass("card-number")
                .append(newcard._cardNumber.join(""));
            var expDate = $('<p>')
                .addClass("exp-date")
                .append(newcard._expirationDate[0]
                    + "/" + newcard._expirationDate[1]
                    + "/" + newcard._expirationDate[2]);
            $('<div>')
                .addClass("new-card")
                .data(newcard)
                .append(holderName)
                .append(cardNumber)
                .append(expDate)
                .appendTo($nameInput.parent());
            $nameInput.toggle();
            $nameInput[0].value = "";
            $(".ok-button").toggle();
    });
}

/*function visualCardNumber(n) {
    for (var i = 0; i < n.length; i++){
        var res = "";
        if (i = 4 || i = 8 || i = 12){
            res = res + " " + n[i];
        } else {
        res = res + n[i];
        }
        return res;
    }
}*/

//code for dragging (from LearnJavascript)
var draggME = document.getElementsByClassName('draggME');

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
            
            //card insertion code start
            var target = draggME.getBoundingClientRect();
            var point = document.getElementById('receiver').getBoundingClientRect();
            
            
            function overlap(tar) {
                return !(
                tar.top > point.bottom ||
                tar.right < point.left ||
                tar.bottom < point.top ||
                tar.left > point.right
                );
            }
            
            if (overlap(target)) {
                document.body.removeChild(draggME);
                console.log("card inserted");
            }
            //card insertion code end

    };

    draggME.onmouseup = function() {
        document.onmousemove = null;
        draggME.onmouseup = null;
    }
};