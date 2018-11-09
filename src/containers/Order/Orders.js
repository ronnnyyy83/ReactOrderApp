import React, { Component } from 'react';
import { Table, Col, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import * as repositoryActions from '../../store/actions/repositoryActions';
import OrderRow from '../../components/Order/OrderRow';
import * as constants from '../../constants'; 
 
class Orders extends Component {

    componentDidMount = () => {
        let url = constants.orderUrl;
        this.props.onGetData(url, { ...this.props });
    }

    render() {
        let orders = [];
        if (this.props.data && this.props.data.length > 0) {
            orders = this.props.data.map((order) => {
                return (
                    <OrderRow key={order.orderId} order={order} {...this.props} />
                )
            })
        }
        return (
            <div>
                <Row>
                    <Col md={12}>
                        <Table responsive striped>
                            <thead>
                                <tr>
                                    <th>Order No</th>
                                    <th>Customer Name</th>
                                    <th>Price</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </div>
        )
    }
}
 
const mapStateToProps = (state) => {
    return {
        data: state.repository.data
    }
}
 
const mapDispatchToProps = (dispatch) => {
    return {
        onGetData: (url, props) => dispatch(repositoryActions.getData(url, props))
    }
}
 
export default connect(mapStateToProps, mapDispatchToProps)(Orders);