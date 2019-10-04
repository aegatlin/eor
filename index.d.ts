declare type Tuple<T> = [null, T] | [Error, null];
export declare function eor<T>(f: (...args: any[]) => T, ...args: any[]): Tuple<T>;
export declare function eor<T>(p: Promise<T>): Promise<Tuple<T>>;
export {};
