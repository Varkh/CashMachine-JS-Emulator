"use strict";

/**
 * Core module
 *
 * @constructor
 */
function Core(cashModule, cardModule) {
    console.log("Waiting for card");

    this.pushCard = function (cardData) {
        console.log("Enter pin");
    };

    this.enterPin = function (pin) {
        console.log("Autorized.")
    };

    this.getCash = function(n) {
        return {100: 2, 500: 1};
    };
}