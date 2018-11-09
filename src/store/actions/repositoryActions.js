import * as actionTypes from './actionTypes';
import axios from '../../tools/axios/axios';

///GET///
const getDataSuccess = (data) => {
    return {
        type: actionTypes.GET_DATA_SUCCESS,
        data: data
    }
}
 
export const getData = (url, props) => {
    return (dispatch) => {
        return axios.get(url)
        .then(response => {
            dispatch(getDataSuccess(response.data));
            return Promise.resolve(response);
        })
        .catch(error => {
            //TODO: handle the error when implemented
        })
    }
}

///PUT///
const putDataSuccess = (response) => {
    return {
        type: actionTypes.PUT_DATA_SUCCESS,
        response: response
    }
}
 
export const putData = (url, obj, props) => {
    return (dispatch) => {
        return axios.put(url, obj)
        .then(response => {
            dispatch(putDataSuccess(response));
            return Promise.resolve(response);
        })
        .catch(error => {
            //TODO: handle the error when implemented
        })
    }
}
