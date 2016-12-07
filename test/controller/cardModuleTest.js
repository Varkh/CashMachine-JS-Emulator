"use strict";

describe("Card Module Tests", function () {
    describe("Is Autorized Test", function () {
        var instance;
        var card;

        beforeEach(function() {
            instance = new CardModule();
            card = new CardDataModel('Имя Фамилия', [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],  [30,1,2018], 500);
            instance.setCard(card)
        });

        it("check default", function () {
            assert.isTrue(instance.readCard(card));
        });

        it("check if user can continue with this card", function () {
            var p = [1,1,1,1];
            assert.isTrue(instance.checkDate() == instance.checkPin(p));
        });
    });
});