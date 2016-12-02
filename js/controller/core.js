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
    var pin = [];
    var cash = '';

    function onCardPushHandler(cardData) {
        if (cardData) {
            navigation.showMessage("Enter Pin");
            cardModule.readCard(cardData);
            setStatus(ERROR_ENUM.NO_ERROR, STATE_ENUM.CARD_INSERTED);
            currectState = currectState.getNext();
        } else {
            navigation.showMessage("Waiting for card");
            setStatus(ERROR_ENUM.NO_ERROR, STATE_ENUM.WAITING);
            currectState = startingState;
            currectState.init();
        }
    }

    function setStatus(error, state) {
        if (state) self.state = state;
        self.error = error;
    }

    function initStates(modules) {
        stateWait = new State("WAITING", modules, null, {
            cardPush: onCardPushHandler,
            init:function () {
                navigation.showMessage("Waiting for card");
            }
        });
        statePin = new State("CARD_INSERTED", modules, null, {
            numBtnClick: function (button) {
                console.log('Enter PIN');
                if (pin.length < 4) {
                    pin.push(+button);
                }
            },
            cardPush: onCardPushHandler,
            submitBtnClick: function () {
                console.log(pin);


                if (pin.length === 4) {
                    var chkPin=cardModule.checkPin(pin);
                    var chkDate=true;//cardModule.chkDate()             CardModule return true/false in method chekDate
                    if (chkPin&&chkDate) {

                        setStatus(ERROR_ENUM.NO_ERROR, STATE_ENUM.ENTER_SUM);
                        currectState = currectState.getNext();
                        currectState.init();
                    }else if (!chkPin) {
                        navigation.showMessage("Pin is incorrect, try again.");
                        pin=[];
                        setTimeout(currectState.init,1000);
                    }else if (!chkDate) {
                        navigation.showMessage("Card is out to date!");
                        setStatus(ERROR_ENUM.ERROR_DATE);
                        setTimeout(self.pushCard(0),1000);
                    }
                }
            },
            cancelBtnClick: function () {
                console.log('Enter PIN');
                pin = [];
                self.pushCard(0);
                currectState=stateWait;
                setStatus(ERROR_ENUM.NO_ERROR, STATE_ENUM.WAITING);
            },

            clearBtnClick: function () {
                pin = [];
            },
            init:function () {
                navigation.showMessage("Enter PIN");
            }
        });
        stateSum = new State("ENTER_SUM", modules, null, {
            cardPush: onCardPushHandler,
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
//переделать через try catch
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
                currectState=stateWait;
                setStatus(ERROR_ENUM.NO_ERROR, STATE_ENUM.WAITING);
            },
            clearBtnClick:function () {
              cash='';
            },
            init:function () {
                navigation.showInput("Enter sum to get:");
            }
        });

        stateWait.setNext(statePin);
        statePin.setNext(stateSum);
        return stateWait;
    };


    var startingState = initStates(modules);
    var currectState = startingState;
    console.log(currectState.init)
    currectState.init();
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