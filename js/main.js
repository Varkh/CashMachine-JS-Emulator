"use strict";
var cards=[];
$(function () {
    var displayView = new DisplayView();
    var navigation = new NavigationModule(displayView);
    var cardModule = new CardModule();
    var cashOutputView= new CashOutputView();
   var cashOutModule= new CashOutput(cashOutputView);
    var core = new Core(
        new CashModule(),
        cardModule,
        navigation,
        cashOutModule
    );

    cardModule.setCore(core);

    var view = new GeneralView(core);
    var wallet = new CardLayoutView();
    var cardReaderView = new CardReaderView();
    window.atm = core;
});