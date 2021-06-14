import React, { useState, useEffect, useContext } from "react";
import eventRoutes from "./eventRoutes";
import DashboardLayout from "../Dashboard/DashboardLayout";
import { Link } from "react-router-dom";
import axios from "axios";
import { Card, CardBody, CardHeader } from "reactstrap";
import PaginationComponent from "../../Pagination/Pagination";
import { InfoContext } from "../../../state/Store";
import {
  generateError,
  generateWarning,
  generateSuccess,
  clearEverything,
} from "../../../state/info/infoActions";
const UserCard = ({ user }) => {
  return (
    <Card className="user">
      <CardBody>
        <ul style={{ listStyleType: "none" }}>
          <li>
            <strong>Name : </strong>{" "}
            {(user && user.name) || <ContentLoaderSvg invert />}
          </li>
          <li>
            <strong>Email : </strong>
            {(user && user.email) || <ContentLoaderSvg invert />}
          </li>
        </ul>
      </CardBody>
    </Card>
  );
};
const EventDetails = ({ event }) => {
  return (
    <ul className="event-description" style={{ listStyleType: "none" }}>
      <li>
        <strong>Event Name : </strong> {event.name || <ContentLoaderSvg />}
      </li>
      <li>
        <strong>Held On :</strong>{" "}
        {(event.startsOn &&
          new Date(event.startsOn).toString().substring(0, 24)) || (
          <ContentLoaderSvg />
        )}
      </li>
      <li>
        <strong>Duration :</strong> {event.duration || <ContentLoaderSvg />}
      </li>
      <li>
        <strong>Type :</strong> {event.type || <ContentLoaderSvg />}
      </li>
    </ul>
  );
};
const EventRegistrations = (props) => {
  const [event, setEvent] = useState({});
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  //managing pagination -- start
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(10);
  const [limit, setLimit] = useState(10);
  //managing pagination -- end
  const info = useContext(InfoContext);
  useEffect(() => {
    axios
      .get(`/api/events/${props.match.params.id}`)
      .then((res) => {
        console.log(res.data.event);
        setEvent(res.data.event);
      })
      .catch((err) => {
        if (err.response && err.response.data && err.response.data.errorMsg) {
          info.dispatch(err.response.data.errorMsg);
        } else info.dispatch("Something went wrong!");
      });
    //clear alerts when component unmounts, if there are any
    return () => info.dispatch(clearEverything());
  }, []);
  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `/api/admin/events/${props.match.params.id}/registrations/?page=${
          currentPage - 1
        }&limit=${limit}`
      )
      .then((res) => {
        setLoading(false);
        console.log(res.data);
        setTotalItems(res.data.totalItems);
        setUsers(res.data.registered);
      })
      .catch((err) => {
        setLoading(false);
        if (err.response && err.response.status == 404)
          return props.history.push("/error404");
        else if (
          err.response &&
          err.response.data &&
          err.response.data.errorMsg
        )
          return info.dispatch(generateError(err.response.data.errorMsg));
        else return info.dispatch(generateError("Something went wrong!"));
      });
  }, [currentPage]);
  return (
    <DashboardLayout routes={eventRoutes}>
      <Card className="event-reg-main">
        <CardHeader>
          <h1 className="event-reg-heading">Event Registrations</h1>
          <EventDetails event={event} />
        </CardHeader>
        <hr style={{ marginTop: "1.4rem", marginBottom: "0" }} />
        <CardBody>
          <h2 className="candidate-heading">Candidates</h2>
          {!loading &&
            users.map((user) => <UserCard key={user.email} user={user} />)}
          {!loading && users.length == 0 && <h6>No Registrations Yet</h6>}
          {loading && (
            <>
              <UserCard />
              <UserCard />
              <UserCard />
              <UserCard />
              <UserCard />
            </>
          )}
          {totalItems > limit && <PaginationComponent
            totalItems={totalItems}
            pageSize={limit}
            handlePageChange={(page) => setCurrentPage(page)}
          />}
        </CardBody>
      </Card>
    </DashboardLayout>
  );
};
const ContentLoaderSvg = (props) => {
  return (
    <svg
      role="img"
      width="200"
      height="24"
      aria-labelledby="loading-aria"
      viewBox="0 0 200 24"
      preserveAspectRatio="none"
    >
      <title id="loading-aria">Loading...</title>
      <rect
        x="0"
        y="0"
        width="100%"
        height="100%"
        clipPath="url(#clip-path)"
        style={{ fill: 'url("#fill")' }}
      ></rect>
      <defs>
        <clipPath id="clip-path">
          <rect x="0" y="0" rx="0" ry="0" width="300" height="20" />
        </clipPath>
        <linearGradient id="fill">
          <stop
            offset="0.599964"
            stopColor={props.invert ? "#ffffff" : "#f0f0f0"}
            stopOpacity="1"
          >
            <animate
              attributeName="offset"
              values="-2; -2; 1"
              keyTimes="0; 0.25; 1"
              dur="2s"
              repeatCount="indefinite"
            ></animate>
          </stop>
          <stop
            offset="1.59996"
            stopColor={props.invert ? "#000000" : "#ffffff"}
            stopOpacity="1"
          >
            <animate
              attributeName="offset"
              values="-1; -1; 2"
              keyTimes="0; 0.25; 1"
              dur="2s"
              repeatCount="indefinite"
            ></animate>
          </stop>
          <stop
            offset="2.59996"
            stopColor={props.invert ? "#ffffff" : "#f0f0f0"}
            stopOpacity="1"
          >
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
export default EventRegistrations;
