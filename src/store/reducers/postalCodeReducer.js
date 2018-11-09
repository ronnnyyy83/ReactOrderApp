import * as actionTypes from '../actions/actionTypes';

const initialState = {
    data: null
}

const executeGetPostalCodeValidationDataSuccess = (state, action) => {
    return {
        ...state,
        data: action.data
    }
}

const postalCodeReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_POSTALCODE_VALIDATION_DATA_SUCCESS:
            return executeGetPostalCodeValidationDataSuccess(state, action);
        default:
            return state;
    }
}
 
export default postalCodeReducer;