import React from 'react';
import Search from "../components/Search"
import { shallow, mount } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });
const expect = require('chai').expect

it('test search value to be true', () => {
    const wrapper = shallow(<Search/>)
    expect(wrapper.find(".search-bar__text-input").exists()).to.equal(true);
    wrapper.find(".search-bar__text-input").simulate("change", {target:{value: "test"}});
    expect(wrapper.find(".search-bar__text-input").prop("value")).to.equal("test");  
});

