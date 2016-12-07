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

    this.createCard = function(lable) {
        var card = document.createElement("DIV");
        
        card.innerText = lable;
        card.className = "draggME";
        card.style.backgroundColor = "yellow";
        card.style.width = "200px";
        card.style.height = "90px";
        card.style.marginBottom = "10px";
        card.style.lineHeight = "85px";

        document.body.appendChild(card);
        draggMe.push(card);
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
            inputString.value = "";
            console.log(draggMe);
        }
    }
}

var draggME = document.getElementById('draggME');
var draggMe = [draggME];
console.log(draggMe);
var newCard = new CardLayoutView();


//code for dragging (from LearnJavascript)
for (var i = 0; i < draggMe.length; i++) {
    console.log(i);
    draggMe[i].onmousedown = function(event) {
        var that = this;
        that.style.position = 'absolute';
        moveAt(event);
        document.body.appendChild(that);
        that.style.zIndex = 1000;

        function moveAt(event2) {
            that.style.left = event2.pageX - that.offsetWidth / 2 + 'px';
            that.style.top = event2.pageY - that.offsetHeight / 2 + 'px';
        }

        document.onmousemove = function(event3) {
            moveAt(event3);
            
            //card insertion code start
            var target = that.getBoundingClientRect();
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
                document.body.removeChild(that);
                console.log("card inserted");
            }
            //card insertion code end

        };

        that.onmouseup = function() {
            document.onmousemove = null;
            that.onmouseup = null;
        }
    }
}