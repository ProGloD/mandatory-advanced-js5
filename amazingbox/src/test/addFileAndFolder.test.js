import React from 'react';
import AddFileAndFolder from "../components/addFileAndFolder"
import { shallow, mount } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';


Enzyme.configure({ adapter: new Adapter()})
const expect = require('chai').expect;


it('test add popup', () => {
    const wrapper = shallow(<AddFileAndFolder/>)
    expect(wrapper.find(".add-popupMenu").exists()).to.equal(false);
    wrapper.find(".add-button").simulate("click");
    expect(wrapper.find(".add-popupMenu").exists()).to.equal(true);
});

it("test input popup", ()=>{
    const wrapper = shallow(<AddFileAndFolder/>)
    wrapper.find(".add-button").simulate("click");
    wrapper.find(".add-folderButton").simulate("click");
    expect(wrapper.find(".modal__shadow__input").exists()).to.equal(true);
})

