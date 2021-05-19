import { GENERATE_ERROR_MSG, CLEAR_ERROR,GENERATE_WARNING_MSG, GENERATE_SUCCESS_MSG, CLEAR_SUCCESS, CLEAR_WARNING, CLEAR_EVERYTHING } from "./infoConsts";

const initialState = {
    error:'',
    warning:'',
    success:''
}

const infoReducer = (state = initialState,action) => {
    console.log(action);
    switch(action.type){
        case GENERATE_ERROR_MSG:
            return {warning:'',success:'',error:action.payload};
        case GENERATE_SUCCESS_MSG:
            return {warning:'',error:'',success:action.payload};
        case GENERATE_WARNING_MSG:
            return {error:'',success:'',warning:action.payload};
        case CLEAR_ERROR:
        case CLEAR_SUCCESS:
        case CLEAR_WARNING:
        case CLEAR_EVERYTHING:
            return {success:'',warning:'',error:''};
        default:
            return state;
    }
}

export {infoReducer,initialState as initialInfoState};