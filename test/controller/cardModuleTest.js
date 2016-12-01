"use strict";

describe("Card Module Tests", function () {
    describe("Is Autorized Test", function () {
        var instance;
        var card;

        beforeEach(function() {
            instance = new CardModule();
            card = new CardDataModel();
            instance.setCard(card);
        });

        it("check PIN", function () {
            var p = [1,1,1,0];
            assert.isFalse(instance.chkPin(p));
        });

        it("check card expired date", function () {
            assert.isFalse(instance.chkDate());
        });
    });
});