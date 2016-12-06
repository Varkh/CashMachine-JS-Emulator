"use strict";

function CardLayoutView() {
    /*var $nameInput = $(".name-input");
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
    });    */




    //version 2

    this.createCard = function createCard(lable) {
        var card = document.createElement("DIV");
        card.innerText = lable;
        document.body.appendChild(card);
    }
    
    this.addDataToCard = function(name) {
        var cardData = new CardDataModel();
        cardData._holderName = name;
        console.log(cardData);
    }


    var inputString = document.createElement("INPUT");
    inputString.value = "Enter Your Name";
    document.body.appendChild(inputString);

    inputString.onfocus = function() {
        if (this.value == 'Enter Your Name') {
            this.value = '';
        }
    };

    inputString.onkeypress = function(e) {
        if(e.keyCode == 13) {
            e.preventDefault();
            newCard.addDataToCard(inputString.value);
            newCard.createCard(inputString.value);
            inputString.value = ""
        }
    };
}


var newCard = new CardLayoutView();
console.log(newCard);


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