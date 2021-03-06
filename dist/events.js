"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class EventEmitter {
    constructor() {
        this._eventStacks = {};
    }
    on(name, listener) {
        this.addListener(name, listener);
        return this;
    }
    off(name, listener) {
        this.removeListener(name, listener);
        return this;
    }
    addListener(name, listener) {
        if (!this._eventStacks[name])
            this._eventStacks[name] = [];
        this._eventStacks[name].push(listener);
        return this;
    }
    removeListener(name, listener) {
        const listeners = this.listeners(name);
        const index = listeners.indexOf(listener);
        if (index > -1) {
            listeners.splice(index, 1);
            if (this.listenerCount(name) === 0) {
                this.removeAllListeners(name);
            }
        }
    }
    prependListener(name, listener) {
        if (!this._eventStacks[name])
            this._eventStacks[name] = [];
        this._eventStacks[name].unshift(listener);
    }
    removeAllListeners(name) {
        if (this._eventStacks[name]) {
            delete this._eventStacks[name];
        }
    }
    async emit(name, ...args) {
        const listeners = this.listeners(name);
        if (!listeners)
            return;
        for (let i = 0; i < listeners.length; i++) {
            await listeners[i](...args);
        }
    }
    async sync(name, ...args) {
        const listeners = this.listeners(name);
        if (!listeners)
            return;
        await Promise.all(listeners.map(listener => Promise.resolve(listener(...args))));
    }
    async lookup(name, ...args) {
        const listeners = this.listeners(name);
        if (!listeners)
            return;
        let i = listeners.length;
        while (i--)
            await listeners[i](...args);
    }
    eventNames() {
        return Object.keys(this._eventStacks);
    }
    listenerCount(name) {
        const listeners = this.listeners(name);
        return listeners ? listeners.length : 0;
    }
    listeners(name) {
        return this._eventStacks[name];
    }
}
EventEmitter.Methods = [
    'on',
    'off',
    'addListener',
    'removeListener',
    'prependListener',
    'removeAllListeners',
    'emit',
    'eventNames',
    'listenerCount',
    'listeners'
];
exports.default = EventEmitter;
