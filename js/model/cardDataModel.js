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
    var holderName;

    /**
     * Amount of money on card
     */
    var balance;

    /**
     * CardType: debit/credit
     * credit card allows to have negative balance
     */
    var cardType = CardDataModel.CARD_TYPE.DEBIT;

    /**
     * Pin Code
     * should be changed to hash instead
     * or used only for card creation
     */
    var pin;

    /**
     * ExpirationDate
     * Not allowed to use card with expired date
     */
    var expirationDate;
}

/**
 * Data Type(Enum) for Card Type
 * @type {{CREDIT: string, DEBIT: string}}
 */
CardDataModel.CARD_TYPE = {
    CREDIT: 'credit',
    DEBIT: 'debit'
};