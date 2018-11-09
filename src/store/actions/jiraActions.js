import * as actionTypes from './actionTypes';
import axios from '../../tools/axios/axios';

//Postal Code Validation
const getJiraDataSuccess = (data) => {
    return {
        type: actionTypes.GET_JIRA_DATA_SUCCESS,
        data: data
    }
}
 
export const getJiraData = (url, props) => {
    return (dispatch) => {
        return axios.get(url)
        .then(response => {
            dispatch(getJiraDataSuccess(response.data));
            return Promise.resolve(response);
        })
        .catch(error => {
            //TODO: handle the error when implemented
        })
    }
}

