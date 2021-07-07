import React, { useEffect, useState, useContext, lazy } from "react";
import draftToHtml from "draftjs-to-html";
import DOMPurify from "dompurify";
import axios from "axios";
import Loader from "../Loader/Loader";
import {
  FormGroup,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Button,
} from "reactstrap";
import { InfoContext } from "../../state/Store";
import {
  generateError,
  clearEverything,
  generateSuccess,
} from "../../state/info/infoActions";
import Cookies from "js-cookie";
// const Loader = lazy(() => import("../Loader/Loader"));
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
const RegistrationModal = ({ modalOpen, setModalOpen, eventId, setAlert }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [registering, setRegistering] = useState(false);
  const verifyDetails = () => {
    const emailRegex =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!email || !name) return "Please fill in all the fields!";
    else if (name.length < 3) return "Name field too short!";
    else if (!emailRegex.test(email)) return "Invalid Email!";
  };
  const handleRegister = () => {
    const msg = verifyDetails();
    if (msg) return setError(msg);
    setRegistering(true);
    axios
      .post(`/post/event/${eventId}/register`, { name, email })
      .then((res) => {
        setRegistering(false);
        setAlert({
          type: "SUCCESS",
          msg: "Registered successfully! An Email will be sent to you before the event starts. Check your inbox or spam.",
        });
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
  return (
    <Modal isOpen={modalOpen} toggle={toggle} className="registration-modal">
      <ModalHeader toggle={toggle}>
        Register
        {registering && <div className="scroller"></div>}
      </ModalHeader>
      <ModalBody>
        <p style={{ color: "red", fontWeight: 600 }}>{error}</p>
        <FormGroup>
          <label className="fontType" htmlFor="name">
            Name
          </label>
          <input
            id="name"
            type="text"
            className="form-control"
            value={name}
            placeholder="Enter your Name"
            onChange={(e) => setName(e.target.value)}
            autoComplete="off"
          />
        </FormGroup>
        <FormGroup>
          <label className="fontType" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            className="form-control"
            value={email}
            placeholder="Enter your Email"
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="off"
          />
        </FormGroup>
      </ModalBody>
      <ModalFooter>
        <Button
          color="warning"
          className="default-btn"
          onClick={handleRegister}
        >
          Register
        </Button>
        <Button color="secondary" onClick={toggle}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};
function Event_details(props) {
  const [event, setEvent] = useState({});
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
      .get(`/api/events/${props.match.params.id}`)
      .then((res) => {
        // console.log(res.data.event);
        setLoading(false);
        setEvent(res.data.event);
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
  const starts = new Date(event.startsOn);
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
    let disabled = new Date() >= new Date(event.startsOn) ? true : false; //verifying previus event;
    disabled = disabled || Cookies.get(props.match.params.id);
    return disabled;
  };
  return (
    <main className="event-details-main">
      <div className="eventDetails">
        <div className="eventDetailsOuter">
          <div className="eventINnerDiv">
            <div className="headerImage">
              <img src={event.banner} alt="svg" />
            </div>
            <div className="eventBody">
              <div className="eventINfoSection">
                <h1>{event.name}</h1>
                <div className="registerDetails">
                  <>
                    <button
                      className="registerButton"
                      onClick={() => setRegistrationModalOpen((prev) => !prev)}
                      disabled={isRegisterDisabled()}
                    >
                      Register Now
                    </button>
                    <RegistrationModal
                      modalOpen={registrationModalOpen}
                      setModalOpen={setRegistrationModalOpen}
                      eventId={props.match.params.id}
                      setAlert={setAlert}
                    />
                  </>
                  <div className="event">
                    <p>
                      <strong>Starts On</strong>
                    </p>
                    <p color="grey">{`${hours}:${minutes} ${AM_PM}, ${date} ${month}, ${year}`}</p>
                  </div>
                  <div className="event">
                    <p>
                      <strong>Donation</strong>
                    </p>
                    <p>{event.entryFee}</p>
                  </div>
                  <div className="event">
                    <p>
                      <strong>Venue</strong>
                    </p>
                    <p>{event.venue}</p>
                  </div>
                </div>
                <div
                  className="detailedContent"
                  dangerouslySetInnerHTML={createMarkup(
                    draftToHtml(JSON.parse(event.details || "{}"))
                  )}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {loading && <Loader />}
    </main>
  );
}

export default Event_details;
