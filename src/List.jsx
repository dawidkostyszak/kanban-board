import React from 'react';
import PropTypes from 'prop-types';

import Card from './Card.jsx';
import connect from './storage.jsx';

class List extends React.Component {
    saveName = (input) => {
        this.props.saveData('cardName', input.target.value);
    }

    addCard = () => {
        const newName = this.props.loadData('cardName');

        if (newName.trim().length) {
            const cards = this.loadCards();
            this.props.saveData(`cards-${this.props.name}`, [...cards, newName]);
        }
        this.props.saveData('cardName', '');
    }

    loadCards = () => this.props.loadData(`cards-${this.props.name}`) || [];

    render () {
        const { name } = this.props;
        const cards = this.loadCards();
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
                    value={this.props.loadData('cardName') || ''}
                />
            </div>
        );
    }
}

List.propTypes = {
    name: PropTypes.string,
    saveData: PropTypes.func,
    loadData: PropTypes.func,
};

export default connect(List);
