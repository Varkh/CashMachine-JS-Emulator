"use strict";
//for navigation module, in future navigation.set(state,error) for menu reaction


function Core(cashModule, cardModule, navigation,cashOutModule) {
    var STATE_ENUM = {
        WAITING: 1,
        CARD_INSERTED: 2,
        MENU:3,
        ENTER_SUM: 4
    };

    var STATE_TEXT = {
        WAITING: 'Waiting for card',
        CARD_INSERTED: 'Enter Pin',
        ENTER_SUM: 'Enter Cash',
        PIN_ERRROR: 'Pin is incorrect, try again.',
        DATE_ERROR: 'Card is out to date!',
        ALL_OK: "Take your money! You WIN."
    };

    var self = this;
    var modules = {
        cash: cashModule,
        card: cardModule,
        navigation: navigation
    };

    var stateWait, statePin, stateSum, stateCash,stateMenu;

    var pin = [];
    var cash = '';
    var timeOut=2500;

    function onCardPushHandler(cardData) {
        if (cardData) {
            navigation.showMessage(STATE_TEXT.CARD_INSERTED);
            cardModule.readCard(cardData);
            currectState = currectState.getNext();
        } else {
            navigation.showMessage(STATE_TEXT.WAITING);
            currectState = startingState;
            currectState.init();
        }
    }

    function initStates(modules) {
        stateWait = new State("WAITING", modules, null, {
            cardPush: onCardPushHandler,
            init: function () {
                navigation.showMessage(STATE_TEXT.WAITING);
                pin = [];
                cash = '';

            },
            cancelBtnClick: function () {
                pin = [];
                self.pushCard(0);
                currectState = stateWait;
            },
            selectMenuBtnClick:function () {

            }
        });

        stateMenu = new State("MENU", modules, null, {
            cardPush: onCardPushHandler,

            init: function () {
               navigation.createMenu({
                     4:'View balanse',
                     5:cashModule.getNominals()[0],
                     6:cashModule.getNominals()[1],
                     7:'Enter Cash',
                     8:'Back'
                 },0)
            },

            numBtnClick:function () {
            },

            selectMenuBtnClick:function (value) {
                switch (value) {
                    case '4':
                        navigation.showMessage(cardModule.viewBallance());
                        navigation.createMenu(['','','','','','','','Back'],true)
                        break;
                    case '5':
                        try {
                            var cashOut = cashModule.getCash(cashModule.getNominals()[0]);
                            navigation.showMessage(STATE_TEXT.ALL_OK);
                            cashOutModule.showMoney(cashOut);
                            setTimeout(function () {
                                currectState = stateWait;
                                currectState.init();
                            }, timeOut);

                        } catch (e) {
                            cash = '';
                            navigation.showMessage(e);
                            setTimeout(function () {
                                currectState.init();
                            }, timeOut);
                        }
                        break;

                    case '6':
                        try {
                            var cashOut = cashModule.getCash(cashModule.getNominals()[1]);
                            navigation.showMessage(STATE_TEXT.ALL_OK);
                            cashOutModule.showMoney(cashOut);
                            setTimeout(function () {
                                currectState = stateWait;
                                currectState.init();
                            }, timeOut);

                        } catch (e) {
                            cash = '';
                            navigation.showMessage(e);
                            setTimeout(function () {
                                currectState.init();
                            }, timeOut);
                        }
                        break;
                    case '8':
                        pin = [];
                        cash='';
                        currectState = statePin;
                        currectState.init();
                        break;
                    case '7':
                        currectState = currectState.getNext();
                        currectState.init();

                }
            }
        });

        statePin = new State("CARD_INSERTED", modules, null, {
            numBtnClick: function (button) {

                if (pin.length < 4) {
                    pin.push(+button);
                }
                navigation.showInput(STATE_TEXT.CARD_INSERTED, pin.join(''), 1);
            },
            cardPush: onCardPushHandler,
            submitBtnClick: function () {

                if (pin.length === 4) {
                    var chkPin = cardModule.checkPin(pin);
                    var chkDate = true;//cardModule.chkDate()             CardModule return true/false in method chekDate

                    if (chkPin && chkDate) {
                        currectState = currectState.getNext();
                        currectState.init();
                        pin = [];
                    } else if (!chkPin) {
                        navigation.showMessage(STATE_TEXT.PIN_ERRROR);
                        pin = [];
                        setTimeout(currectState.init, timeOut);
                    } else if (!chkDate) {
                        navigation.showMessage(STATE_TEXT.DATE_ERROR);
                        setTimeout(self.pushCard(0), timeOut);
                    }
                }
            },
            cancelBtnClick: function () {
                pin = [];
                self.pushCard(0);
                currectState = stateWait;
            },
            clearBtnClick: function () {
                pin = [];
                navigation.showInput(STATE_TEXT.CARD_INSERTED, pin.join(''), 1);
            },
            init: function () {
                navigation.showMessage(STATE_TEXT.CARD_INSERTED);
            }
        });

        stateSum = new State("ENTER_SUM", modules, null, {
            cardPush: onCardPushHandler,
            numBtnClick: function (button) {
                cash = cash + button;
                navigation.showInput(STATE_TEXT.ENTER_SUM, cash, 0);
            },

            submitBtnClick: function () {
                if (cash.length > 0) {

                    var isBalanse = cardModule.isEnoughMoney(+cash);

                    if (!isBalanse) {

                        setTimeout(currectState.init, timeOut);
                    }

                    try {
                        var cashOut = cashModule.getCash(+cash);
                        navigation.showMessage(STATE_TEXT.ALL_OK);
                        cashOutModule.showMoney(cashOut);
                        setTimeout(function () {
                            currectState = stateWait;
                            currectState.init();
                        }, timeOut);

                    } catch (e) {
                        cash = '';
                        navigation.showMessage(e);
                        setTimeout(function () {
                            currectState.init();
                        }, timeOut);
                    }
                }
            },

            cancelBtnClick: function () {
                cash = '';
                self.pushCard(0);
                currectState = stateWait;
            },
            clearBtnClick: function () {
                cash = '';
                navigation.showInput(STATE_TEXT.ENTER_SUM, cash, 0);
            },
            init: function () {
                navigation.showInput(STATE_TEXT.ENTER_SUM, cash);
            }
        });



        stateSum = new State("ENTER_SUM", modules, null, {
            cardPush: onCardPushHandler,
            numBtnClick: function (button) {
                cash = cash + button;
                navigation.showInput(STATE_TEXT.ENTER_SUM, cash, 0);
            },

            submitBtnClick: function () {
                if (cash.length > 0) {

                    var isBalanse = cardModule.isEnoughMoney(+cash);

                    if (!isBalanse) {

                        setTimeout(currectState.init, timeOut);
                    }

                    try {
                        var cashOut = cashModule.getCash(+cash);
                        navigation.showMessage(STATE_TEXT.ALL_OK);
                        cashOutModule.showMoney(cashOut);
                        setTimeout(function () {
                            currectState = stateWait;
                            currectState.init();
                        }, timeOut);

                    } catch (e) {
                        cash = '';
                        navigation.showMessage(e);
                        setTimeout(function () {
                            currectState.init();
                        }, timeOut);
                    }
                }
            },

            cancelBtnClick: function () {
                cash = '';
                self.pushCard(0);
                currectState = stateWait;
            },
            clearBtnClick: function () {
                cash = '';
                navigation.showInput(STATE_TEXT.ENTER_SUM, cash, 0);
            },
            init: function () {
                navigation.showInput(STATE_TEXT.ENTER_SUM, cash);
            }
        });

        stateWait.setNext(statePin);
        statePin.setNext(stateMenu);
        stateMenu.setNext(stateSum);
        return stateWait;
    };


    var startingState = initStates(modules);
    var currectState = startingState;
    currectState.init();

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

    this.coreState = function () {
        return STATE_ENUM[currectState.statusCore]
    }
    
    this.selectMenuBtnClickAction=function (value) {
        currectState.onSelectMenuBtnClickAction(value);
    }
}