"use strict";

describe("Core Tests", function () {
    beforeEach(function () {

        var navigation = {
            showMessage: function () {

            },
            showInput: function () {

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

        var card = new CardDataModel();


        it("After card inserted - core in status Enter PIN", function () {
            atm.pushCard(card);
            assert.equal(atm.state, 2);
        });


        it("After pin entered - core in status Enter Cash", function () {
            atm.pushCard(card);
            atm.onNumBtnClick(1);
            atm.onNumBtnClick(1);
            atm.onNumBtnClick(1);
            atm.onNumBtnClick(1);
            atm.onSubmitBtnClick();
            assert.equal(atm.state, 3);
        });


        it("After cash entered - core in status Waiting", function () {
            atm.pushCard(card);
            atm.onNumBtnClick(1);
            atm.onNumBtnClick(1);
            atm.onNumBtnClick(1);
            atm.onNumBtnClick(1);
            atm.onSubmitBtnClick();
            atm.onNumBtnClick('500');
            atm.onSubmitBtnClick();
            assert.equal(atm.state, 1);
        });
    });
    describe("State2", function () {
        var card = new CardDataModel();

        it("If PIN < 4 no state change", function () {
            atm.pushCard(card);
            atm.onNumBtnClick(1);
            atm.onNumBtnClick(1);
            atm.onNumBtnClick(1);
            atm.onNumBtnClick(1);
            assert.equal(atm.state, 2);
        });


        it("If PIN = 4 and clear no state change", function () {
            atm.pushCard(card);
            atm.onNumBtnClick(1);
            atm.onNumBtnClick(1);
            atm.onNumBtnClick(1);
            atm.onNumBtnClick(1);
            atm.onClearBtnClick()
            atm.onSubmitBtnClick();
            assert.equal(atm.state, 2);
        });


        it("On cansel button - reverse state 1", function () {
            atm.pushCard(card);
            atm.onNumBtnClick(1);
            atm.onNumBtnClick(1);
            atm.onNumBtnClick(1);
            atm.onNumBtnClick(1);
            atm.onSubmitBtnClick();
            atm.onCancelBtnClick();
            assert.equal(atm.state, 1);
        });

        it("On incorrect PIN - no state change, error incorect PIN", function () {
            atm.pushCard(card);
            atm.onNumBtnClick(1);
            atm.onNumBtnClick(1);
            atm.onNumBtnClick(1);
            atm.onNumBtnClick(2);
            atm.onSubmitBtnClick();
            assert.equal(atm.state, 2);
        });
    });


    describe("State3", function () {
        var card = new CardDataModel();
        it("After cash entered - give cash end return in status 1", function () {
            atm.pushCard(card);
            atm.onNumBtnClick(1);
            atm.onNumBtnClick(1);
            atm.onNumBtnClick(1);
            atm.onNumBtnClick(1);
            atm.onSubmitBtnClick();
            atm.onNumBtnClick('600');
            atm.onSubmitBtnClick();
            assert.equal(atm.state, 1);
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
            assert.equal(atm.state, 3);
        });


        it("After cash entered and cancel - return to state 1", function () {
            atm.pushCard(card);
            atm.onNumBtnClick(1);
            atm.onNumBtnClick(1);
            atm.onNumBtnClick(1);
            atm.onNumBtnClick(1);
            atm.onSubmitBtnClick();
            atm.onNumBtnClick('700');
            atm.onCancelBtnClick();
            assert.equal(atm.state, 1);
        });

    });

});
