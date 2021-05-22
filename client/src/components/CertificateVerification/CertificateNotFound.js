import React from "react";
import certificateNotFound from "../assets/certificateNotFound.jpg";

const CertificateNotFound = (props) => {
  const handleCheckAgain = () => {
    props.setShowResult(false);
    props.setCertificateFound(false);
  }
  return (
    <div className="certificate-not-found">
      <img src={certificateNotFound} alt="" />
      <div className="message-container">
        <h1>Ouch!!</h1>
        <p>There seems to be no Certificate with this number you provided</p>
      </div>
      <div className="button-container">
        <button onClick={handleCheckAgain}>Check Again</button>
      </div>
    </div>
  );
};
export default CertificateNotFound;