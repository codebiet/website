import React, { useEffect, useState, useContext } from "react";
import eventRoutes from "./eventRoutes";
import DashboardLayout from "../Dashboard/DashboardLayout";
import { Link } from "react-router-dom";
import axios from "axios";
import Loader from "../../Loader/Loader";
import {
  Row,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "reactstrap";
import EventCard from "../../EventCard/EventCard";
import { DeleteForeverRounded, EditTwoTone } from "@material-ui/icons";
import { InfoContext } from "../../../state/Store";
import {
  generateSuccess,
  generateError,
} from "../../../state/info/infoActions";
const ConfirmDeletion = ({ modalOpen, setModalOpen, handleDelete, id }) => {
  const toggle = () => {
    setModalOpen((prev) => !prev);
  };
  return (
    <Modal isOpen={modalOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Confirm</ModalHeader>
      <ModalBody>
        The event will be deleted permanently and can't be restored later. Are
        you sure you want to delete?
      </ModalBody>
      <ModalFooter>
        <Button color="warning" onClick={() => handleDelete(id)}>
          Delete
        </Button>
        <Button color="secondary" onClick={toggle}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};
const EventCardLoader = (props) => {
  return (
    <ContentLoader
      speed={2}
      width={385}
      height={516}
      viewBox="0 0 385 516"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
      {...props}
    >
      <rect x="-3" y="243" rx="2" ry="2" width="102" height="18" />
      <rect x="1" y="187" rx="2" ry="2" width="335" height="37" />
      <rect x="-11" y="-6" rx="2" ry="2" width="400" height="176" />
      <rect x="-14" y="305" rx="0" ry="0" width="401" height="13" />
      <rect x="139" y="242" rx="2" ry="2" width="102" height="17" />
      <rect x="285" y="242" rx="2" ry="2" width="102" height="16" />
      <rect x="-2" y="267" rx="2" ry="2" width="102" height="12" />
      <rect x="140" y="265" rx="2" ry="2" width="102" height="12" />
      <rect x="286" y="264" rx="2" ry="2" width="102" height="12" />
      <rect x="0" y="323" rx="0" ry="0" width="390" height="12" />
      <rect x="-7" y="340" rx="0" ry="0" width="405" height="13" />
      <rect x="-4" y="359" rx="0" ry="0" width="405" height="13" />
      <rect x="3" y="409" rx="14" ry="14" width="100" height="31" />
      <rect x="117" y="408" rx="14" ry="14" width="100" height="31" />
      <rect x="5" y="453" rx="14" ry="14" width="100" height="31" />
      <rect x="232" y="408" rx="14" ry="14" width="100" height="31" />
    </ContentLoader>
  );
};
const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deleteConfirmationModalOpen, setDeleteCofirmationModalOpen] =
    useState(false);
  const info = useContext(InfoContext);
  useEffect(() => {
    setLoading(true);
    //scroll to top when mounted;
    window.scrollTo(0, 0);
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

  const handleDelete = (id) => {
    setDeleteCofirmationModalOpen(false);
    setLoading(true);
    axios
      .delete(`/delete/event/${id}`)
      .then((res) => {
        console.log(res.data.events);
        setLoading(false);
        setEvents(res.data.events);
        info.dispatch(generateSuccess("Delete Successfully!"));
      })
      .catch((err) => {
        setLoading(false);
        if (err.response.data) {
          info.dispatch(generateError(err.response.data));
        } else {
          info.dispatch(generateError("Something went wrong!"));
        }
      });
  };
  return (
    <DashboardLayout routes={eventRoutes}>
      <Row style={{ width: "100%", margin: "0" }}>
        <Col style={{ display: "flex", flexWrap: "wrap" }}>
          {events.map((event) => {
            return (
              <div className="event-card-container">
                <EventCard key={event._id} {...event} />
                <div className="update-remove-button-container">
                  <Link to={"/admin/events/update/" + event._id}>
                    <button>
                      <EditTwoTone />
                    </button>
                  </Link>
                  <button
                    className="remove-button"
                    onClick={() =>
                      setDeleteCofirmationModalOpen((prev) => !prev)
                    }
                  >
                    <DeleteForeverRounded />
                  </button>
                  <ConfirmDeletion
                    modalOpen={deleteConfirmationModalOpen}
                    setModalOpen={setDeleteCofirmationModalOpen}
                    handleDelete={handleDelete}
                    id={event._id}
                  />
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

const ContentLoaderSvg = () => {
  return (
    <svg
      role="img"
      width="385"
      height="516"
      aria-labelledby="loading-aria"
      viewBox="0 0 385 516"
      preserveAspectRatio="none"
    >
      <title id="loading-aria">Loading...</title>
      <rect
        x="0"
        y="0"
        width="100%"
        height="100%"
        clip-path="url(#clip-path)"
        style='fill: url("#fill");'
      ></rect>
      <defs>
        <clipPath id="clip-path">
          <rect x="-3" y="243" rx="2" ry="2" width="102" height="18" />
          <rect x="1" y="187" rx="2" ry="2" width="335" height="37" />
          <rect x="-11" y="-6" rx="2" ry="2" width="400" height="176" />
          <rect x="-14" y="305" rx="0" ry="0" width="401" height="13" />
          <rect x="139" y="242" rx="2" ry="2" width="102" height="17" />
          <rect x="285" y="242" rx="2" ry="2" width="102" height="16" />
          <rect x="-2" y="267" rx="2" ry="2" width="102" height="12" />
          <rect x="140" y="265" rx="2" ry="2" width="102" height="12" />
          <rect x="286" y="264" rx="2" ry="2" width="102" height="12" />
          <rect x="0" y="323" rx="0" ry="0" width="390" height="12" />
          <rect x="-7" y="340" rx="0" ry="0" width="405" height="13" />
          <rect x="-4" y="359" rx="0" ry="0" width="405" height="13" />
          <rect x="3" y="409" rx="14" ry="14" width="100" height="31" />
          <rect x="117" y="408" rx="14" ry="14" width="100" height="31" />
          <rect x="5" y="453" rx="14" ry="14" width="100" height="31" />
          <rect x="232" y="408" rx="14" ry="14" width="100" height="31" />
        </clipPath>
        <linearGradient id="fill">
          <stop offset="0.599964" stop-color="#f3f3f3" stop-opacity="1">
            <animate
              attributeName="offset"
              values="-2; -2; 1"
              keyTimes="0; 0.25; 1"
              dur="2s"
              repeatCount="indefinite"
            ></animate>
          </stop>
          <stop offset="1.59996" stop-color="#ecebeb" stop-opacity="1">
            <animate
              attributeName="offset"
              values="-1; -1; 2"
              keyTimes="0; 0.25; 1"
              dur="2s"
              repeatCount="indefinite"
            ></animate>
          </stop>
          <stop offset="2.59996" stop-color="#f3f3f3" stop-opacity="1">
            <animate
              attributeName="offset"
              values="0; 0; 3"
              keyTimes="0; 0.25; 1"
              dur="2s"
              repeatCount="indefinite"
            ></animate>
          </stop>
        </linearGradient>
      </defs>
    </svg>
  );
};
