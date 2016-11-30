"use strict";

/**
 * Cash Module
 *
 * @constructor
 */
function CashModule() {
    this.getCash = function(amount,nominal) {
        var bills = [{nominal: 500, number: 5}, {nominal: 200, number: 5},{nominal: 100, number: 5},
            {nominal: 50, number: 2},{nominal: 20, number: 5},{nominal: 10, number: 5}];
        var nominals = [];

        while (amount != 0) {

            if(amount > 4250){
                throw new Error("Can't give cash. Not enough money.");
            }

            for (var i = 0; i < bills.length; i++) {
                if(bills[i].nominal <= amount && bills[i].number != 0){
                    amount -= bills[i].nominal;
                    bills[i].number -= 1;
                    nominals.push(bills[i].nominal);
                    break;
                }
            }
        }
        return nominals;
    }
}

