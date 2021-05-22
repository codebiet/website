import React, { useContext } from "react";
import { InfoContext } from "../state/Store";
import { clearEverything } from "../state/info/infoActions";
const GetCertificateNumber = (props) => {
  const info = useContext(InfoContext);
  const handleInputChange = (event) => {
    props.setCertificateNumber(event.target.value);
    info.dispatch(clearEverything());
  };
  return (
    <div className="getCertificateNumber">
      <header className="header">
        <h1>CERTIFICATE VERIFICATION</h1>
      </header>
      <div className="form-container">
        <form
          className="check-form"
          onSubmit={(event) => props.handleSubmit(event)}
        >
          <div className="input-container">
            <h2>Enter Certificate Number to Verify</h2>
            <input
              type="text"
              placeholder="XXXX-XXXX-XXXX-XXXX-XXXX-XXXX"
              value={props.certificateNumber}
              onChange={(event) => handleInputChange(event)}
            />
          </div>
          <input type="submit" value="CHECK" className="button" />
        </form>
      </div>
    </div>
  );
};
export default GetCertificateNumber;
