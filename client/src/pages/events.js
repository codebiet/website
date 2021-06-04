import React, { lazy } from "react";
import { Suspense } from "react";
const Nav = lazy(() => import("../components/Navbar/Nav"));
const Footer = lazy(() => import("../components/Footer/Footer"));
const EventCard = lazy(() => import("../components/EventCard/EventCard"));
import { Link } from "react-router-dom";
import Loader from "../components/Loader/Loader";
import eventsData from "../components/EventCard/eventsData";
function Events() {
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
                        <EventCard {...eventsData[0]} />
                        <EventCard {...eventsData[1]} />
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
    </Suspense>
  );
}

export default Events;
