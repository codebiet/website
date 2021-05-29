import React, {useEffect, useContext} from "react";
import {AuthContext} from "../state/Store";
import {logOutUser} from "../state/auth/authActions";
import {Redirect} from "react-router-dom";
const Logout = () => {
    const auth = useContext(AuthContext);
    useEffect(() => {
      logOutUser(auth.dispatch);
    },[]);
    return <Redirect to="/login" />;
  };
export default Logout;