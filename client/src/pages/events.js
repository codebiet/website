import React, { lazy, useEffect, useState } from "react";
import { Suspense } from "react";
const Nav = lazy(() => import("../components/Navbar/Nav"));
const Footer = lazy(() => import("../components/Footer/Footer"));
const EventCard = lazy(() => import("../components/EventCard/EventCard"));
import { Link } from "react-router-dom";
import Loader from "../components/Loader/Loader";
import svg from "../components/assets/SVG.svg";
import axios from "axios";
const eventsData = [
  {
    name: "BIET HACK | Ideas meet technology",
    startsOn: "08:00 PM, 24 MAY 2021",
    entryFee: "Free",
    venue: "Online",
    description:
      "Run through the wave of codes smoothly and showcase your coding skills to stay ahead amongst your peers.",
    img: svg,
    tags: ["Coding", "Second Year"],
  },
  {
    name: "How to crack GATE?",
    startsOn: "08:00 PM, 24 MAY 2021",
    entryFee: "Free",
    venue: "Online",
    description:
      "The mentors inspire a lot and encourage us to learn new technology. Happy to get training from them.",
    img: svg,
    tags: ["Gate", "All Year"],
  },
  {
    name: "Placement Prep. Talk",
    startsOn: "08:00 PM, 24 MAY 2021",
    entryFee: "Free",
    venue: "Online",
    description:
      "Run through the wave of codes smoothly and showcase your coding skills to stay ahead amongst your peers.",
    img: svg,
    tags: ["Coding", "Second Year"],
  },
  {
    name: "Workshop on Web Development",
    startsOn: "08:00 PM, 24 MAY 2021",
    entryFee: "Free",
    venue: "Online",
    description:
      "Run through the wave of codes smoothly and showcase your coding skills to stay ahead amongst your peers.",
    img: svg,
    tags: ["Coding", "Second Year"],
  },
  {
    name: "Create a React App",
    startsOn: "08:00 PM, 24 MAY 2021",
    entryFee: "Free",
    venue: "Online",
    description:
      "Run through the wave of codes smoothly and showcase your coding skills to stay ahead amongst your peers.",
    img: svg,
    tags: ["Coding", "Second Year"],
  },
  {
    name: "BIET CODEathon",
    startsOn: "08:00 PM, 24 MAY 2021",
    entryFee: "Free",
    venue: "Online",
    description:
      "Run through the wave of codes smoothly and showcase your coding skills to stay ahead amongst your peers.",
    img: svg,
    tags: ["Coding", "Second Year"],
  },
];
// const eventsData = lazy(() => import("../components/EventCard/eventsData"));
function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);
    axios
      .get("/api/events")
      .then((res) => {
        setEvents(res.data.events);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <Suspense fallback={<Loader />}>
      <div className="App">
        <div>
          <Nav />
          <div className="this">
            <div className="events">
              <section className="eventsOuter">
                <div className="eventsCategory">
                  <Link to="#abs" className="tab" selected>
                    All events
                  </Link>
                  <Link to="#a" className="tab">
                    Webinar
                  </Link>
                  <Link to="#k" className="tab">
                    Coding Events
                  </Link>
                </div>
                <div className="eventsWrapper">
                  <div className="eventsSubCategory  ">
                    <Link to="#abs" className="tab" selected>
                      Current
                    </Link>
                    <Link to="#a" className="tab">
                      Upcoming
                    </Link>
                    <Link to="#k" className="tab">
                      Recently closed
                    </Link>
                  </div>
                  <div className="eventBody">
                    <div className="eventCardContainer">
                      <div className="eventsContainer">
                        {events.map((event) => (
                          <EventCard key={event._id} {...event} />
                        ))}
                        {/* <div className="cardEvent">
                          <div className="card">
                            <div className="cardHeader">
                              <div className="cardHeaderInner">
                                <img
                                  src={svg}
                                  alt="cardimage"
                                  className="cardImage"
                                ></img>
                              </div>
                            </div>

                            <div className="cardMain">
                              <p>BIET HACK | Ideas meet technology </p>
                              <div className="eventDetails">
                                <div className="eventInfo">
                                  <p>
                                    <b>Starts On</b>
                                  </p>
                                  <p>08:00 PM, 24 MAY 2021</p>
                                </div>
                                <div className="eventInfo">
                                  <p>
                                    <b> Entry Fees </b>
                                  </p>
                                  <p> Free </p>
                                </div>
                                <div className="eventInfo ">
                                  <p>
                                    <b>Venue</b>
                                  </p>
                                  <p>Online</p>
                                </div>
                              </div>
                              <div className="shortDescription">
                                Run through the wave of codes smoothly and
                                showcase your coding skills to stay ahead
                                amongst your peers.
                              </div>
                              <div className="tagsContainer">
                                <div className="tags">Coding</div>
                                <div className="tags">Second year</div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="cardEvent">
                          <div className="card">
                            <div className="cardHeader">
                              <div className="cardHeaderInner">
                                <img
                                  src={svg}
                                  alt="cardimage"
                                  className="cardImage"
                                ></img>
                              </div>
                            </div>

                            <div className="cardMain">
                              <p>BIET HACK | Ideas meet technology </p>
                              <div className="eventDetails">
                                <div className="eventInfo">
                                  <p>
                                    <b>Starts On</b>
                                  </p>
                                  <p>08:00 PM, 24 MAY 2021</p>
                                </div>
                                <div className="eventInfo">
                                  <p>
                                    <b>Entry Fees</b>
                                  </p>
                                  <p>Free</p>
                                </div>
                                <div className="eventInfo ">
                                  <p>
                                    <b>Venue</b>
                                  </p>
                                  <p>Online</p>
                                </div>
                              </div>
                              <div className="shortDescription">
                                Run through the wave of codes smoothly and
                                showcase your coding skills to stay ahead
                                amongst your peers.
                              </div>
                              <div className="tagsContainer">
                                <div className="tags">Coding</div>
                                <div className="tags">Second year</div>
                              </div>
                            </div>
                          </div>
                        </div>
                     */}
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
          <Footer />
        </div>
      </div>
      {loading && <Loader />}
    </Suspense>
  );
}

export default Events;
