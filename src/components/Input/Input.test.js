import React from 'react';
import {mount} from 'enzyme';
import Input from './Input';

describe('Input', () => {
    it('should show value correctly', () => {
        const props = {
            id: "1",
            name : "testInput",
            type: "text",
            value : "Input Value",
            onChanged: () =>{}
        };
        const inputEl = mount(<Input {...props} />);
        let inputItem = inputEl.find('input').props();
        expect(inputItem.value).toEqual('Input Value');
    });

    it('should disable input', () => {
        const props = {
            id: "1",
            name : "testInput",
            type: "text",
            value : "Input Value",
            onChanged: () =>{}
        };
        const inputEl = mount(<Input {...props} isDisabled />);
        let inputItem = inputEl.find('input').props();
        expect(inputItem).toHaveProperty('disabled');
    });

    it('should show error on input', () => {
        const props = {
            id: "1",
            name : "testInput",
            type: "text",
            value : "Input Value",
            onChanged: () =>{},
            errorMessage: "This field can not be empty"

        };
        const inputEl = mount(<Input {...props} />);
        let inputItemContainer = inputEl.find('div').at(0);
        expect(inputItemContainer.hasClass("has-error")).toEqual(true);

        let inputItem = inputEl.find('div.alert');
        expect(inputItem.text()).toEqual('This field can not be empty');
    });
}); 