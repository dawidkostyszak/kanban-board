import EventEmitter from 'events';
import cookie from 'react-cookies';

class Storage extends EventEmitter {
    constructor () {
        super();
        this.listeners = [];
        this.on('change', this.refresh);
    }

    addListener = (listener) => {
        this.listeners.push(listener);
    }

    removeListener = (listener) => {
        this.listeners = this.listeners.filter((l) => l !== listener);
    }

    refresh () {
        this.listeners.forEach((listener) => { listener(); });
    }
}

export class SimpleStorage extends Storage {
    constructor () {
        super();
        this.store = {};
        this.on('change', this.refresh);
    }

    save = (key, value) => {
        this.store[key] = value;
        this.emit('change');
    }

    load = (key) => this.store[key];

    remove = (key) => {
        delete this.store[key];
        this.emit('change');
    }
}

export class CookieStorage extends Storage {
    save = (key, value) => {
        cookie.save(key, value);
        this.emit('change');
    }

    load = (key) => cookie.load(key);

    remove = (key) => {
        cookie.remove(key);
        this.emit('change');
    }
}
