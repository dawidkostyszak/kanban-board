import React from 'react';
import PropTypes from 'prop-types';

import Card from './Card.jsx';
import connect from './Store.jsx';

class List extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            editName: false,
        };
    }

    addNewCard = () => {
        this.props.addNewCard();
    }

    saveListName = (input) => {
        this.props.updateListName(input.target.value);
    }

    addList = () => {
        const { list: { newName } } = this.props;
        if (newName.trim().length) {
            this.props.saveList(newName);
        }
    }

    removeList = () => {
        this.props.removeList();
    }

    saveEditName = () => {
        this.addList();
        this.setState({
            editName: false,
        });
    }

    exitEditName = () => {
        const { list: { name } } = this.props;
        this.props.updateListName(name);
        this.setState({
            editName: false,
        });
    }

    renderNewCardButton () {
        const { list: { newCardAdded } } = this.props;
        if (newCardAdded) {
            return null;
        }
        return (
            <button
                className="c-button c-button--action c-list__button"
                onClick={this.addNewCard}
            >
                Add a card...
            </button>
        );
    }

    renderListTitle () {
        const { list: { name, newName } } = this.props;
        if (this.state.editName) {
            return (
                <span>
                    <input
                        className="c-input"
                        onChange={this.saveListName}
                        value={newName}
                    />
                    <button
                        className="c-button c-button--save"
                        onClick={this.saveEditName}
                    >
                        Save
                    </button>
                    <button
                        className="c-button c-button--cancel"
                        onClick={this.exitEditName}
                    >
                        X
                    </button>
                </span>
            );
        }

        return (
            <span className="c-list__title">
                {name}
                <button
                    className="c-button c-list__change_button"
                    onClick={() => { this.setState({ editName: true }); }}
                />
            </span>
        );
    }

    renderList () {
        const {
            list: {
                id: listId,
                cards,
            },
        } = this.props;

        return (
            <div className="c-list">
                {this.renderListTitle()}
                <ul>
                    {cards.map((card) => (
                        <Card
                            key={card.id}
                            card={card}
                            listId={listId}
                        />
                    ))}
                </ul>
                {this.renderNewCardButton()}
            </div>
        );
    }

    renderNewList () {
        const { list: { newName } } = this.props;

        return (
            <div className="c-new-list">
                <input
                    className="c-input"
                    onChange={this.saveListName}
                    placeholder="Add a list..."
                    value={newName}
                />
                <button
                    className="c-button c-button--save"
                    onClick={this.addList}
                >
                    Save
                </button>
                <button
                    className="c-button c-button--cancel"
                    onClick={this.removeList}
                >
                    X
                </button>
            </div>
        );
    }

    render () {
        const { list: { isNew } } = this.props;

        if (isNew) {
            return this.renderNewList();
        }
        return this.renderList();
    }
}

List.propTypes = {
    addNewCard: PropTypes.func,
    saveList: PropTypes.func,
    removeList: PropTypes.func,
    updateListName: PropTypes.func,
    list: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        newName: PropTypes.string,
        cards: PropTypes.arrayOf(PropTypes.shape()),
        isNew: PropTypes.bool,
        newCardAdded: PropTypes.bool,
    }),
};

const mapDispatchToProps = (dispatch, state, props) => ({
    addNewCard: () => {
        const { list } = props;
        const newCard = {
            id: list.cards.length + 1,
            name: '',
            isNew: true,
        };

        const lists = state.lists.map((l) => {
            if (l.id === props.list.id) {
                return {
                    ...l,
                    cards: [...l.cards, newCard],
                    newCardAdded: true,
                };
            }
            return l;
        });

        dispatch({
            ...state,
            lists,
        });
    },
    updateListName: (newName) => {
        const lists = state.lists.map((list) => {
            if (list.id === props.list.id) {
                return {
                    ...list,
                    newName,
                };
            }
            return list;
        });

        dispatch({
            ...state,
            lists,
        });
    },
    saveList: (name) => {
        const lists = state.lists.map((list) => {
            if (list.id === props.list.id) {
                return {
                    ...list,
                    name,
                    isNew: false,
                };
            }
            return list;
        });

        dispatch({
            ...state,
            lists,
            newListAdded: false,
        });
    },
    removeList: () => {
        const lists = state.lists.filter(
            (list) => list.id !== props.list.id,
        );

        dispatch({
            ...state,
            lists,
            newListAdded: false,
        });
    },
});

export default connect(List, { mapDispatchToProps });
