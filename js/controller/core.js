"use strict";

/**
 * Core module
 *
 * @constructor
 */
function Core(cashModule, cardModule) {
    this.pin='';
    this.sumCash='';
    this.output="Waiting for card";
    this.cardInserted=false;
    this.pinChecked=false;
    this.cardChecked=false;


    this.pushCard = function (cardData) {
        if (cardData) {
            this.cardInserted=true;
            this.output="Enter pin";
        }else {
            this.cardInserted=false;
            this.pinChecked=false;
            this.cardChecked=false;
        }
    };

    this.checkCardDate = function () {
        var date=new Date ()
       var dateM=date.getMonth();
        var dateY=+1+'/'+date.getFullYear();
       if (new Date (dateY,dateM)< cardModule.readCard('date')){
           this.output="Card out of date!";
       }
    }

    this.enterPin = function (button) {
        if ($.isNumeric(button)&&this.pin.length<4) {
            this.pin=this.pin+button;
        }

        if (this.pin.length===4&&button==='Submit') {
           var chekPin = cardModule.getPin();
            if (this.pin==chekPin) {
                    this.pinChecked=true;
            } else {this.output='Incorrect pin'}

        }else if (button==='Cancel'){this.pin=''}

    };

    this.enterSumCash = function (Cash) {
        if ($.isNumeric(button)) {
            this.sumCash=this.sumCash+button;
        }

        if (button==='Submit') {
            this.getCash();
        } else if (button==='Cancel') {this.sumCash=''}
    };

    this.getOutput = function () {
        return this.output;
    }

    this.getCash=function (money) {
        var isMoney=cardModule.getBalance;
        if (isMoney<money) {this.output='No money'; return;}
        if (this.cardInserted&&this.pinChecked&&this.cardChecked) {
            if (cashModule.checkMoney(money)) {
                cashModule.getCash(money);
            }else this.output='There is not enought money';
        } else {this.output='Strange error'}
    }

}