"use strict";

$(function () {
    var displayView = new DisplayView();
    var navigation = new NavigationModule(displayView);

    var cardModule = new CardModule();
    var core = new Core(
        new CashModule(),
        cardModule,
        navigation
    );

    cardModule.setCore(core);

    var view = new GeneralView(core);
    var wallet = new CardLayoutView();
    var cardReaderView = new CardReaderView();
    window.atm = core;
});

    
  