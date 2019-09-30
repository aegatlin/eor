declare type Func<T> = (...args: any[]) => T;
declare type Tuple<T> = [null, T] | [Error, null];
export declare function eor<T>(f: Func<T>, ...args: any[]): Tuple<T>;
export declare function eor<T>(p: Promise<T>): Promise<Tuple<T>>;
export {};
