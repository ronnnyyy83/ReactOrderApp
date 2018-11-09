import * as actionTypes from '../actions/actionTypes';

const initialState = {
    data: null
}

const executeGetJiraDataSuccess = (state, action) => {
    return {
        ...state,
        data: action.data
    }
}

const jiraReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_JIRA_DATA_SUCCESS:
            return executeGetJiraDataSuccess(state, action);
        default:
            return state;
    }
}
 
export default jiraReducer;