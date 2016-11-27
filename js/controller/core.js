"use strict";

/**
 * Core module
 *
 * @constructor
 */
function Core(cashModule, cardModule, navigation) {
    this.state = 0;
    var sumCash = '';
    var pin = '';
    /*0 - ожидание карты
     * 1 - карта вставлена, жду пин
     * 2- пин и дата карты подтверждены, введите сумму
     * 3- на карте и в кешмодуле сумма есть, выдать наличку*/
    this.error = 0;
    /*0 -все ок
     * 1 - неверный пин
     * 2- карта просрочена
     * 3- на карте недостаточно денег
     * 4- в банкомате недостаточно денег*/
    this.initCore = function (state, error) {
        for (var key in this) {
            delete this[key];
        }
        this.state = state;
        this.error = error;
        navigation.set(this.state, this.error);
    };
    switch (this.state) {
        case 0:
            this.pushCard = function (cardData) {
                if (cardData) {
                    this.cardInserted = true;
                    cardModule.setCard(cardData);
                    console.log('cardInserted');
                    this.initCore(1, 0);
                }
            };
            console.log('insert Card');
            break;
        case 1:
            this.enterChar = function (button) {
                if ($.isNumeric(button) && pin.length < 4) {
                    pin = pin + button;
                }

                if (this.pin.length === 4 && button === 'Submit') {
                    var chekPin = cardModule.chekPin(pin);
                    var chekDate = cardModule.chekDate;
                    if (chekPin) {
                        if (chekDate) {
                            this.initCore(2, 0);
                            //пин и код проверены и ок

                        } else {
                            this.initCore(0, 2);
                            //выкинуть карту или забрать
                        }
                    } else {
                        this.initCore(1, 1); // неверный пин снова
                    }

                } else if (button === 'Cancel') {
                    this.pin = '';
                    //выкинуть карту
                }
                console.log('enter PIN');
            };
            break;
        case 2:
            this.enterChar = function (button) {
                if ($.isNumeric(button)) {
                    sumCash = sumCash + button;
                }

                if (button === 'Submit' && sumCash.length > 0) {
                    //проверить сумму и наличие если есть дать кард модулю команду вычесть сумму с карточки
                    var isSum = cashModule.chekCash(sumCash);
                    var isBalanse = cardModule.chekBalance(sumCash);
                    if (!isSum) {
                        this.initCore(2, 4);
                    } else if (!isBalanse) {
                        sumCash = '';
                        this.initCore(2, 3);
                    } else {
                        sumCash = '';
                        this.initCore(3, 0);
                    }

                } else if (button === 'Cancel') {
                    sumCash = '';
                    this.initCore(1, 0)
                }
                console.log('enter Sum');
            };
            break;
        case 3:
            cardModule.minus(sumCash);
            cashModule.minus();
            //отдать карту
            this.initCore(0, 0)
            console.log('OK');
    }


}


/* this.enterChar = function (button) {
 switch (this.state) {
 case 1:
 if ($.isNumeric(button)&&pin.length<4) {
 pin=pin+button;
 }

 if (pin.length===4&&button==='Submit') {
 var chekPin = cardModule.checkPin(pin);
 var chekDate=cardModule.checkDate();
 if (chekPin&&chekDate) { this.state=2;
 } else {
 if (!chekPin) {this.error=1}
 if (!chekDate) {this.error=2}
 this.state=1;
 }

 }else if (button==='Cancel'){
 this.pin='';
 //отдать карту
 }
 break;

 case 2:
 if ($.isNumeric(button)) {
 sumCash=this.sumCash+button;
 }

 if (button==='Submit') {
 this.getCash();
 this.state=3;
 } else if (button==='Cancel') {
 sumCash=''
 }
 break;
 };


 this.getOutput = function () {
 return this.output;
 }

 }*/







/*

 this.output="Waiting for card";
 this.cardInserted=false;
 this.pinChecked=false;
 this.cardChecked=false;


 this.checkCardDate = function () {
 var date=new Date ()
 var dateM=date.getMonth();
 var dateY=+1+'/'+date.getFullYear();
 if (new Date (dateY,dateM)< cardModule.readCard('date')){
 this.output="Card out of date!";
 }
 }

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
 }*/
