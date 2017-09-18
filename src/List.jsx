import React from 'react';
import PropTypes from 'prop-types';

import Card from './Card.jsx';

class List extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            name: '',
            cards: [],
        };
    }

    saveName = (input) => {
        this.setState({ name: input.target.value });
    }

    addCard = () => {
        this.setState((oldState) => ({
            name: '',
            cards: [
                ...oldState.cards,
                oldState.name,
            ],
        }));
    }

    render () {
        const { name } = this.props;
        return (
            <div>
                {name}
                <ul>
                    {this.state.cards.map((cardName, index) => <Card key={index} name={cardName}/>)}
                </ul>
                <input
                    onChange={this.saveName}
                    onBlur={this.addCard}
                    placeholder="Add card"
                    value={this.state.name}
                />
            </div>
        );
    }
}

List.propTypes = {
    name: PropTypes.string,
};

export default List;
