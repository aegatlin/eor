export declare function eor<R>(fp: () => Promise<R>): Promise<[null, R] | [any, null]>;
export declare function eor<R>(f: () => R): [null, R] | [any, null];
export declare function eor<R>(p: Promise<R>): Promise<[null, R] | [any, null]>;
export declare function nor<R>(fp: () => Promise<R>): Promise<R | null>;
export declare function nor<R>(f: () => R): R | null;
export declare function nor<R>(p: Promise<R>): Promise<R | null>;
