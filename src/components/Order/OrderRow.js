import React from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import { Button } from 'react-bootstrap';
  
const redirectToUpdateOrder = (id, history) => {
    history.push('/order/' + id);
}
 
const OrderRow = (props) => {
    return (
        <Aux>
            <tr>
                <td>{props.order.orderNo}</td>
                <td>{`${props.order.name} ${props.order.lastName}`}</td>
                <td>{`${props.order.price} euro`}</td>
                <td>
                    <Button bsStyle="success" onClick={() => redirectToUpdateOrder(props.order.orderId, props.history)}>Update</Button>
                </td>
            </tr>
        </Aux>
    )
}
 
export default OrderRow;