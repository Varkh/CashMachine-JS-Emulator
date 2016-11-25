function PinIncorrectError(message) {
    this.name = 'PinIncorrectError';
    this.message = message || 'Pin is incorrect';
    this.stack = (new Error()).stack;
}
PinIncorrectError.prototype = Object.create(Error.prototype);
PinIncorrectError.prototype.constructor = MyError;