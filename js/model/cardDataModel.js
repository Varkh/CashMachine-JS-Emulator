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
    this._pin = [1,1,1,1];

    /**
     * ExpirationDate
     * Not allowed to use card with expired date
     */
    this._expirationDate = [30,1,18];
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
    for (var i = 0; i < inputPin.length; i++){
        var count = 0;
        if (inputPin[i] === this._pin[i]){
            count++;
        }
    }
    var pinIsGood = (count == this._pin.length);
    return pinIsGood;
};

/*CardDataModel.prototype.isNotExpired = function () {
  var now = new Date(milliseconde);
  var expDate =
};*/