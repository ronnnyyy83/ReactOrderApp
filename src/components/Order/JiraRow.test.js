import React from 'react';
import {shallow} from 'enzyme';
import JiraRow from './JiraRow';

describe('Jira Row', () => {
    it('should render correctly', () => {
        const jiraItem = {
            key : "CC-1",
            fields: { summary: "Noxxx"}
        };
        const jiraRow = shallow(<JiraRow jiraItem={jiraItem} />);
        let jiraItemNo = jiraRow.find('td').at(0);
        expect(jiraItemNo.text()).toEqual('CC-1');

        let jiraItemSummary = jiraRow.find('td').at(1);
        expect(jiraItemSummary.text()).toEqual('Noxxx');
    });
}); 