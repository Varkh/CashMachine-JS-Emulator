"use strict";

$(function () {
    var displayView = new DisplayView();
    var navigation = new NavigationModule(displayView);

    var core = new Core(
        new CashModule(),
        new CardModule(),
        navigation
    );

    var view = new GeneralView(core);

    window.atm = core;
});