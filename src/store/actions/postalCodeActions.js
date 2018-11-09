import * as actionTypes from './actionTypes';
import axios from '../../tools/axios/axios';

//Postal Code Validation
const getPostalCodeValidationDataSuccess = (data) => {
    return {
        type: actionTypes.GET_POSTALCODE_VALIDATION_DATA_SUCCESS,
        data: data
    }
}
 
export const getPostalCodeValidationData = (url, props) => {
    return (dispatch) => {
        return axios.get(url)
        .then(response => {
            dispatch(getPostalCodeValidationDataSuccess(response.data));
            return Promise.resolve(response);
        })
        .catch(error => {
            //TODO: handle the error when implemented
        })
    }
}

