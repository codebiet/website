import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../state/Store";
import { Redirect, useLocation } from "react-router-dom";
import draftToHtml from "draftjs-to-html";
import DOMPurify from "dompurify";
import axios from "axios";
import Loader from "../Loader/Loader";
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from "reactstrap";
import { InfoContext } from "../../state/Store";
import {
  generateError,
  clearEverything,
  generateSuccess,
} from "../../state/info/infoActions";
import Cookies from "js-cookie";
const months = [
  "JAN",
  "FEB",
  "MAR",
  "APR",
  "MAY",
  "JUNE",
  "JULY",
  "AUG",
  "SEPT",
  "OCT",
  "NOV",
  "DEC",
];
const RegistrationModal = ({ modalOpen, setModalOpen, jobId, setAlert }) => {
  const [error, setError] = useState("");
  const [registering, setRegistering] = useState(false);

  const handleRegister = () => {
    setRegistering(true);
    axios
      .post(`/post/job/${jobId}/register`)
      .then((res) => {
        setRegistering(false);
        setAlert({ type: "SUCCESS", msg: "Applied successfully!" });
        setModalOpen(false);
      })
      .catch((err) => {
        setRegistering(false);
        if (err.response && err.response.data)
          setAlert({ type: "FAILURE", msg: err.response.data.errorMsg });
        else setAlert({ type: "FAILURE", msg: "Something went wrong!" });
        setModalOpen(false);
      });
  };
  const toggle = () => {
    setModalOpen((prev) => !prev);
  };
  function handleApplyNow() {
    handleRegister();
    toggle();
  }

  return (
    <Modal isOpen={modalOpen} toggle={toggle} className="registration-modal">
      <ModalHeader toggle={toggle}>
        Apply
        {registering && <div className="scroller"></div>}
      </ModalHeader>
      <ModalBody>
        <p style={{ color: "red", fontWeight: 600 }}>{error}</p>
        Your profile data will be used for selection process. Complete your
        profile if you haven't done it yet.
      </ModalBody>
      <ModalFooter>
        <Button color="warning" onClick={handleApplyNow}>
          Apply
        </Button>
        <Button color="secondary" onClick={toggle}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};
function JobDetails(props) {
  const auth = useContext(AuthContext);
  const location = useLocation();
  const [redirect, setRedirect] = useState(false);

  const [job, setJob] = useState({});
  const [registrationModalOpen, setRegistrationModalOpen] = useState(false);
  const [alert, setAlert] = useState({});
  const [loading, setLoading] = useState(false);
  const info = useContext(InfoContext);
  useEffect(() => {
    if (alert.msg) {
      if (alert.type == "SUCCESS") info.dispatch(generateSuccess(alert.msg));
      else if (alert.type == "FAILURE") info.dispatch(generateError(alert.msg));
    }
    return () => info.dispatch(clearEverything());
  }, [alert]);
  useEffect(() => {
    setLoading(true);
    axios
      .get(`/api/jobs/${props.match.params.id}`)
      .then((res) => {
        console.log(res.data);
        setLoading(false);
        setJob(res.data);
      })
      .catch((err) => {
        setLoading(false);
        if (err.response && err.response.status == 404)
          props.history.push("/error404");
      });
  }, []);

  const createMarkup = (html) => {
    return {
      __html: DOMPurify.sanitize(html),
    };
  };
  const starts = new Date(job.applyBy);
  const hrs = starts.getHours() % 12 == 0 ? 12 : starts.getHours();
  const hours = hrs < 10 ? "0" + hrs : hrs;
  const minutes =
    starts.getMinutes() < 10 ? "0" + starts.getMinutes() : starts.getMinutes();
  const AM_PM = starts.getHours() < 12 ? "AM" : "PM";
  const year = starts.getFullYear();
  const mnth = months[starts.getMonth()];
  const month = mnth < 10 ? "0" + mnth : mnth;
  const dt = starts.getDate();
  const date = dt < 10 ? "0" + dt : dt;
  const isRegisterDisabled = () => {
    let disabled = new Date() >= new Date(job.applyBy) ? true : false; //verifying previus event;
    disabled = disabled || Cookies.get(props.match.params.id);
    return disabled;
  };
  const toggleApplicationModal = () => {
    if (!auth.state.userLoggedIn) return setRedirect(true);
    setRegistrationModalOpen((prev) => !prev);
  };
  return (
    <>
      {redirect ? (
        <Redirect
          to={{ pathname: "/login", state: { from: location.pathname } }}
        />
      ) : (
        <main className="event-details-main">
          <div className="eventDetails">
            <div className="eventDetailsOuter">
              <div className="eventINnerDiv">
                <div className="eventBody">
                  <div className="eventINfoSection">
                    <h1>{job.title}</h1>
                    <div className="registerDetails">
                      <>
                        <button
                          className="registerButton"
                          onClick={toggleApplicationModal}
                          disabled={isRegisterDisabled()}
                        >
                          Apply Now
                        </button>
                        <RegistrationModal
                          modalOpen={registrationModalOpen}
                          setModalOpen={setRegistrationModalOpen}
                          jobId={props.match.params.id}
                          setAlert={setAlert}
                        />
                      </>
                      <div className="event">
                        <p>
                          <strong>Apply By</strong>
                        </p>
                        <p color="grey">{`${hours}:${minutes} ${AM_PM}, ${date} ${month}, ${year}`}</p>
                      </div>
                      <div className="event">
                        <p>
                          <strong>Domain</strong>
                        </p>
                        <p>{job.department}</p>
                      </div>
                      <div className="event">
                        <p>
                          <strong>work Type</strong>
                        </p>
                        <p>{job.workType}</p>
                      </div>
                      <div className="event">
                        <p>
                          <strong> Work Place </strong>
                        </p>
                        <p>{job.remote ? "Remote" : "Office"}</p>
                      </div>
                      <div className="event">
                        <p>
                          <strong> Stipend </strong>
                        </p>
                        <p>{job.stipend}</p>
                      </div>
                    </div>
                    <div
                      className="detailedContent"
                      dangerouslySetInnerHTML={createMarkup(
                        draftToHtml(JSON.parse(job.jobDescription || "{}"))
                      )}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {loading && <Loader />}
        </main>
      )}
    </>
  );
}

export default JobDetails;
