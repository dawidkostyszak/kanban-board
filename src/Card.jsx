import React from 'react';
import PropTypes from 'prop-types';

const Card = (props) => {
    const { name } = props;
    return (
        <li className="c-card">
            <span className="c-card__title">{name}</span>
        </li>
    );
};

Card.propTypes = {
    name: PropTypes.string,
};

export default Card;
