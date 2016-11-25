"use strict";

/**
 * Card Module
 *
 * @constructor
 */
function CardModule() {
    var isAutorized = false;

    this.readCard = function (data) {
        isAutorized = true;
    };

    this.isAutorized = function () {
        return isAutorized;
    };
}