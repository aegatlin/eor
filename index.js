"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function eor(forp) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    try {
        if (typeof forp === 'function')
            return [forp.apply(void 0, args), null];
        return forp.then(function (data) { return [data, null]; });
    }
    catch (e) {
        return [e, null];
    }
}
exports.eor = eor;
