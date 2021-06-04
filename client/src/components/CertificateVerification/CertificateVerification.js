import React, { useState, useEffect, useContext, lazy } from "react";
import axios from "axios";
const Nav = lazy(() => import("../Navbar/Nav"));
import Footer from "../Footer/Footer";
import { InfoContext } from "../../state/Store";
import {
  generateError,
  generateWarning,
  clearEverything,
} from "../../state/info/infoActions";
import Loader from "../Loader/Loader";
import CertificateFoundComponent from "./CertificateFound";
import CertificateNotFoundComponent from "./CertificateNotFound";
import GetCertificateNumber from "./GetCertificateNumber";
import CertificateVerificationReport from "./CertificateVerificationReport";
// import "./certificateVerification.scss";
const CertificateVerification = (props) => {
  const [loading, setLoading] = useState(false);
  const [certificateNumber, setCertificateNumber] = useState("");
  const [certificateData, setCertificateData] = useState({});
  const [certificateFound, setCertificateFound] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const info = useContext(InfoContext);
  const ref = React.createRef();
  useEffect(() => {
    return info.dispatch(clearEverything());
  }, []);
  const handleSubmit = (event) => {
    info.dispatch(clearEverything());
    if (!certificateNumber) {
      info.dispatch(generateWarning("Please Enter the Certificate Number"));
    } else {
      setLoading(true);
      axios
        .post("/post/verifyCertificate", {
          certificateNumber,
        })
        .then((res) => {
          console.log("res.data.certificateData : ", res.data.certificateData);
          setCertificateData(res.data.certificateData);
          setCertificateFound(true);
          setShowResult(true);
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
          console.log(err.response);
          if (err.response.status == 500) {
            info.dispatch(
              generateError("Internal Server Error! Please try again.")
            );
          } else {
            setCertificateFound(false);
            setShowResult(true);
          }
        });
    }
    event.preventDefault();
  };
  return (
    <React.Fragment>
      <Nav />
      {showResult && (
        <div className="verification-result-container">
          {certificateFound && (
            <CertificateFoundComponent
              certificateData={certificateData}
              ref={ref}
            />
          )}
          {!certificateFound && (
            <CertificateNotFoundComponent
              setShowResult={setShowResult}
              setCertificateFound={setCertificateFound}
            />
          )}
        </div>
      )}
      {!showResult && (
        <GetCertificateNumber
          handleSubmit={handleSubmit}
          setCertificateNumber={setCertificateNumber}
          certificateNumber={certificateNumber}
        />
      )}
      {loading && <Loader />}
      {certificateFound && (
        <div className="verfication-report-container">
          <CertificateVerificationReport ref={ref} certificateData={certificateData} />
        </div>
      )}
      <Footer />
    </React.Fragment>
  );
};
export default CertificateVerification;
