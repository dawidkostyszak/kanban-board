import React from 'react';
import PropTypes from 'prop-types';

import Card from './Card.jsx';
import connect from './Store.jsx';

class List extends React.Component {
    saveName = (input) => {
        this.props.saveCardName(input.target.value);
    }

    addCard = () => {
        const { list: { newCardName } } = this.props;
        if (newCardName.trim().length) {
            this.props.addCard(newCardName);
        }
    }

    render () {
        const { list: { name, cards, newCardName } } = this.props;
        return (
            <div className="c-list">
                <span className="c-list__title">{name}</span>
                <ul>
                    {cards.map((cardName, index) => <Card key={index} name={cardName} />)}
                </ul>
                <input
                    className="c-list__button"
                    onChange={this.saveName}
                    onBlur={this.addCard}
                    placeholder="Add card"
                    value={newCardName}
                />
            </div>
        );
    }
}

List.propTypes = {
    addCard: PropTypes.func,
    saveCardName: PropTypes.func,
    list: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        cards: PropTypes.arrayOf(PropTypes.string),
        newCardName: PropTypes.string,
    }),
};

const mapDispatchToProps = (dispatch, state, props) => ({
    addCard: (newCardName) => {
        const lists = state.lists.map((list) => {
            if (list.id === props.list.id) {
                return {
                    ...list,
                    cards: [...list.cards, newCardName],
                    newCardName: '',
                };
            }
            return list;
        });
        dispatch({
            ...state,
            lists,
        });
    },
    saveCardName: (newCardName) => {
        const lists = state.lists.map((list) => {
            if (list.id === props.list.id) {
                return {
                    ...list,
                    newCardName,
                };
            }
            return list;
        });

        dispatch({
            ...state,
            lists,
        });
    },
});

export default connect(List, { mapDispatchToProps });
