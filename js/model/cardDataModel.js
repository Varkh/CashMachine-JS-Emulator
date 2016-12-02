 "use strict";

/**
 * Model for data from card
 *
 * Used in CardModule
 *
 * @constructor
 */
function CardDataModel(holderName) {
    /**
     * Pin Code
     * should be changed to hash instead
     * or used only for card creation
     */
    var pin = [1,1,1,1];

    /**
     * Amount of money on card
     */
    var ballance = 0;

    /**
     * Name of person who own card
     */
    this._holderName = holderName;

    this._cardNumber = "0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0";

    /**
     * ExpirationDate
     * Not allowed to use card with expired date
     */
    this._expirationDate = [30,1,2018];

    /**
     * CardType: debit/credit
     * credit card allows to have negative balance
     */
    this._cardType = CardDataModel.CARD_TYPE.DEBIT;

    /**
     * Metod: check pin
     * this metod allow to check input pin and real pin of this card
     * returns boolean
     */
    this.checkPin = function (inputPin) {
        for (var i = 0; i < inputPin.length; i++) {
            if (inputPin[i] !== this.pin[i]) {
                return false
            }
        }
        return true;
    };

    /**
     * Metod: sets new PIN
     */
    this.setPin = function (newPin) {
        pin = newPin;
    };
}
    /**
     * Metod: returns ballance
     * @returns number
     */
    this.getBallance = function () {
        return this.ballance;
    };

    /**
     * Metod: sets new ballance
     */
    this.setBalance = function (newBallance) {
        this.ballance = newBallance;
    };



/**
 * Data Type(Enum) for Card Type
 * @type {{CREDIT: string, DEBIT: string}}
 */
CardDataModel.CARD_TYPE = {
    CREDIT: 'credit',
    DEBIT: 'debit'
};

CardDataModel.prototype.isNotExpired = function () {
    var now = new Date();
    if(now.getFullYear() <= this._expirationDate[2]
        && now.getMonth() < this._expirationDate[1]
        && now.getDate() < this._expirationDate[0]) {
        return true;
    } else {
        return false;
    }
};

CardDataModel.prototype.accessGranted = function (inputPin) {
    if (this.checkPin(inputPin) && this.isNotExpired()){
        return true;
    } else {
        return false;
    }
};