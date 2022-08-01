import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Overall from '../components/Overall';
import Adapter from 'enzyme-adapter-react-16'

Enzyme.configure({ adapter: new Adapter() });
React.useLayoutEffect = React.useEffect;

describe('<Overall />', () => {

    test('should have Overall Standing Page', () => {
        const wrapper = shallow(<Overall />);
        const overall = <h2>Overall Standing 2022</h2>;

        expect(wrapper.html()).toMatchSnapshot();
        expect(wrapper.contains(overall)).toEqual(true);
    });
})
