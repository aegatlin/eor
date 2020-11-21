"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eor = void 0;
function eor(forp, ...args) {
    if (typeof forp !== 'function') {
        return forp.then(data => [null, data]).catch(e => [e, null]);
    }
    try {
        return [null, forp(...args)];
    }
    catch (e) {
        return [e, null];
    }
}
exports.eor = eor;
