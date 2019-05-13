import React from 'react';
import AddFileAndFolder from "../components/addFileAndFolder"
import { shallow, mount } from 'enzyme';
import Enzyme from 'enzyme';

import Adapter from 'enzyme-adapter-react-16';
import { AssertionError } from 'assert';

Enzyme.configure({ adapter: new Adapter() });
const wrapper = shallow(<AddFileAndFolder/>)

it('test add popup', () => {
    expect(wrapper.find(".add-popupMenu").exists()).toEqual(false);
    wrapper.find(".add-button").simulate("click");
    expect(wrapper.find(".add-popupMenu").exists()).toEqual(true);
});

it("test input for folder name", ()=>{
    wrapper.find(".add-button").simulate("click");
    wrapper.find(".add-folderButton").simulate("click");
    expect(wrapper.find(".modal__shadow__input").exists()).toEqual(true);
    wrapper.find(".modal__shadow__input").simulate("change", {target:{value: "testing folder input"}});
    //check input value
})

