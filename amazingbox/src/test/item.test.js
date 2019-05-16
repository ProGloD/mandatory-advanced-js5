import React from 'react';
import Item from "../components/Item"
import { shallow, mount } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });
const expect = require('chai').expect

function mockItem(overrides) {
        return {tag: "folder", name: "why", path_lower: "/why", path_display: "/why", id: "id:ot7kLZCYEc4AAAAAAAAAQg"}
}

it('test search value to be true', () => {
    const wrapper = shallow(<Item file={mockItem()}/>)
    expect(wrapper.find(".td-menuButton").exists()).to.equal(true);
    expect(wrapper.find("ItemMenu").exists()).to.equal(false);
    wrapper.find(".td-menuButton").simulate("click") //får ett fel som säger att click är till för en node men körs på 2
    expect(wrapper.find("ItemMenu").exists()).to.equal(true);  

});

