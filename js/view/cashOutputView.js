"use strict";
function CashOutputView() {
    var cashOut=$('#text');
    this.showOutCash = function (cash) {
        cashOut.val(cash);
        setTimeout( function () {
            cashOut.val('')
        },1000);
    }
}
