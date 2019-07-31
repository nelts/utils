export interface LRU_OPTIONS {
    maxAge?: number;
}
export interface LRU_VALUE {
    expired: number;
    value: any;
}
export default class LRU<T = any> {
    private max;
    private size;
    private cache;
    private _cache;
    constructor(max: number);
    get(key: T, options?: LRU_OPTIONS): any;
    set(key: T, value: any, options?: LRU_OPTIONS): void;
    keys(): T[];
    private _update;
}
