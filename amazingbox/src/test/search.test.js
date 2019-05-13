import React from 'react';
import Search from "../components/Search"
import { shallow, mount } from 'enzyme';
import Enzyme from 'enzyme';

import Adapter from 'enzyme-adapter-react-16';
import { AssertionError } from 'assert';

Enzyme.configure({ adapter: new Adapter() });

it('test search value', () => {
    const wrapper = shallow(<Search/>)
    let text = "test"
    expect(wrapper.find(".search-bar__text-input").exists()).toEqual(true);
    wrapper.find(".search-bar__text-input").simulate("change", {target:{value: text}});
    expect(wrapper.find(".search-bar__text-input").value).toBe("test");
});

