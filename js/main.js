"use strict";

$(function () {
    window.atm = new Core(
        new CashModule(),
        new CardModule()
    );
});