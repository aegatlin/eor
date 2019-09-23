declare type Func<T> = (...args: any[]) => T;
export declare const eorf: <T>(func: Func<T>, ...args: any[]) => [Error, T];
export declare const eorp: <T>(promise: Promise<T>) => Promise<[Error, T]>;
export {};
