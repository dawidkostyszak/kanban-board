import React from 'react';
import PropTypes from 'prop-types';

import List from './List.jsx';
import connect from './storage.jsx';

class App extends React.Component {
    addList = () => {
        const newName = this.props.loadData('listName');

        if (newName.trim().length) {
            const lists = this.loadLists();
            this.props.saveData('lists', [...lists, newName]);
        }
        this.props.saveData('listName', '');
    }

    saveName = (input) => {
        this.props.saveData('listName', input.target.value);
    }

    loadLists = () => this.props.loadData('lists') || []

    render () {
        const lists = this.loadLists();
        return (
            <div className="c-app">
                {lists.map((name, index) => <List key={index} name={name} />)}
                <input
                    className="c-app__button"
                    onBlur={this.addList}
                    onChange={this.saveName}
                    placeholder="Add list"
                    value={this.props.loadData('listName') || ''}
                />
            </div>
        );
    }
}

App.propTypes = {
    saveData: PropTypes.func,
    loadData: PropTypes.func,
};


export default connect(App);
