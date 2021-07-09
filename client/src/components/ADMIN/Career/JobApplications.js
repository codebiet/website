import React, { useState, useEffect, useContext, lazy } from "react";
import { Card, CardBody, CardHeader } from "reactstrap";
import axios from "axios";
import { InfoContext } from "../../../state/Store";
import {
  generateError,
  clearEverything,
} from "../../../state/info/infoActions";
import careerRoutes from "./careerRoutes";
// import PaginationComponent from "../../Pagination/Pagination";
// import DashboardLayout from "../Dashboard/DashboardLayout";
const PaginationComponent = lazy(() => import("../../Pagination/Pagination"));
const DashboardLayout = lazy(() => import("../Dashboard/DashboardLayout"));
// import SendMessageModal from "./SendMessageModal";
const UserCard = ({ user }) => {
  return (
    <Card className="user">
      <CardBody>
        <ul style={{ listStyleType: "none" }}>
          <li>
            <strong>Name : </strong>{" "}
            {(user && user.userName) || <ContentLoaderSvg invert />}
          </li>
          <li>
            <strong>Email : </strong>
            {(user && user.email) || <ContentLoaderSvg invert />}
          </li>
          <li>
            <strong>Contact Nubmer : </strong>
            {(user && user.contactNumber) || <ContentLoaderSvg invert />}
          </li>
        </ul>
      </CardBody>
    </Card>
  );
};
const JobDetails = ({ job }) => {
  return (
    <ul className="event-description" style={{ listStyleType: "none" }}>
      <li>
        <strong>Job Title : </strong> {job.title || <ContentLoaderSvg />}
      </li>
      <li>
        <strong>Posted On :</strong>{" "}
        {(job.startedBy &&
          new Date(job.startedBy).toString().substring(0, 24)) || (
          <ContentLoaderSvg />
        )}
      </li>
      <li>
        <strong>Domain :</strong> {job.department || <ContentLoaderSvg />}
      </li>
      <li>
        <strong>Work Type :</strong> {job.workType || <ContentLoaderSvg />}
      </li>
    </ul>
  );
};
const JobApplicatons = (props) => {
  const [job, setJob] = useState({});
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  //managing pagination -- start
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(6);
  const [limit, setLimit] = useState(6);
  //managing pagination -- end
  const info = useContext(InfoContext);
  useEffect(() => {
    axios
      .get(`/api/jobs/${props.match.params.id}`)
      .then((res) => {
        setJob(res.data);
        console.log(res.data);
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
        `/api/admin/jobs/${props.match.params.id}/applications?page=${
          currentPage - 1
        }&limit=${limit}`
      )
      .then((res) => {
        setLoading(false);
        console.log(res.data);
        setTotalItems(res.data.totalItems);
        setUsers(res.data.applications);
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
    <DashboardLayout routes={careerRoutes}>
      <Card className="event-reg-main">
        <CardHeader>
          <h1 className="event-reg-heading">Job Applications</h1>
          <JobDetails job={job} />
        </CardHeader>
        <hr style={{ marginTop: "1.4rem", marginBottom: "0" }} />
        <CardBody>
          <div
            className="candidate-header-container"
            style={{ position: "relative" }}
          >
            <h2 className="candidate-heading">Candidates</h2>
            {/* {users.length > 0 && (
              <>
                <Button
                  style={{ position: "absolute", right: "1rem", top: 0 }}
                  onClick={() => setMsgOpen((prev) => !prev)}
                >
                  Send Message
                </Button>
                <SendMessageModal
                  modalOpen={msgOpen}
                  setModalOpen={setMsgOpen}
                  eventId={props.match.params.id}
                />
              </>
            )} */}
          </div>
          {!loading &&
            users.map((user) => <UserCard key={user.email} user={user} />)}
          {!loading && users.length == 0 && <h6>No Applications Yet</h6>}
          {loading && (
            <>
              <UserCard />
              {/**loader placeholder cards */}
              <UserCard />
              <UserCard />
              <UserCard />
              <UserCard />
            </>
          )}
          {totalItems > limit && (
            <PaginationComponent
              totalItems={totalItems}
              pageSize={limit}
              handlePageChange={(page) => setCurrentPage(page)}
            />
          )}
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
            stopColor={props.invert ? "#f0f0f0" : "#ffffff"}
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
export default JobApplicatons;
