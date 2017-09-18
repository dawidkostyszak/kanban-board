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
        const cards = this.props.loadData('cards');
        this.props.saveData('cards', [...cards, newName]);
        this.props.saveData('cardName', '');
    }

    render () {
        const { name } = this.props;
        const cards = this.props.loadData('cards') || [];
        return (
            <div>
                {name}
                <ul>
                    {cards.map((cardName, index) => <Card key={index} name={cardName}/>)}
                </ul>
                <input
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
