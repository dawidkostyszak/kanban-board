import React from 'react';
import PropTypes from 'prop-types';

const Card = (props) => {
    const { name } = props;
    return (
        <li>
            {name}
        </li>
    );
};

Card.propTypes = {
    name: PropTypes.string,
};

export default Card;
