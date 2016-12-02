

function State(name, modules, nextState, handlers) {
    handlers = handlers || {};

    this.init = function () {

    };

    this.setNext = function (state) {
        nextState = state;
    };

    this.getNext = function () {
        return nextState;
    };

    this.onNumBtnClickAction = handlers.numBtnClick || defaultAction;

    this.onSubmitBtnClickAction = handlers.submitBtnClick || defaultAction;

    this.onCancelBtnClickAction = handlers.cancelBtnClick || defaultAction;

    this.onClearBtnClickAction = handlers.clearBtnClick || defaultAction;

    this.onCardPush = handlers.cardPush || defaultAction;

    function defaultAction() {

    }
}