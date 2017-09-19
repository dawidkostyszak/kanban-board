import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import { StatelessCard } from '../Card.jsx';

describe('Card component', () => {
    let props;

    beforeEach(() => {
        props = {
            saveCard: jest.fn(),
            removeCard: jest.fn(),
            updateCardName: jest.fn(),
            card: {
                name: 'Test',
                isNew: false,
            },
        };
    });

    it('should render component correctly', () => {
        const wrapper = shallow(<StatelessCard {...props} />);
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('should render input for card name', () => {
        props.card = {
            name: '',
            isNew: true,
        };
        const wrapper = shallow(<StatelessCard {...props} />);
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('should call updateCardName on input change', () => {
        props.card = {
            name: '',
            isNew: true,
        };
        const wrapper = shallow(<StatelessCard {...props} />);
        wrapper.find('.c-new-card__input').simulate(
            'change',
            { target: { value: 'New value' } },
        );
        expect(props.updateCardName).toHaveBeenCalled;
    });

    it('should not call addCard on save button click when name is empty', () => {
        props.card = {
            name: '',
            isNew: true,
        };
        const wrapper = shallow(<StatelessCard {...props} />);
        wrapper.find('.c-button--save').simulate('click');
        expect(props.addCard).not.toHaveBeenCalled;
    });

    it('should call addCard on save button click when value is not empty', () => {
        props.card = {
            name: 'Test',
            isNew: true,
        };
        const wrapper = shallow(<StatelessCard {...props} />);
        wrapper.find('.c-button--save').simulate('click');
        expect(props.addCard).toHaveBeenCalled;
    });

    it('should call removeCard on cancel button click', () => {
        props.card = {
            name: 'Test',
            isNew: true,
        };
        const wrapper = shallow(<StatelessCard {...props} />);
        wrapper.find('.c-button--cancel').simulate('click');
        expect(props.removeCard).toHaveBeenCalled;
    });
});
