"use strict";
//for navigation module, in future navigation.set(state,error) for menu reaction
var STATE_ENUM = {
    WAITING: 1,
    CARD_INSERTED: 2,
    ENTER_SUM: 3
};

var ERROR_ENUM = {
    NO_ERROR: 0,
    ERROR_PIN: 1,
    ERROR_DATE: 2,
    ERROR_BALANCE: 3,
    ERROR_CASH: 4,
};

function Core(cashModule, cardModule, navigation) {
    var self = this;
    var modules = {
        cash: cashModule,
        card: cardModule,
        navigation: navigation
    };
    var pin = [];
    var cash = '';
    var stateWait, statePin, stateSum, stateCash;

    this.pushCard = function (cardData) {
        
        if (cardData) {
            cardModule.readCard(cardData);
            setStatus(ERROR_ENUM.NO_ERROR, STATE_ENUM.CARD_INSERTED);
            currectState = currectState.next;
        } else {
            cardModule.setCard();
            setStatus(ERROR_ENUM.NO_ERROR, STATE_ENUM.WAITING);
            currectState = startingState;
        }
    };

    function setStatus(error, state) {
        if (state) self.state = state;
        self.error = error;
    }

    function State(modules) {
        this.next;

        this.onNumBtnClickAction = function () {
            console.log('Insert Card');
        };

        this.onSubmitBtnClickAction = function () {
            console.log('Insert Card');
        };

        this.onCancelBtnClickAction = function () {
            console.log('Insert Card');
        };

        this.onClearBtnClickAction = function () {
            console.log('Insert Card');
            pin = '';
            cash = '';
        };
    }

    function initStates(modules) {
        stateWait = new State(modules);
        statePin = new State(modules);
        stateSum = new State(modules);

        statePin.onNumBtnClickAction = function (button) {
            console.log('Enter PIN');
            if (pin.length < 4) {
               pin.push(button);

            }
        };

        statePin.onSubmitBtnClickAction = function () {
            console.log('Enter PIN');

            if (pin.length === 4) {
                var chkPin=cardModule.checkPin(pin);          //  CardModule return true/false in method chekpin
                var chkDate='true' //cardModule.checkDate();           //CardModule return true/false in method chekDate
                console.log(chkPin)
                if (chkPin&&chkDate) {
                    setStatus(ERROR_ENUM.NO_ERROR, STATE_ENUM.ENTER_SUM);
                    currectState = currectState.next;
                }else if (!chkPin) {
                    setStatus(ERROR_ENUM.ERROR_PIN);
                }else if (!chkDate) {
                    setStatus(ERROR_ENUM.ERROR_DATE);
                    self.pushCard(0);
                }
            }
        };

        statePin.onCancelBtnClickAction = function () {
            console.log('Enter PIN');
            pin = '';
            self.pushCard(0);
        };

        stateSum.onNumBtnClickAction = function (button) {
            console.log('Enter Sum Cash');
            cash = cash + button;
        };

        stateSum.onSubmitBtnClickAction = function () {
            console.log('Enter Sum Cash');
            if (cash.length > 0) {
                console.log(cash)
                var isSum = true; //cashModule.chekCash(cash);  return true/false if enought money
                var isBalanse = true; //cardModule.chekBalance(cash); return true/false if enought money in card

                if (!isSum) {
                    setStatus(ERROR_ENUM.ERROR_CASH);
                } else if (!isBalanse) {
                    cash = '';
                    setStatus(ERROR_ENUM.ERROR_BALANCE);
                } else {
                    // cashModule.getCash(cash);            get cash
                    // cardModule.minBalanse(cash);
                    cash = '';
                    setStatus(ERROR_ENUM.NO_ERROR, STATE_ENUM.WAITING);
                    self.pushCard(0);

                }
            }
        };

        stateSum.onCancelBtnClickAction = function () {
            console.log('Enter Sum Cash');
            cash = '';
            self.pushCard(0);
        };

        stateWait.next = statePin;
        statePin.next = stateSum;
        return stateWait;
    };


    var startingState = initStates(modules)
    var currectState = startingState;
    setStatus(ERROR_ENUM.NO_ERROR, STATE_ENUM.WAITING);

    this.onSubmitBtnClick = function (button) {
        currectState.onSubmitBtnClickAction(button);
    };

    this.onNumBtnClick = function (button) {
        currectState.onNumBtnClickAction(button);
    };

    this.onCancelBtnClick = function (button) {
        currectState.onCancelBtnClickAction(button);
    };

    this.onClearBtnClick = function (button) {
        currectState.onClearBtnClickAction(button);
    };
}