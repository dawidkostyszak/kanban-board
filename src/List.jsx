import React from 'react';
import PropTypes from 'prop-types';

import Card from './Card.jsx';
import connect from './Store.jsx';

class List extends React.Component {
    addNewCard = () => {
        this.props.addNewCard();
    }

    saveListName = (input) => {
        this.props.updateListName(input.target.value);
    }

    addList = () => {
        const { list: { name } } = this.props;
        if (name.trim().length) {
            this.props.saveList();
        }
    }

    removeList = () => {
        this.props.removeList();
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

    renderList () {
        const {
            list: {
                id: listId,
                name,
                cards,
            },
        } = this.props;

        return (
            <div className="c-list">
                <span className="c-list__title">{name}</span>
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
        const { list: { name } } = this.props;

        return (
            <div className="c-new-list">
                <input
                    className="c-input"
                    onChange={this.saveListName}
                    placeholder="Add a list..."
                    value={name}
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
    updateListName: (name) => {
        const lists = state.lists.map((list) => {
            if (list.id === props.list.id) {
                return {
                    ...list,
                    name,
                };
            }
            return list;
        });

        dispatch({
            ...state,
            lists,
        });
    },
    saveList: () => {
        const lists = state.lists.map((list) => {
            if (list.id === props.list.id) {
                return {
                    ...list,
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
