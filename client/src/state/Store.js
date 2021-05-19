import React, { useReducer } from "react";
import { initialAuthState, authReducer } from "./auth/authReducer";
import { infoReducer, initialInfoState } from "./info/infoReducer";
export const AuthContext = React.createContext();
export const InfoContext = React.createContext();
function Store(props) {
  const [auth, dispatch] = useReducer(authReducer, initialAuthState);
  const [info, dispatchInfo] = useReducer(infoReducer, initialInfoState);
  return (
    <AuthContext.Provider value={{ state: auth, dispatch }}>
      <InfoContext.Provider value={{ state: info, dispatch: dispatchInfo }}>
        {props.children}
      </InfoContext.Provider>
    </AuthContext.Provider>
  );
}
export default Store;
