"use strict";

/**
 * Card Module
 *
 * @constructor
 */
function CardModule() {
    var isAutorized = false;
    document.body.addEventListener("card-inserted", function(){
        core.pushCard();
    });
    var core = null;

    this.setCore = function(_core) {
        core = _core;
    }

    /**
     * Metod: check if pin is correct and expired date of this card not reached
     * input param: card, PIN
     * return: boolean
     */
    this.readCard = function (card, enteredPin) {
        if (card.accessGranted(enteredPin)){
            isAutorized = true;
        }
    };

    /**
     * Metod: returns the ballance of this card
     * input param: card
     * return: number
     */
    this.viewBallance = function (card) {
        return card.getBallance;
    };

    /**
     * Metod: check if entered sum can be hand out
     * param sum, card
     * return: boolean
     */
    this.isEnoughMoney = function (card, sum) {
        if(card.getBallance >= sum){
            return true;
        } else {
            return false;
        }
    };

    /**
     * Metod: sets new ballance to this card
     * param card, givenSum
     */
    this.setNewBalance = function (card, givenSum) {
        var finalSum = card.getBallance - givenSum;
        card.setBalance(finalSum);
    };
}