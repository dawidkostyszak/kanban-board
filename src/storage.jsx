import EventEmitter from 'events';
import React from 'react';
import cookie from 'react-cookies';

class SimpleStorage extends EventEmitter {
    constructor (onChange) {
        super();
        this.store = {};
        this.on('change', onChange);
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

class CookieStorage extends EventEmitter {
    constructor (onChange) {
        super();
        this.on('change', onChange);
    }

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

const connect = (WrappedComponent) => class extends React.Component {
    constructor (props) {
        super(props);
        this.storage = new CookieStorage(this.forceUpdate.bind(this));
    }

    render () {
        return (
            <WrappedComponent
                {...this.props}
                loadData={this.storage.load}
                saveData={this.storage.save}
            />
        );
    }
};

export default connect;
