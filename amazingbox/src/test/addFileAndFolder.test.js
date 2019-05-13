import React from 'react';
import AddFileAndFolder from "../components/addFileAndFolder"
import { shallow, mount } from 'enzyme';
import Enzyme from 'enzyme';

import Adapter from 'enzyme-adapter-react-16';
import { AssertionError } from 'assert';

Enzyme.configure({ adapter: new Adapter() });

it('test add popup', () => {
    const wrapper = shallow(<AddFileAndFolder/>)
    expect(wrapper.find(".add-popupMenu").exists()).toEqual(false);
    wrapper.find(".add-button").simulate("click");
    expect(wrapper.find(".add-popupMenu").exists()).toEqual(true);
});

