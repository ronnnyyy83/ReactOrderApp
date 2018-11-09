import React from 'react';
import { FormControl, ControlLabel, FormGroup, Col } from 'react-bootstrap';

const Input = (props) => {
    let errorClass = '';
    if(props.errorMessage && props.errorMessage.length > 0){
        errorClass = ' has-error';
    }

    return (  
        <FormGroup className={errorClass} controlId={props.id}>
            <Col componentClass={ControlLabel} sm={2}>
                {props.label}
            </Col>
            <Col sm={6}>
                <FormControl  
                name={props.name} 
                type={props.type} 
                value={props.value} 
                placeholder={props.placeholder}
                disabled={props.isDisabled ? "disabled" : false}
                onChange={props.onChanged} 
                onBlur={props.onBlured}
                />
            </Col>
            <Col sm={4}>
            {props.errorMessage && <div className="alert alert-danger">{props.errorMessage}</div>}
            </Col>
        </FormGroup>
    )
}

export default Input;