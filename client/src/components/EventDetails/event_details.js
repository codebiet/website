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
  const hours = starts.getHours() % 12 == 0 ? 12 : starts.getHours();
  const minutes = starts.getMinutes();
  const AM_PM = starts.getHours() < 12 ? "AM" : "PM";
  const year = starts.getFullYear();
  const month = months[starts.getMonth()];
  const date = starts.getDate();
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
                    <p>Starts On</p>
                    <p color="grey">{`${hours}:${minutes} ${AM_PM}, ${date} ${month}, ${year}`}</p>
                  </div>
                  <div className="event">
                    <p>Donation</p>
                    <p>{event.entryFee}</p>
                  </div>
                  <div className="event">
                    <p>Venue</p>
                    <p>{event.venue}</p>
                  </div>
                </div>

                {/* <div className="detailedContent">
                  <h2>DESCRIPTION</h2>
                  <div className="description">
                    <div>
                      <span>
                        As India grapples with the second wave of COVID-19, we
                        at Coding Ninjas, have come up with an exclusive
                        initiative wherein you get a chance to not only create a
                        bright future for yourself, but for others as well,
                        through our exclusive Fund-Raising LIVE Masterclass on
                        "Recursion for Humanity" and FAANG Interview Problems on
                        Recursion hosted by our Co-Founder & Instructor - Ankush
                        Singla.
                      </span>
                      <br></br>
                      <br></br>
                      <span>
                        <strong>DATE : </strong> 21<sup>st</sup> March
                      </span>
                      <br></br>
                      <span>
                        <strong>TIME : </strong>5 am to 8 am
                      </span>
                      <br></br>
                      <br></br>
                      <span>
                        Donate any amount between Rs.100-1000 which will be
                        donated to the Covid relief NGO.
                      </span>
                      <br></br>
                      <br></br>
                      <span>
                        <b>
                          In addition, the donated amount will be doubled and
                          added to your Ninja Wallet as Ninja Coins for future
                          purchase on any course. For instance, if your donated
                          amount is Rs.500, you will receive 1000 Ninja Coins in
                          your Ninja Wallet.
                        </b>
                      </span>
                      <br></br>
                      <br></br>
                      <h2>WHY SHOULD YOU ATTEND THE CLASS</h2>
                      <ul>
                        <li>
                          An opportunity to do your bit towards the society
                        </li>
                        <li>
                          Learn Important Interview Questions of Recursion from
                          Ankush Singla, an alumnus of IIT Delhi & Stanford with
                          prior experience of working in Facebook and Amazon
                        </li>
                        <li>
                          Get twice the amount of your contribution as Ninja
                          Coins in your Ninja Wallet.
                        </li>
                      </ul>
                      <br></br>
                      <br></br>
                      <span>
                        These Ninja Coins will be valid till 12th June, 2021 and
                        can be used to purchase any course, from Coding Ninjas.
                      </span>
                    </div>
                  </div>
                </div>
               */}
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
