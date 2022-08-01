import React from 'react';
import { render, screen } from '@testing-library/react';
import Enzyme, { shallow } from 'enzyme';
import Overall from '../components/Overall';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });
React.useLayoutEffect = React.useEffect;

describe('<Overall />', () => {

    test('should have Overall Standing Page', () => {
        const wrapper = shallow(<Overall />);

        expect(wrapper.html()).toMatchSnapshot();
    });


})
