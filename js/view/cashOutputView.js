"use strict";
function CashOutputView() {
    var cashOut=$('#text');
    this.showOutCash = function (cash) {
        cashOut.append(cash);
        setTimeout( function () {
            cashOut.empty();
        },3000);
    }
}
