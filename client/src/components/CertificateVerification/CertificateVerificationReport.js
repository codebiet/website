import React, { useEffect } from "react";
import codeLogo from "../assets/codeLogo.jpg";
const CertificateVerificationReport = React.forwardRef(({certificateData}, ref) => {
  useEffect(() => {
    const clipBodyHeight = () => {
      document.getElementById("app").style.height = "100vh";
    };
    const unclipBodyHeight = () => {
      document.getElementById("app").style.height = "unset";
    };
    clipBodyHeight();
    return () => unclipBodyHeight();
  }, []);
  return (
    <div className="report-page" ref={ref}>
      <div className="logo-container">
        <img src={codeLogo} al="" />
      </div>
      <div className="report-body">
        <h1>
          Certificate Verification Report
        </h1>
        <table>
          <tbody>
            <tr>
              <td>Name</td>
              <td>{certificateData.name}</td>
            </tr>
            <tr>
              <td>Certificate Number</td>
              <td>{certificateData._id}</td>
            </tr>
            <tr>
              <td>Issued on</td>
              <td>{certificateData.issuedOn.substring(0,10).split("-").reverse().join("-")}</td>
            </tr>
            <tr>
              <td>Valid Till</td>
              <td>{certificateData.validTill.substring(0,10).split("-").reverse().join("-")}</td>
            </tr>
            <tr>
              <td>College</td>
              <td>{certificateData.collegeName+", "+certificateData.collegeCity}</td>
            </tr>
            <tr>
              <td>Event</td>
              <td>{certificateData.event}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="pioneers-container">
        <div className="CEOs">
          <div>
            <h2>Ritesh Rai</h2>
            <span>CEO</span>
          </div>
          <div>
            <h2>Samarth Agrawal</h2>
            <span>CEO</span>
          </div>
          <div>
            <h2>Rajat Saxena</h2>
            <span>CEO</span>
          </div>
        </div>
        <div className="executives">
          <div>
            <h2>Vipin Gautam</h2>
            <span>Executive Founder</span>
          </div>
          <div>
            <h2>Manal Jain</h2>
            <span>Executive Founder</span>
          </div>
          <div>
            <h2>Tanu Agrawal</h2>
            <span>Executive Founder</span>
          </div>
        </div>
      </div>
    </div>
  );
});
export default CertificateVerificationReport;
