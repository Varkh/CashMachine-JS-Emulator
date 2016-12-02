"use strict";

describe("Core Tests", function () {
    describe("States", function () {
        //TODO use before each here!!!
        var core = new Core(
            new CashModule(),
            new CardModule()
        );
        window.atm = core;
         var card = new CardDataModel();
        atm.pushCard(card);
        it("After card inserted - core in status Enter PIN", function () {
            assert.equal(atm.state, 2);
        });
        var core = new Core(
            new CashModule(),
            new CardModule()
        );
        window.atm1 = core;
        atm1.pushCard(card);
        atm1.onNumBtnClick('1111');
        atm1.onSubmitBtnClick();
        it("After pin entered - core in status Enter Cash", function () {
            assert.equal(atm1.state, 3);
        });
        //TODO fix tests
        // var core = new Core(
        //     new CashModule(),
        //     new CardModule()
        // );
        // window.atm2 = core;
        // atm2.pushCard(card);
        // atm2.onNumBtnClick('1111');
        // atm2.onSubmitBtnClick();
        // atm2.onNumBtnClick('600');
        // atm2.onSubmitBtnClick();
        // it("After cash entered - core in status Waiting", function () {
        //     assert.equal(atm2.state, 1);
        // });
    });
    describe("State2", function () {
        var core = new Core(
            new CashModule(),
            new CardModule()
        );
        var card = new CardDataModel();
        window.atm3 = core;
        atm3.pushCard(card);
        atm3.onNumBtnClick('111');
        atm3.onSubmitBtnClick();
        it("If PIN < 4 no state change", function () {
            assert.equal(atm3.state, 2);
        });
        var core = new Core(
            new CashModule(),
            new CardModule()
        );
        window.atm4 = core;
        atm4.pushCard(card);
        atm4.onNumBtnClick('1111');
        atm4.onClearBtnClick()
        atm4.onSubmitBtnClick();

        it("If PIN = 4 and clear no state change", function () {
            assert.equal(atm3.state, 2);
        });
        var core = new Core(
            new CashModule(),
            new CardModule()
        );
        // window.atm5 = core;
        // atm5.pushCard(card);
        // atm5.onNumBtnClick('1111');
        // atm5.onSubmitBtnClick();
        // atm5.onCancelBtnClick()
        // it("On cansel button - reverse state 1", function () {
        //     assert.equal(atm5.state, 1);
        // });
    });

    describe("State3", function () {
        var core = new Core(
            new CashModule(),
            new CardModule()
        );
        var card = new CardDataModel();
        // window.atm6 = core;
        // atm6.pushCard(card);
        // atm6.onNumBtnClick('1111');
        // atm6.onSubmitBtnClick();
        // atm6.onNumBtnClick('600');
        // atm6.onSubmitBtnClick();
        // it("After cash entered - give cash end return in status 1", function () {
        //     assert.equal(atm6.state, 1);
        // });

        var core = new Core(
            new CashModule(),
            new CardModule()
        );
        var card = new CardDataModel();
        window.atm7 = core;
        atm7.pushCard(card);
        atm7.onNumBtnClick('1111');
        atm7.onSubmitBtnClick();
        atm7.onNumBtnClick('700');
        atm7.onClearBtnClick();
        atm7.onSubmitBtnClick();
        it("After cash entered and clear - no state change on submit", function () {
            assert.equal(atm7.state,3);
        });

        // var core = new Core(
        //     new CashModule(),
        //     new CardModule()
        // );
        // var card = new CardDataModel();
        // window.atm8 = core;
        // atm8.pushCard(card);
        // atm8.onNumBtnClick('1111');
        // atm8.onSubmitBtnClick();
        // atm8.onNumBtnClick('700');
        // atm8.onCancelBtnClick();
        // it("After cash entered and cancel - return to state 1", function () {
        //     assert.equal(atm8.state,1);
        // });


    });

});