"use strict";

/**
 * Cash Module
 *
 * @constructor
 */
var cash = new CashModule();
var arrayCash = [{nominal: 500, number: 1}];

function CashModule() {
    var cashSum;
    var minNominal = bills[0].nominal;

    var bills = [{nominal: 500, number: 2}, {nominal: 200, number: 3}, {nominal: 100, number: 1},
        {nominal: 50, number: 2}, {nominal: 20, number: 1}, {nominal: 10, number: 1}];

    function setConst() {
        cashSum = 0;

        for (var i = 0; i < bills.length; i++) {
            cashSum = cashSum + bills[i].nominal * bills[i].number;

            if (bills[i].nominal < minNominal && bills[i].number) minNominal = bills[i].nominal;
        }
    }

    this.getCash = function (amount, nominal) {
        setConst();
        var nominals = [];
        var tempBils = [];

        while (amount != 0) {

            if (amount > cashSum || amount < minNominal) {
                this.setCash(tempBils);
                throw Error("Can't give cash. Not enough money.");
            }
            var amountCheck = amount;

            for (var i = 0; i < bills.length; i++) {

                if (bills[i].nominal <= amount && bills[i].number > 0) {
                    amount -= bills[i].nominal;
                    bills[i].number -= 1;
                    tempBils.push({nominal: bills[i].nominal, number: 1})
                    nominals.push(bills[i].nominal);
                    break;
                }
            }
            if (amountCheck === amount) {
                this.setCash(tempBils);
                throw Error("Can't give cash. Not enough nominals.");
            }
        }

        return nominals;

    }

    this.setCash = function (arrayNominals) {

        for (var i = 0; i < arrayNominals.length; i++) {

            for (var j = 0; j < bills.length; j++) {

                if (bills[j].nominal === arrayNominals[i].nominal) {
                    bills[j].number += arrayNominals[i].number;
                }
            }

        }
        setConst();
    }
}

