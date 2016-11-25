"use strict";

describe("Card Module Tests", function () {
    describe("Is Autorized Test", function () {
        var instance;

        beforeEach(function() {
            instance = new CardModule();
        });

        it("check default", function () {
            assert.isFalse(instance.isAutorized());
        });

        it("check after card in", function () {
            instance.readCard();
            assert.isTrue(instance.isAutorized());
        });
    });
});