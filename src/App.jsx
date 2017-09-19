import React from 'react';
import PropTypes from 'prop-types';

import List from './List.jsx';
import connect from './Store.jsx';

class App extends React.Component {
    addList = () => {
        const { newListName } = this.props;
        if (newListName.trim().length) {
            this.props.addList(newListName);
        }
    }

    saveName = (input) => {
        this.props.saveListName(input.target.value);
    }

    render () {
        const { lists = [], newListName } = this.props;
        return (
            <div className="c-app">
                {lists.map((list, index) => <List key={index} list={list} />)}
                <input
                    className="c-app__button"
                    onBlur={this.addList}
                    onChange={this.saveName}
                    placeholder="Add a list..."
                    value={newListName}
                />
            </div>
        );
    }
}

App.propTypes = {
    addList: PropTypes.func,
    saveListName: PropTypes.func,
    newListName: PropTypes.string,
    lists: PropTypes.arrayOf(PropTypes.shape()),
};

const mapStateToProps = (state) => ({
    lists: state.lists,
    newListName: state.newListName,
});

const mapDispatchToProps = (dispatch, state) => ({
    addList: (newListName) => {
        const newList = {
            id: state.lists.length + 1,
            name: newListName,
            cards: [],
            newCardName: '',
        };

        dispatch({
            ...state,
            lists: [...state.lists, newList],
            newListName: '',
        });
    },
    saveListName: (newListName) => {
        dispatch({
            ...state,
            newListName,
        });
    },
});

export default connect(App, { mapStateToProps, mapDispatchToProps });
