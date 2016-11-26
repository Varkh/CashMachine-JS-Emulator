 "use strict";

/**
 * Model for data from card
 *
 * Used in CardModule
 *
 * @constructor
 */
function CardDataModel() {
    /**
     * Name of person who own card
     */
    this._holderName = 'Вася Пупкин';

    /**
     * Amount of money on card
     */
    this._balance = 100;

    /**
     * CardType: debit/credit
     * credit card allows to have negative balance
     */
    this._cardType = CardDataModel.CARD_TYPE.DEBIT;

    /**
     * Pin Code
     * should be changed to hash instead
     * or used only for card creation
     */
    this.defaultPin = [1,1,1,1];

    /**
     * ExpirationDate
     * Not allowed to use card with expired date
     */
    this._expirationDate = [30,1,2018];
}


/**
 * Data Type(Enum) for Card Type
 * @type {{CREDIT: string, DEBIT: string}}
 */
CardDataModel.CARD_TYPE = {
    CREDIT: 'credit',
    DEBIT: 'debit'
};

CardDataModel.prototype.getBallance = function () {
    return this.ballance;
};

CardDataModel.prototype.checkPin = function (inputPin) {
    for (var i = 0; i < inputPin.length; i++) {
        if(this.defaultPin){
            this.pin = this.defaultPin;
        }
        if (inputPin[i] !== this.pin[i]) {
            return false
        }
    }
        return true;
};

CardDataModel.prototype.setPin = function (newPin) {
    if (this.defaultPin){
        delete this.defaultPin
    }
    this.pin = newPin;
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

CardDataModel.prototype.isCardOk = function (inputPin) {
    if (this.checkPin(inputPin) && this.isNotExpired()){
        return true;
    } else {
        return false;
    }
};