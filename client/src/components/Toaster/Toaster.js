import React, { useContext, useState } from "react";
import { InfoContext } from "../../state/Store";
import {
  clearError,
  clearWarning,
  clearSuccess,
} from "../../state/info/infoActions";
// import "./toaster.scss";
const getIcon = (props) => {
  if (props.success) return <i className="fas fa-check-circle" />;
  else if (props.failure) return <i className="fas fa-times-circle" />;
  else return <i className="fas fa-exclamation-circle"></i>;
};
const Toaster = (props) => {
  const info = useContext(InfoContext);
  const [extraStyles, setExtraStyles] = useState({});
  const background = props.success
    ? "#42b883"
    : props.failure
    ? "#ec524b"
    : "#9a69e1";
  const clearMsgs = () => {
    setExtraStyles({ opacity: 0, transition: "all 1s ease" });
    setTimeout(() => {
      info.dispatch(clearError());
      info.dispatch(clearSuccess());
      info.dispatch(clearWarning());
    }, 1000);
  };
  return (
    <div className="toaster-container" style={{ background, ...extraStyles }}>
      <div className="toaster-body">
        <div className="icon-container">{getIcon(props)}</div>
        <div className="text-container">{props.body}</div>
      </div>
      <div className="remover" onClick={clearMsgs}>
        <i className="fas fa-times"></i>
      </div>
    </div>
  );
};
export default Toaster;
