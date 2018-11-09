import React, { Component } from 'react';
import { Form, Well, Button, FormGroup, Col, Row, Table } from 'react-bootstrap';
import * as repositoryActions from '../../store/actions/repositoryActions';
import * as postalCodeActions from '../../store/actions/postalCodeActions';
import * as jiraActions from '../../store/actions/jiraActions';
import { connect } from 'react-redux';
import toastr from 'toastr';
import Input from '../../components/Input/Input';
import './OrderDetails.css';
import JiraRow from '../../components/Order/JiraRow';
import * as constants from '../../constants'; 
 
class OrderDetails extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            order: {
                orderId : "",
                orderNo: "",
                price: "",
                name: "",
                lastName: "",
                postCode: "",
                houseNumber: "",
                street: "",
                city: ""
            },
            error: {
                postCode: "",
                houseNumber: ""
            },
            jiraItems: [],
            isFormValid: false
        }

        this.onInputChanged = this.onInputChanged.bind(this);
    }
    
    componentDidMount = () => {
        const id = this.props.match.params.id;
        const url = constants.orderUrl + id;
        this.props.onGetOrderById(url, { ...this.props })
        .then((response) => {
            const urlJira = constants.jiraUrl + response.data.orderNo;
            this.props.onGetJiraItems(urlJira, { ...this.props })
            .then((responseJira) => {
                this.setState({jiraItems : responseJira.data.issues});
            });
        });        
    }

    componentWillReceiveProps = (nextProps) => {
        let order = { ...nextProps.data };
        this.setState({order : {...order}});
    }

    validatePostCode = () => {        
        const postCode = this.state.order.postCode;
        const houseNumber = this.state.order.houseNumber;

        if(postCode.length > 0 && houseNumber.length > 0){
            const url = constants.postalCodeUrl + postCode + '/' + houseNumber;
            this.props.onGetPostalCodeAddress(url, { ...this.props })
            .then((response) => {
                if(response.status === 200 && response.data._embedded.addresses.length > 0){
                    const addr = response.data._embedded.addresses[0];
                    let order = this.state.order;
                    order.street = addr.street;
                    order.city = addr.city.label;
                    this.setState({order:order, isFormValid : true});
                }
                else{
                    toastr.error("Postal and house number is not correct"); 
                }
            });
        }        
    }
    
    onInputChanged = (event) => {
        this.setState({isFormValid : false});
        const field = event.target.name;
        let order = this.state.order;
        order[field] = event.target.value;

        let errorCounter = this.state.errorCounter;
        let error = this.state.error;
        error[field] = "";
        if(event.target.value.length === 0){
            error[field] = "This field can not be empty";
        }
        
        return this.setState({order:order, error: error, errorCounter: errorCounter});
    }

    updateOrder = (event) => {
        event.preventDefault();
        const url = constants.orderUrl + this.props.data.orderId;
        this.props.onUpdateOrder(url, this.state.order, {...this.props})
        .then(() => {
            toastr.success('Order updated successfully!');
            this.setState({isFormValid : false});
        })
        .catch(error => {
            toastr.error(error);
        });        
    }
 
    render() { 
        let jiraItems = [];
        if (this.state.jiraItems && this.state.jiraItems.length > 0) {
            jiraItems = this.state.jiraItems.map((jiraItem) => {
                return (
                    <JiraRow key={jiraItem.key} jiraItem={jiraItem} {...this.props} />
                )
            })
        }

        return (            
            <div>  
                <Well className="orderDetails">
                    <h3>Order Details</h3>
                    <Form horizontal onSubmit={this.updateOrder}>
                        <Input value={this.state.order.orderNo} 
                        label="Order No" name="orderNo" type="text" isDisabled/>
                        <Input value={this.state.order.price} 
                        label="Price" name="price" type="text" isDisabled/>
                        <Input value={this.state.order.name} 
                        label="Customer Name" name="name" type="text" isDisabled/>                    
                        <Input value={this.state.order.lastName} 
                        label="Customer Last Name" name="lastname" type="text" isDisabled/>
                        <Input value={this.state.order.postCode} 
                        label="Postal Code" name="postCode" type="text" onChanged={this.onInputChanged}
                        onBlured={this.validatePostCode} errorMessage={this.state.error.postCode}/>
                        <Input value={this.state.order.houseNumber} 
                        label="House Number" name="houseNumber" type="text" onChanged={this.onInputChanged}
                        onBlured={this.validatePostCode} errorMessage={this.state.error.houseNumber}/>
                        <Input value={this.state.order.street} 
                        label="Street" name="street" type="text" isDisabled/>
                        <Input value={this.state.order.city} 
                        label="City" name="city" type="text" isDisabled/>
                        <br />
                        <FormGroup>
                            <Col mdOffset={7} md={1}>
                                <Button type='submit' bsStyle='info' disabled={!this.state.isFormValid > 0}>Update</Button>
                            </Col>
                        </FormGroup>
                    </Form>
                </Well>
                <h3>Related Jira Items</h3>                
                <Row>
                    <Col md={12}>
                        <Table responsive striped>
                            <thead>
                                <tr>
                                    <th>Jira ID</th>
                                    <th>Title</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {jiraItems}
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
        onGetOrderById: (url, props) => dispatch(repositoryActions.getData(url, props)),
        onUpdateOrder: (url, order, props) => dispatch(repositoryActions.putData(url, order, props)),
        onGetPostalCodeAddress: (url, props) => dispatch(postalCodeActions.getPostalCodeValidationData(url, props)),
        onGetJiraItems: (url, props) => dispatch(jiraActions.getJiraData(url, props))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderDetails);