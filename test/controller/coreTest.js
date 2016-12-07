"use strict";

describe("Core Tests", function () {
    beforeEach(function () {
        var navigation = {
            showMessage: function () {

            },
            showInput: function () {

            },
            createMenu: function () {
                
            }
        };
        var cardModule = new CardModule();
        var core = new Core(
            new CashModule(),
            cardModule,
            navigation
        );

        cardModule.setCore(core);

        window.atm = core;
    });
    describe("States", function () {

        var card = new CardDataModel('Имя Фамилия', [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],  [30,1,2018], 500);


        it("After card inserted - core in status Enter PIN", function () {
            atm.pushCard(card);
            assert.equal(atm.coreState(), 2);
        });


        it("After pin entered - core in status Enter Cash", function () {
            atm.pushCard(card);
            atm.onNumBtnClick(1);
            atm.onNumBtnClick(1);
            atm.onNumBtnClick(1);
            atm.onNumBtnClick(1);
            atm.onSubmitBtnClick();
            assert.equal(atm.coreState(), 3);
        });


        it("After cash entered - core in status Waiting after 2.5 second", function () {
            var timeInterval=2500;
            atm.pushCard(card);
            atm.onNumBtnClick(1);
            atm.onNumBtnClick(1);
            atm.onNumBtnClick(1);
            atm.onNumBtnClick(1);
            atm.onSubmitBtnClick();
            atm.selectMenuBtnClickAction('7');

            atm.onNumBtnClick('500');
            atm.onSubmitBtnClick();
            setTimeout(function () {

                assert.equal(atm.coreState(), 1)
            },timeInterval)
        });
    });
    describe("State2", function () {
        var card = new CardDataModel('Имя Фамилия', [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],  [30,1,2018], 500);

        it("If PIN < 4 no state change", function () {
            atm.pushCard(card);
            atm.onNumBtnClick(1);
            atm.onNumBtnClick(1);
            atm.onNumBtnClick(1);
            atm.onNumBtnClick(1);
            assert.equal(atm.coreState(), 2);
        });


        it("If PIN = 4 and clear no state change", function () {
            atm.pushCard(card);
            atm.onNumBtnClick(1);
            atm.onNumBtnClick(1);
            atm.onNumBtnClick(1);
            atm.onNumBtnClick(1);
            atm.onClearBtnClick()
            atm.onSubmitBtnClick();
            assert.equal(atm.coreState(), 2);
        });


        it("On cansel button - reverse state 1", function () {
            atm.pushCard(card);
            atm.onNumBtnClick(1);
            atm.onNumBtnClick(1);
            atm.onNumBtnClick(1);
            atm.onNumBtnClick(1);
            atm.onSubmitBtnClick();
            atm.selectMenuBtnClickAction('7');

            atm.onCancelBtnClick();
            assert.equal(atm.coreState(), 1);
        });

        it("On incorrect PIN - no state change, error incorect PIN", function () {
            atm.pushCard(card);
            atm.onNumBtnClick(1);
            atm.onNumBtnClick(1);
            atm.onNumBtnClick(1);
            atm.onNumBtnClick(2);
            atm.onSubmitBtnClick();
            assert.equal(atm.coreState(), 2);
        });
    });


    describe("State3", function () {
        var card = new CardDataModel('Имя Фамилия', [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],  [30,1,2018], 500);
        var timeInterval=2500;
        it("After cash entered - give cash end return in status 1 after 2.5 second", function () {
            atm.pushCard(card);
            atm.onNumBtnClick(1);
            atm.onNumBtnClick(1);
            atm.onNumBtnClick(1);
            atm.onNumBtnClick(1);
            atm.onSubmitBtnClick();
            atm.onNumBtnClick('600');
            atm.onSubmitBtnClick();
            setTimeout(function () {
                assert.equal(atm.coreState(), 1)
            },timeInterval)
        });


        it("After cash entered and clear - no state change on submit", function () {
            atm.pushCard(card);
            atm.onNumBtnClick(1);
            atm.onNumBtnClick(1);
            atm.onNumBtnClick(1);
            atm.onNumBtnClick(1);
            atm.onSubmitBtnClick();
            atm.onNumBtnClick('700');
            atm.onClearBtnClick();
            atm.onSubmitBtnClick();
            assert.equal(atm.coreState(), 3);
        });

    });

});
