import axios from "axios";
import {
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGIN_REQUEST,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  RECOVER_REQUEST,
  RECOVER_SUCCESS,
  RECOVER_ERROR,
  SIGNUP_ERROR,
  LOAD_USER_SUCCESS,
  LOAD_USER_ERROR,
  LOGOUT_SUCCESS,
  CLEAR_MSGS,
  SEND_VERIFICATION_EMAIL_REQUEST,
  SEND_VERIFICATION_EMAIL_SUCCESS,
} from "./authConsts";
import Cookies from "js-cookie";
const END_POINT = "";

export const loginRequest = () => ({ type: LOGIN_REQUEST });
export const loginError = (err) => ({ type: LOGIN_ERROR, payload: err });
export const loginSuccess = (userData) => ({
  type: LOGIN_SUCCESS,
  payload: userData,
});

export const signupRequest = () => ({ type: SIGNUP_REQUEST });
export const signupError = (err) => ({ type: SIGNUP_ERROR, payload: err });
export const signupSuccess = (userData) => ({
  type: SIGNUP_SUCCESS,
  payload: userData,
});

export const recoverRequest = () => ({ type: RECOVER_REQUEST });
export const recoverError = (err) => ({ type: RECOVER_ERROR, payload: err });
export const recoverSuccess = (msg) => ({
  type: RECOVER_SUCCESS,
  payload: msg,
});

export const loadUserSuccess = (data) => ({
  type: LOAD_USER_SUCCESS,
  payload: data,
});
export const loadUserError = (err) => ({ type: LOAD_USER_ERROR, payload: err });

export const clearMsgs = () => ({ type: CLEAR_MSGS });

export const logOut = () => ({ type: LOGOUT_SUCCESS });

export const sendVerificationEmailRequest = () => ({
  type: SEND_VERIFICATION_EMAIL_REQUEST,
});
export const sendVerificationEmailSuccess = () => ({
  type: SEND_VERIFICATION_EMAIL_SUCCESS,
});

export const logOutUser = (dispatch) => {
  dispatch(logOut());
  Cookies.remove("token");
  Cookies.remove("userId");
  Cookies.remove("emailVerified");
  Cookies.remove("phoneNumberVerified");
  Cookies.remove("userName");
  Cookies.remove("userLoggedIn");
};

// export const loadUser = (dispatch, state) => {
//   const config = getConfig(state);
//   axios
//     .get(`${END_POINT}/api/loadUser`, config)
//     .then((res) => {
//       dispatch(loadUserSuccess(res.data));
//     })
//     .catch((err) => {
//         if(err.response && err.response.data && err.response.data.errorMsg == 'Invalid Token!')
//             dispatch(loadUserError(""));
//       console.log(err);
//     });
// };
// export const getConfig = (state) => {
//   const token = state.token;
//   const config = {
//     headers: {
//       "Content-type": "application/json",
//     },
//   };
//   if (token) {
//     config.headers["x-auth-token"] = token;
//   }
//   return config;
// };

export const loginUser = (dispatch, body) => {
  dispatch(loginRequest());
  axios
    .post(`${END_POINT}/post/login`, body)
    .then((response) => {
      const userData = response.data;
      console.log(userData);
      dispatch(loginSuccess(userData));
    })
    .catch((err) => {
      if (err.response) {
        console.log(err.response);
        dispatch(loginError(err.response.data.errorMsg));
      } else dispatch(loginError("Something went wrong"));
    });
};

export const signupUser = (dispatch, body) => {
  dispatch(signupRequest());
  axios
    .post(`${END_POINT}/post/register`, body)
    .then((response) => {
      const userData = response.data;
      console.log(userData);
      dispatch(signupSuccess(userData));
    })
    .catch((err) => {
      if (err.response) {
        console.log(err.response);
        dispatch(signupError(err.response.data.errorMsg));
      } else dispatch(signupError("Something went wrong!"));
      // console.log("err.response : ",err.response," err.response.data ",err.response.data," err.response.data.errorMsg ",err.response.data.errorMsg," and error is : ",err);
    });
};

export const sendVerificationEmail = (dispatch) => {
  dispatch(sendVerificationEmailRequest());
  axios
    .get(`${END_POINT}/api/sendVerificationEmail`)
    .then((res) => {
      dispatch(sendVerificationEmailSuccess());
    })
    .catch((err) => {
      console.log(err);
    });
};

export const recoverUser = (dispatch, body) => {
  dispatch(recoverRequest());
  axios
    .post(`${END_POINT}/post/recoverPassword`, body)
    .then((responce) => {
      const data = responce.data;
      dispatch(recoverSuccess(data.msg));
    })
    .catch((err) => {
      if (err.response) dispatch(recoverError(err.response.data.errorMsg));
      else dispatch(recoverError("Something went wrong!"));
    });
};
