import React from 'react';
import PropTypes from 'prop-types';

import List from './List.jsx';
import connect from './storage.jsx';

class App extends React.Component {
    addList = () => {
        const newName = this.props.loadData('listName');
        const lists = this.props.loadData('lists') || [];
        this.props.saveData('lists', [...lists, newName]);
        this.props.saveData('listName', '');
    }

    saveName = (input) => {
        this.props.saveData('listName', input.target.value);
    }

    render () {
        const lists = this.props.loadData('lists') || [];
        return (
            <div>
                <input
                    onBlur={this.addList}
                    onChange={this.saveName}
                    placeholder="Add list"
                    value={this.props.loadData('listName') || ''}
                />
                {lists.map((name, index) => <List key={index} name={name} />)}
            </div>
        );
    }
}

App.propTypes = {
    saveData: PropTypes.func,
    loadData: PropTypes.func,
};


export default connect(App);
