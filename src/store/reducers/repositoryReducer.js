import * as actionTypes from '../actions/actionTypes';

const initialState = {
    data: null
}

const executeGetDataSuccess = (state, action) => {
    return {
        ...state,
        data: action.data
    }
}
 
const executePutDataSuccess = (state, action) => {
    return {
        ...state
    }
}

const repositoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_DATA_SUCCESS:
            return executeGetDataSuccess(state, action);
        case actionTypes.PUT_DATA_SUCCESS:
            return executePutDataSuccess(state, action);
        default:
            return state;
    }
}
 
export default repositoryReducer;