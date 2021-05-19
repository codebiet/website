import { GENERATE_ERROR_MSG,CLEAR_ERROR,GENERATE_WARNING_MSG, CLEAR_WARNING, GENERATE_SUCCESS_MSG, CLEAR_SUCCESS, CLEAR_EVERYTHING } from './infoConsts';
export const generateError = (err) => ({type:GENERATE_ERROR_MSG,payload:err});
export const clearError = () => ({type:CLEAR_ERROR});

export const generateWarning = (warning) => ({type:GENERATE_WARNING_MSG,payload:warning});
export const clearWarning = () => ({type:CLEAR_WARNING});

export const generateSuccess = (success) => ({type:GENERATE_SUCCESS_MSG,payload:success});
export const clearSuccess = () => ({type:CLEAR_SUCCESS});

export const clearEverything = () => ({type:CLEAR_EVERYTHING});