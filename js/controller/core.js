"use strict";
//for navigation module, in future navigation.set(state,error) for menu reaction
var STATE_ENUM = {
    WAITING: 1,
    CARD_INSERTED: 2,
    ENTER_SUM: 3,
    CASH_ADD:4
};

var ERROR_ENUM = {
    NO_ERROR: 0,
    ERROR_PIN: 1,
    ERROR_DATE: 2,
    ERROR_BALANCE: 3,
    ERROR_CASH: 4
};

function Core(cashModule, cardModule, navigation) {
    var self = this;
    var modules = {
        cash: cashModule,
        card: cardModule,
        navigation: navigation
    };

    var stateWait, statePin, stateSum, stateCash;

    //start init
    var pin = '';
    var cash = '';
    navigation.showMessage("Waiting for card");//TODO move to status init

    function onCardPushHandler(cardData) {
        if (cardData) {
            navigation.showMessage("Enter Pin");
            cardModule.readCard(cardData);
            setStatus(ERROR_ENUM.NO_ERROR, STATE_ENUM.CARD_INSERTED);
            currectState = currectState.getNext();
        } else {
            setStatus(ERROR_ENUM.NO_ERROR, STATE_ENUM.WAITING);
            currectState = startingState;
        }
    }

    function setStatus(error, state) {
        if (state) self.state = state;
        self.error = error;
    }

    function initStates(modules) {
        stateWait = new State("WAITING", modules, null, {
            cardPush: onCardPushHandler
        });
        statePin = new State("CARD_INSERTED", modules, null, {
            numBtnClick: function (button) {
                console.log('Enter PIN');
                if (pin.length < 4) {
                    pin = pin + button;
                }
            },

            submitBtnClick: function () {
                console.log('Enter PIN');
                console.log(pin);

                if (pin.length === 4) {
                    var chkPin=true;//cardModule.chkPin(pin)             CardModule return true/false in method chekpin
                    var chkDate=true;//cardModule.chkDate()             CardModule return true/false in method chekDate
                    if (chkDate&&chkDate) {
                        navigation.showInput("Enter sum to get:");
                        setStatus(ERROR_ENUM.NO_ERROR, STATE_ENUM.ENTER_SUM);
                        currectState = currectState.getNext();
                    }else if (!chkPin) {
                        navigation.showMessage("Pin is incorrect, try again.");
                        setStatus(ERROR_ENUM.ERROR_PIN);
                    }else if (!chkDate) {
                        setStatus(ERROR_ENUM.ERROR_DATE);
                        self.pushCard(0);
                    }
                }
            },
            cancelBtnClick: function () {
                console.log('Enter PIN');
                pin = '';
                self.pushCard(0);
            }
        });
        stateSum = new State("ENTER_SUM", modules, null, {
            numBtnClick: function (button) {
                console.log('Enter Sum Cash');
                cash = cash + button;
            },

            submitBtnClick: function () {
                console.log('Enter Sum Cash');
                if (cash.length > 0) {
                    console.log(cash);
                    var isSum = true; //cashModule.chekCash(cash);  return true/false if enought money
                    var isBalanse = true; //cardModule.chekBalance(cash); return true/false if enought money in card

                    if (!isSum) {
                        navigation.showMessage("Sum is incorrect");
                        setStatus(ERROR_ENUM.ERROR_CASH);
                    } else if (!isBalanse) {
                        cash = '';
                        setStatus(ERROR_ENUM.ERROR_BALANCE);
                    } else {
                        navigation.showMessage("Take your money! You WIN.");
                        cashModule.getCash(cash);
                        // cardModule.minBalanse(cash);
                        cash = '';
                        setStatus(ERROR_ENUM.NO_ERROR, STATE_ENUM.WAITING);
                        self.pushCard(0);

                    }
                }
            },

            cancelBtnClick: function () {
                console.log('Enter Sum Cash');
                cash = '';
                self.pushCard(0);
            }
        });

        stateWait.setNext(statePin);
        statePin.setNext(stateSum);
        return stateWait;
    };


    var startingState = initStates(modules);
    var currectState = startingState;
    setStatus(ERROR_ENUM.NO_ERROR, STATE_ENUM.WAITING);

    this.pushCard = function (cardData) {
        currectState.onCardPush(cardData);
    };

    this.onNumBtnClick = function (button) {
        currectState.onNumBtnClickAction(button);
    };

    this.onSubmitBtnClick = function () {
        currectState.onSubmitBtnClickAction();
    };

    this.onCancelBtnClick = function () {
        currectState.onCancelBtnClickAction();
    };

    this.onClearBtnClick = function () {
        currectState.onClearBtnClickAction();
    };
}