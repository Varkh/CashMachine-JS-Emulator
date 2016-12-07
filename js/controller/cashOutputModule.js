"use strict";
function CashOutput(cashOutputView) {
    this.showMoney = function (cash) {
        cashOutputView.showOutCash(cash);
    }
}