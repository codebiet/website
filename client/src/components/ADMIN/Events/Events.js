import React, { useEffect, useState } from "react";
import eventRoutes from "./eventRoutes";
import DashboardLayout from "../Dashboard/DashboardLayout";
import {Link} from 'react-router-dom';
import axios from "axios";
import Loader from "../../Loader/Loader";
import { Row, Col } from "reactstrap";
import EventCard from "../../EventCard/EventCard";
import { DeleteForeverRounded, EditTwoTone } from "@material-ui/icons";
const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    axios
      .get("/api/events")
      .then((res) => {
        setLoading(false);
        setEvents(res.data.events);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <DashboardLayout routes={eventRoutes}>
      <Row style={{ width: "100%", margin: "0" }}>
        <Col style={{ display: "flex", flexWrap: "wrap" }}>
          {events.map((event) => {
            return (
              <div className="event-card-container">
                <EventCard key={event._id} {...event} />
                <div className="update-remove-button-container">
                  <Link to={"/admin/events/update/"+event._id}>
                    <button>
                      <EditTwoTone />
                    </button>
                  </Link>
                  <button className="remove-button" aria-label={event._id}>
                    <DeleteForeverRounded />
                  </button>
                </div>
              </div>
            );
          })}
        </Col>
      </Row>
      {loading && <Loader />}
    </DashboardLayout>
  );
};
export default Events;
