"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function eor(forp) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    if (typeof forp !== 'function') {
        return forp.then(function (data) { return [null, data]; }).catch(function (e) { return [e, null]; });
    }
    try {
        return [null, forp.apply(void 0, args)];
    }
    catch (e) {
        return [e, null];
    }
}
exports.eor = eor;
