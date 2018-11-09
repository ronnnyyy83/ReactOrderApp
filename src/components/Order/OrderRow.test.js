import React from 'react';
import {shallow} from 'enzyme';
import OrderRow from './OrderRow';

describe('Order Row', () => {
    it('should render correctly', () => {
        const order = {
            orderId : "1",
            orderNo: "Noxxx",
            price: "111",
            name: "testXXX",
            lastName: "testlastXXX"
        };
        const orderRow = shallow(<OrderRow order={order} />);
        let orderItemNo = orderRow.find('td').at(0);
        expect(orderItemNo.text()).toEqual('Noxxx');

        let orderItemName = orderRow.find('td').at(1);
        expect(orderItemName.text()).toEqual('testXXX testlastXXX');

        let orderItemPrice = orderRow.find('td').at(2);
        expect(orderItemPrice.text()).toEqual('111 euro');
    });
}); 