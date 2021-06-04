import React, { useEffect } from "react";
import AOS from "aos";

import OwlCarousel from "react-owl-carousel";
import EventCard from "../EventCard/EventCard";
import eventsData from "../EventCard/eventsData";
import {Container} from "reactstrap";
const Events = (props) => {
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);
  return (
    <>
      <section
        className="w3l-clients py-5 mb-5 mt-4"
        id="activities"
        data-aos="zoom-right"
        data-aos-delay="100"
        data-aos-once={true}
        data-aos-duration="1000"
      >
        <div className="container-fluid">
          <div
            className="title-main text-center mx-auto mb-5"
            style={{ maxWidth: "600px" }}
          >
            <p className="mt-2">our activities</p>
            <h3 className="title-style" style={{ textAlign: "center" }}>
              Some Recent{" "}
              <span style={{ fontSize: "inherit", fontWeight: 700 }}>
                Events
              </span>
            </h3>
          </div>
          <Container className="py-md-5 py-4">
            <OwlCarousel
              items={3}
              autoplay={true}
              autoplayHoverPause={true}
              margin={50}
              responsive={{
                0: { items: 1 },
                1000: { items: 2 },
                1400: { items: 3 },
              }}
              id="events"
              className="owl-theme mt-4 py-md-2 mb-md-4"
            >
              {eventsData.map((eventData) => (
                <EventCard key={eventData.name} {...eventData} />
              ))}
            </OwlCarousel>
          </Container>
        </div>
      </section>
    </>
  );
};
export default Events;
