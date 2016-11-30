"use strict";

/**
 * Card Module
 *
 * @constructor
 */
function CardModule() {
<<<<<<< HEAD
    //var isAutorized = false;
=======
    var isAutorized = false;
    document.body.addEventListener("card-inserted", function(){
        core.pushCard();
    });
    var core = null;

    this.setCore = function(_core) {
        core = _core;
    }
>>>>>>> eaba41871d070ee0096611be3a8ad80601d3cfa3

    var card;

    /**
     * Metod: sets using card for futher operations
     * @param usingCard
     */
    this.setCard = function (usingCard) {
        this.card = usingCard;
    };
    /**
     * Metod: check if pin is correct and expired date of this card not reached
     * input param: card, PIN
     * return: boolean
     */
    this.chkPin = function (enteredPin) {
        if (this.card.checkPin(enteredPin)){
            return true;
        } else {
            return false;
        }
    };
    /**
     * Metod: looks if card expired
     * return: {boolean}
     */
    this.chkDate = function () {
        if(this.card.isNotExpired()){
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
        return this.card.getBallance;
    };

    /**
     * Metod: check if entered sum can be hand out
     * param sum, card
     * return: boolean
     */
    this.isEnoughMoney = function (sum) {
        if(this.card.getBallance >= sum){
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
        var finalSum = card.getBallance - givenSum;
        card.setBalance(finalSum);
    };
}