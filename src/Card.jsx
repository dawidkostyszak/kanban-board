import React from 'react';
import PropTypes from 'prop-types';

import connect from './Store.jsx';

export class StatelessCard extends React.Component {
    saveCardName = (input) => {
        this.props.updateCardName(input.target.value);
    }

    addCard = () => {
        const { card: { name } } = this.props;
        if (name.trim().length) {
            this.props.saveCard();
        }
    }

    removeCard = () => {
        this.props.removeCard();
    }

    renderCard () {
        const { card: { name } } = this.props;
        return (
            <li className="c-card">
                <span className="c-card__title">{name}</span>
            </li>
        );
    }

    renderNewCard () {
        const { card: { name } } = this.props;
        return (
            <div className="c-new-card">
                <textarea
                    className="c-input c-new-card__input"
                    onChange={this.saveCardName}
                    placeholder="Add a card..."
                    value={name}
                />
                <button
                    className="c-button c-button--save"
                    onClick={this.addCard}
                >
                    Add
                </button>
                <button
                    className="c-button c-button--cancel"
                    onClick={this.removeCard}
                >
                    X
                </button>
            </div>
        );
    }

    render () {
        const { card: { isNew } } = this.props;
        if (isNew) {
            return this.renderNewCard();
        }
        return this.renderCard();
    }
}

StatelessCard.propTypes = {
    saveCard: PropTypes.func,
    removeCard: PropTypes.func,
    updateCardName: PropTypes.func,
    card: PropTypes.shape({
        name: PropTypes.string,
        isNew: PropTypes.bool,
    }),
};

const mapDispatchToProps = (dispatch, state, props) => ({
    updateCardName: (name) => {
        const lists = state.lists.map(
            (list) => {
                if (list.id === props.listId) {
                    return {
                        ...list,
                        cards: list.cards.map(
                            (card) => {
                                if (card.id === props.card.id) {
                                    return {
                                        ...card,
                                        name,
                                    };
                                }
                                return card;
                            },
                        ),
                    };
                }
                return list;
            },
        );

        dispatch({
            ...state,
            lists,
        });
    },
    saveCard: () => {
        const lists = state.lists.map(
            (list) => {
                if (list.id === props.listId) {
                    return {
                        ...list,
                        cards: list.cards.map(
                            (card) => {
                                if (card.id === props.card.id) {
                                    return {
                                        ...card,
                                        isNew: false,
                                    };
                                }
                                return card;
                            },
                        ),
                        newCardAdded: false,
                    };
                }
                return list;
            },
        );

        dispatch({
            ...state,
            lists,
        });
    },
    removeCard: () => {
        const lists = state.lists.map(
            (list) => {
                if (list.id === props.listId) {
                    return {
                        ...list,
                        cards: list.cards.filter(
                            (card) => card.id !== props.card.id,
                        ),
                        newCardAdded: false,
                    };
                }
                return list;
            },
        );

        dispatch({
            ...state,
            lists,
        });
    },
});

export default connect(StatelessCard, { mapDispatchToProps });
