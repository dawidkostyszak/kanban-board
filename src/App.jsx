import React from 'react';
import PropTypes from 'prop-types';

import List from './List.jsx';
import connect from './Store.jsx';

class App extends React.Component {
    addNewList = () => {
        this.props.addNewList();
    }

    renderNewListButton () {
        if (this.props.newListAdded) {
            return null;
        }
        return (
            <button
                className="c-button c-button--action c-app__button"
                onClick={this.addNewList}
            >
                Add a list...
            </button>
        );
    }

    render () {
        const { lists = [] } = this.props;
        return (
            <div className="c-app">
                {lists.map((list) => (
                    <List
                        key={list.id}
                        list={list}
                    />
                ))}
                {this.renderNewListButton()}
            </div>
        );
    }
}

App.propTypes = {
    lists: PropTypes.arrayOf(PropTypes.shape()),
    addNewList: PropTypes.func,
    newListAdded: PropTypes.bool,
};

const mapStateToProps = (state) => ({
    lists: state.lists,
    newListAdded: state.newListAdded,
});

const mapDispatchToProps = (dispatch, state) => ({
    addNewList: () => {
        const newList = {
            id: state.lists.length + 1,
            name: '',
            newName: '',
            cards: [],
            isNew: true,
        };

        dispatch({
            ...state,
            lists: [...state.lists, newList],
            newListAdded: true,
        });
    },
});

export default connect(App, { mapStateToProps, mapDispatchToProps });
