"use strict";

$(function () {
    var core = new Core(
        new CashModule(),
        new CardModule()
    );

    var view = new GeneralView(core);


    window.atm = core;
});