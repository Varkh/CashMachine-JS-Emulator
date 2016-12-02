"use strict";

describe("Buttons tests", function () {
    describe("Was the button pushed?", function () {
        var instance;

        beforeEach(function() {
            btn = new GeneralView();
        });

        it("check pushing", function () {
            assert.isTrue(btn());
        });

        
    });
});