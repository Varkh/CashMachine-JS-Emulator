"use strict";
function Core(cashModule, cardModule, navigation, cashOutModule) {
    var STATE_ENUM = {
        WAITING: 1,
        CARD_INSERTED: 2,
        MENU: 3,
        ENTER_SUM: 4
    };

    var STATE_TEXT = {
        WAITING: 'Waiting for card',
        CARD_INSERTED: 'Enter Pin',
        ENTER_SUM: 'Enter Cash',
        PIN_ERRROR: 'Pin is incorrect, try again.',
        DATE_ERROR: 'Card is out to date!',
        ALL_OK: "Take your money! You WIN.",
        CHANGE_PIN: 'Change PIN',
        NO_BALLANCE: 'No money at card'
    };

    var self = this;
    var modules = {
        cash: cashModule,
        card: cardModule,
        navigation: navigation
    };

    var stateWait, statePin, stateSum, stateMenu;
    var pin = [];
    var cash = '';
    var timeOut = 2500;

    function tryCash(money) {
        try {
            var cashOut = cashModule.getCash(parseInt(money));
            navigation.showMessage(STATE_TEXT.ALL_OK);
            cashOutModule.showMoney(cashOut);
            cardModule.setNewBalance(parseInt(money));
            setTimeout(function () {
                self.pushCard(0);
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

    function onCardPushHandler(cardData) {
        if (cardData) {
            navigation.showMessage(STATE_TEXT.CARD_INSERTED);
            cardModule.readCard(cardData);
            currectState = currectState.getNext();
        } else {
            navigation.showMessage(STATE_TEXT.WAITING);
            cardModule.ejectCard();
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

            selectMenuBtnClick: function () {

            }
        });

        statePin = new State("CARD_INSERTED", modules, null, {
            numBtnClick: function (button) {

                if (pin.length < 4) {
                    pin.push(parseInt(button));
                }
                navigation.showInput(STATE_TEXT.CARD_INSERTED, pin.join(''), 1);
            },

            cardPush: onCardPushHandler,

            submitBtnClick: function () {

                if (pin.length === 4) {
                    var chkPin = cardModule.checkPin(pin);
                    var chkDate = cardModule.checkDate();

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
                        setTimeout(function () {
                            self.pushCard(0)
                        }, timeOut);
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

        stateMenu = new State("MENU", modules, null, {
            cardPush: onCardPushHandler,

            init: function () {
                navigation.createMenu({
                    3: 'Change PIN',
                    4: 'View balanse',
                    5: cashModule.getNominals()[0],
                    6: cashModule.getNominals()[1],
                    7: 'Enter Cash',
                    8: 'Back'
                }, 0)
            },

            numBtnClick: function () {
            },

            cancelBtnClick: function () {
                pin = [];
                this.onNumBtnClickAction = function () {
                };
                self.pushCard(0);
                currectState = stateWait;
            },

            selectMenuBtnClick: function (value) {
                switch (value) {

                    case '3':
                        var pin1 = [];
                        navigation.showInput(STATE_TEXT.CHANGE_PIN, pin1.join(''), 1);

                        this.onNumBtnClickAction = function (button) {
                            if (pin1.length < 4) {
                                pin1.push(parseInt(button));
                                navigation.showInput(STATE_TEXT.CHANGE_PIN, pin1.join(''), 1);
                            }
                        };

                        this.onSubmitBtnClickAction=function () {
                            if (pin1.length === 4) {
                                cardModule.changePin(pin1);
                                this.onNumBtnClickAction = function () {
                                };
                                this.onClearBtnClickAction=function () {
                                };
                                this.onSubmitBtnClickAction=function () {
                                };
                                currectState = statePin;
                                currectState.init();
                                pin = [];
                            }
                        };

                        this.onClearBtnClickAction=function () {
                            pin1=[];
                            navigation.showInput(STATE_TEXT.CHANGE_PIN, pin1.join(''), 1);
                        };
                        break;

                    case '4':
                        navigation.showMessage(cardModule.viewBallance());
                        navigation.createMenu({8:'Back'}, true)
                        break;

                    case '5':
                        var isBalanse = cardModule.isEnoughMoney(cashModule.getNominals()[0]);

                        if (isBalanse) {
                            tryCash(cashModule.getNominals()[0]);
                        } else {
                            navigation.showMessage(STATE_TEXT.NO_BALLANCE);
                            setTimeout(function () {
                                currectState = stateMenu;
                                currectState.init();
                            }, timeOut);
                        }
                        break;

                    case '6':
                        var isBalanse = cardModule.isEnoughMoney(cashModule.getNominals()[1]);

                        if (isBalanse) {
                            tryCash(cashModule.getNominals()[1]);
                        } else {
                            navigation.showMessage(STATE_TEXT.NO_BALLANCE);
                            setTimeout(function () {
                                currectState = stateMenu;
                                currectState.init();
                            }, timeOut);
                        }
                        break;

                    case '8':
                        pin = [];
                        cash = '';
                        currectState = statePin;
                        currectState.init();
                        break;

                    case '7':
                        currectState = currectState.getNext();
                        currectState.init();
                }
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
                    var isBalanse = cardModule.isEnoughMoney(parseInt(cash));

                    if (!isBalanse) {
                        navigation.showMessage(STATE_TEXT.NO_BALLANCE);
                        setTimeout(currectState.init, timeOut);
                    } else {
                        tryCash(cash)
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

    this.selectMenuBtnClickAction = function (value) {
        currectState.onSelectMenuBtnClickAction(value);
    }
}