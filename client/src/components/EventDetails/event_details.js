import React, { useEffect, useState, lazy } from "react";
import draftToHtml from "draftjs-to-html";
import DOMPurify from "dompurify";
import axios from "axios";
import Loader from "../Loader/Loader";
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
function Event_details(props) {
  const [event, setEvent] = useState({});
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    axios
      .get(`/api/events/${props.match.params.id}`)
      .then((res) => {
        console.log(res.data.event);
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
                  <div className="registerButton">Register Now</div>
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
