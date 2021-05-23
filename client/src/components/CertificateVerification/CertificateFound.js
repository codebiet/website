import React from "react";
import certificateFound from "../assets/certificateFound.jpg";
import ReactToPdf from "react-to-pdf";
const CertificateFound = React.forwardRef((props, ref) => {
  const getDate = (date) => {
    return date.substring(0, 10).split("-").reverse().join("-");
  };
  return (
    <React.Fragment>
      <div className="certificate-found">
        <div className="data-container">
        <i className="fas fa-check-circle"></i>
          <h1>Congratulations!</h1>
          <p>Your Certificate Number : </p>
          <p>{props.certificateData._id}</p>
          <p>is valid until</p>
          <p>{getDate(props.certificateData.validTill)}</p>
        </div>
        <ReactToPdf
          targetRef={ref}
          filename={
            props.certificateData.name + "certificateVerificationReport"
          }
        >
          {({ toPdf }) => (
            <div className="button-container" onClick={toPdf}>
              <button>Download<i className="fas fa-arrow-circle-down"></i></button>
            </div>
          )}
        </ReactToPdf>
        <img src={certificateFound} alt="" />
      </div>
    </React.Fragment>
  );
});

export default CertificateFound;
