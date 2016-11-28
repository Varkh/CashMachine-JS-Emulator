"use strict";

/**
 * Core module
 *
 * @constructor
 */
function Core(cashModule, cardModule, navigation) {
    var sumCash = '';
    var pin = '';

    var STATE_ENUM = {
        WAITING: 0,
        CARD_INSERTED: 1,
        ENTER_SUM: 2,
        PUSH_MONEY: 3
    };

    var ERROR_ENUM = {
        NO_ERROR: 0,
        ERROR_PIN: 1,
        ERROR_DATE: 2,
        ERROR_BALANCE: 3,
        ERROR_CASH: 4,
    };

    this.initCore = function (state, error) {
        for (var key in this) {
            if (key !== 'pushCard' && key !== 'initCore') delete this[key];
        }

        this.state = state;
        this.error = error;
        navigation.set(this.state, this.error);

        switch (this.state) {
            case STATE_ENUM.WAITING:
                console.log('insert Card');
                break;

            case STATE_ENUM.CARD_INSERTED:
                this.enterChar = function (button) {

                    if ($.isNumeric(button) && pin.length < 4) {
                        pin = pin + button;
                    }

                    if (pin.length === 4 && button === 'Submit') {
                        var chekPin = cardModule.chekPin(pin);
                        var chekDate = cardModule.chekDate;
                        if (chekPin) {
                            if (chekDate) {
                                this.initCore(STATE_ENUM.ENTER_SUM, ERROR_ENUM.NO_ERROR);
                                //пин и код проверены и ок

                            } else {
                                this.initCore(STATE_ENUM.WAITING, ERROR_ENUM.ERROR_DATE);
                                this.pushCard(0);//выкинуть карту или забрать
                            }
                        } else {
                            this.initCore(STATE_ENUM.CARD_INSERTED, ERROR_ENUM.ERROR_PIN); // неверный пин снова
                        }

                    } else if (button === 'Cancel') {
                        this.pin = '';
                        this.pushCard(0);//выкинуть карту
                        this.initCore(STATE_ENUM.WAITING, ERROR_ENUM.NO_ERROR);
                    }
                };
                console.log('enter PIN');
                break;

            case STATE_ENUM.ENTER_SUM:
                this.enterChar = function (button) {

                    if ($.isNumeric(button)) {
                        sumCash = sumCash + button;
                    }

                    if (button === 'Submit' && sumCash.length > 0) {
                        //проверить сумму и наличие если есть дать кард модулю команду вычесть сумму с карточки
                        var isSum = cashModule.chekCash(sumCash);
                        var isBalanse = cardModule.chekBalance(sumCash);

                        if (!isSum) {
                            this.initCore(STATE_ENUM.ENTER_SUM, ERROR_ENUM.ERROR_CASH);
                        } else if (!isBalanse) {
                            sumCash = '';
                            this.initCore(STATE_ENUM.ENTER_SUM, ERROR_ENUM.ERROR_BALANCE);
                        } else {
                            sumCash = '';
                            this.initCore(STATE_ENUM.PUSH_MONEY, ERROR_ENUM.NO_ERROR);
                        }

                    } else if (button === 'Cancel') {
                        sumCash = '';
                        this.initCore(STATE_ENUM.CARD_INSERTED, ERROR_ENUM.NO_ERROR)
                    }
                };

                console.log('enter Sum');
                break;

            case STATE_ENUM.PUSH_MONEY:
                cardModule.minus(sumCash);
                cashModule.minus();
                //отдать карту
                console.log('OK');
                this.pushCard(0);
                break;
        }
    };
    this.pushCard = function (cardData) {

        if (cardData) {
            this.cardInserted = true;
            cardModule.setCard(cardData);
            console.log('cardInserted');
            this.initCore(STATE_ENUM.CARD_INSERTED, ERROR_ENUM.NO_ERROR);
        } else {
            cardModule.setCard('');
            this.initCore(STATE_ENUM.WAITING, ERROR_ENUM.NO_ERROR);
        }
    };
    this.initCore(STATE_ENUM.WAITING, ERROR_ENUM.NO_ERROR);


}
