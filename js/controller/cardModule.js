"use strict";

/**
 * Card Module
 *
 * @constructor
 */


function CardModule() {
    document.body.addEventListener("cart-inserted", function(e) {
        var cardParams = e.detail;
        core.pushCard(e.detail);
    });
    var core = null;

    this.setCore = function(_core) {
        core = _core;
    };

    var card;

    var isAutorized = false;

    /**
     * Metod: sets using card for futher operations
     * @param usingCard
     */
    this.setCard = function (usingCard) {
        card = usingCard;
    };

    this.returnCard = function () {
        return card;
    };

    /**
     * Metod: check if pin is correct and expired date of this card not reached
     * input param: card, PIN
     * return: boolean
     */
    this.checkPin = function (enteredPin) {
        if (card.checkCardPin(enteredPin)){
            return true;
        } else {
            return false;
        }
    };
    /**
     * Metod: looks if card expired
     * return: {boolean}
     */
    this.checkDate = function () {
        if(card.isNotExpired()){
            return true;
        } else {
            return false
        }
    };

    /**
     * Metod: returns the ballance of this card
     * input param: card
     * return: number
     */
    this.viewBallance = function () {
        return card.getBallance;
    };

    /**
     * Metod: check if entered sum can be hand out
     * param sum, card
     * return: boolean
     */
    this.isEnoughMoney = function (sum) {
        if(card.getBallance() >= sum){
            return true;
        } else {
            return false;
        }
    };

    /**
     * Metod: sets new ballance to this card
     * param card, givenSum
     */
    this.setNewBalance = function (givenSum) {
        var finalSum = card.getBallance() - givenSum;
        card.setBalance(finalSum);
    };

    this.readCard = function (cardData) {
        this.setCard(cardData);
        if (card.isNotExpired()){
            isAutorized = true;
        }
        return isAutorized;
    }

    this.changePin = function (pin) {
        card.setPin(pin);
    }
}