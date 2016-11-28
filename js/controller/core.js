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
           if (key!=='pushCard'&&key!=='initCore') delete this[key];
        }
        this.state = state;
        this.error = error;

        switch (this.state) {
            case 0:
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
                                this.pushCard(0);//выкинуть карту или забрать
                            }
                        } else {
                            this.initCore(1, 1); // неверный пин снова
                        }

                    } else if (button === 'Cancel') {
                        this.pin = '';
                        this.pushCard(0);//выкинуть карту
                    }
                };
                console.log('enter PIN');
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
                };
                console.log('enter Sum');
                break;

            case 3:
              /*  cardModule.minus(sumCash);
                cashModule.minus();*/
                //отдать карту
                this.pushCard(0);
                this.initCore(0, 0)
                console.log('OK');
                break;
        }
    };
    this.pushCard = function (cardData) {
        if (cardData) {
            this.cardInserted = true;
            cardModule.setCard(cardData);
            console.log('cardInserted');
            this.initCore(1, 0);
        } else {
            cardModule.setCard('');
            this.initCore(0, 0);
        }
    };
    this.initCore(0,0);

}
