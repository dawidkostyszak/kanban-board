import React from 'react';

import { SimpleStorage, CookieStorage } from './storage';

const storage = new CookieStorage();

const connect = (
    WrappedComponent, { mapStateToProps = () => {}, mapDispatchToProps = () => {} },
) => class extends React.Component {
    constructor (props) {
        super(props);
        this.listener = this.forceUpdate.bind(this);
        storage.addListener(this.listener);

        this.defaultState = {
            lists: [],
            newListAdded: false,
        };
    }

    componentWillUnmount () {
        storage.removeListener(this.listener);
    }

    render () {
        const state = storage.load('appState') || this.defaultState;
        const props = {
            ...this.props,
            ...mapStateToProps(state, this.props),
            ...mapDispatchToProps(storage.save.bind(storage, 'appState'), state, this.props),
        };

        return (
            <WrappedComponent
                {...props}
                saveData={storage.save}
                loadData={storage.load}
            />
        );
    }
};

export default connect;
