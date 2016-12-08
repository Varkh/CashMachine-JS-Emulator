"use strict";
var card1=new CardDataModel('Петров Иван', [1,1,2,4,6,7,8,9,3,4,6,7,8,9,2,0],  [30,1,2018], 500);
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