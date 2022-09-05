export function eor(x) {
    if (x instanceof Promise)
        return rora(x);
    try {
        const y = x();
        if (y instanceof Promise)
            return rora(y);
        return [null, y];
    }
    catch (e) {
        return [e, null];
    }
}
export function nor(x) {
    if (x instanceof Promise)
        return rorn(x);
    try {
        const y = x();
        if (y instanceof Promise)
            return rorn(y);
        return y;
    }
    catch {
        return null;
    }
}
const rorn = (p) => p.then((r) => r).catch(() => null);
const rora = async (p) => {
    try {
        const r = await p;
        return [null, r];
    }
    catch (e) {
        return [e, null];
    }
};
