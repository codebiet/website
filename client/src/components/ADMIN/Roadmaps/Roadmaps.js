import React, { useEffect, useState, useContext, lazy } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  Row,
  Col,
  Card,
  CardBody,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import {
  DeleteForeverRounded,
  EditTwoTone,
  PeopleAltTwoTone,
} from "@material-ui/icons";
import { InfoContext } from "../../../state/Store";
import {
  generateSuccess,
  generateError,
} from "../../../state/info/infoActions";
import roadmapRoutes from "./roadmapRoutes";
const JobCard = lazy(() => import("../../JobCards/JobCard"));
const DashboardLayout = lazy(() => import("../Dashboard/DashboardLayout"));
const ContentLoaderSvg = lazy(() => import("../../EventCard/EventCardLoader"));
const Pagination = lazy(() => import("../../Pagination/Pagination"));
const ConfirmDeletion = lazy(() => import("./ConfirmDeletion"));
const StatusFilterComponent = ({ status, setStatus, setPage }) => {
  const [statusDropDownOpen, setStatusDropDownOpen] = useState(false);
  const changeStatus = (newStatus) => {
    setPage(1);
    setStatus(newStatus);
  };
  return (
    <Card>
      <CardBody
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "5px 15px",
        }}
      >
        <h2 style={{ fontSize: "1.5rem", margin: 0, padding: 0 }}>Status</h2>
        <Dropdown
          isOpen={statusDropDownOpen}
          toggle={() => setStatusDropDownOpen((prev) => !prev)}
        >
          <DropdownToggle caret>{status}</DropdownToggle>
          <DropdownMenu right style={{ zIndex: "1200" }}>
            <DropdownItem onClick={() => changeStatus("All")}>All</DropdownItem>
            <DropdownItem onClick={() => changeStatus("Active")}>
              Active
            </DropdownItem>
            <DropdownItem onClick={() => changeStatus("Archived")}>
              Archived
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </CardBody>
    </Card>
  );
};

const DomainFilterComponent = ({ domain, setDomain, setPage }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const changeDomain = (newDomain) => {
    setPage(1);
    setDomain(newDomain);
  };

  return (
    <Card>
      <CardBody
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "5px 15px",
        }}
      >
        <h2 style={{ fontSize: "1.5rem", margin: 0, padding: 0 }}>Domain</h2>

        <Dropdown
          isOpen={dropdownOpen}
          toggle={() => setDropdownOpen((prev) => !prev)}
        >
          <DropdownToggle caret>{domain}</DropdownToggle>
          <DropdownMenu right style={{ zIndex: "1200" }}>
            <DropdownItem onClick={() => changeDomain("All")}>All</DropdownItem>
            <DropdownItem onClick={() => changeDomain("Android")}>
              Android
            </DropdownItem>
            <DropdownItem onClick={() => changeDomain("Blockchain")}>
              Blockchain
            </DropdownItem>
            <DropdownItem onClick={() => changeDomain("Content Writing")}>
              Content Writing
            </DropdownItem>
            <DropdownItem onClick={() => changeDomain("Cyber Security")}>
              Cyber Security
            </DropdownItem>
            <DropdownItem onClick={() => changeDomain("IOT")}>IOT</DropdownItem>
            <DropdownItem onClick={() => changeDomain("ML/AI")}>
              ML / AI
            </DropdownItem>
            <DropdownItem onClick={() => changeDomain("Software Development")}>
              Software Development
            </DropdownItem>
            <DropdownItem onClick={() => changeDomain("Web Development")}>
              Web Development
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </CardBody>
    </Card>
  );
};

const Career = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deleteConfirmationModalOpen, setDeleteCofirmationModalOpen] =
    useState(false);
  const [toBeDeleted, setToBeDeleted] = useState("");
  const info = useContext(InfoContext);
  //managing pagination -- start
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(6);
  const [limit, setLimit] = useState(6);
  //managing pagination -- end
  //filters
  const [domain, setDomain] = useState("All");
  const [status, setStatus] = useState("All");
  useEffect(() => {
    setLoading(true);
    window.scrollTo(0, 0);

    axios
      .get(
        `/api/jobs?page=${currentPage}&size=${limit}&filter=${domain}&status=${status}`
      )
      .then((res) => {
        setJobs(res.data.data);
        console.log(res.data);
        setTotalItems(res.data.totalItems);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  }, [currentPage, domain, status]);

  const handleDelete = (id) => {
    setDeleteCofirmationModalOpen(false);
    setLoading(true);
    axios
      .delete(`/delete/job/${id}`)
      .then((res) => {
        setLoading(false);
        setJobs(res.data.jobs);
        info.dispatch(generateSuccess("Delete Successfully!"));
      })
      .catch((err) => {
        setLoading(false);
        if (err.response && err.response.data) {
          info.dispatch(generateError(err.response.data.errorMsg));
        } else {
          info.dispatch(generateError("Something went wrong!"));
        }
      });
  };
  const handlePageChange = (page) => {
    console.log(page);
    setCurrentPage(page);
  };
  const toggleConfirmationModal = (id) => {
    setToBeDeleted(id);
    setDeleteCofirmationModalOpen((prev) => !prev);
  };
  return (
    <DashboardLayout routes={roadmapRoutes}>
      <DomainFilterComponent
        domain={domain}
        setDomain={setDomain}
        setPage={setCurrentPage}
      />
      <StatusFilterComponent
        status={status}
        setStatus={setStatus}
        setPage={setCurrentPage}
      />

      <Row style={{ width: "100%", margin: "0" }}>
        <Col style={{ display: "flex", flexWrap: "wrap" }}>
          {!loading &&
            jobs &&
            jobs.map((job, index) => {
              return (
                <div className="job-card-container">
                  <JobCard key={job._id} {...job} />
                  <div className="update-remove-button-container">
                    <Link to={`/admin/jobs/${job._id}/applications`}>
                      <button>
                        <PeopleAltTwoTone />
                      </button>
                    </Link>
                    <Link to={"/admin/jobs/update/" + job._id}>
                      <button>
                        <EditTwoTone />
                      </button>
                    </Link>
                    <button
                      className="remove-button"
                      onClick={() => toggleConfirmationModal(job._id)}
                    >
                      <DeleteForeverRounded />
                    </button>
                  </div>
                </div>
              );
            })}
          {loading && (
            <>
              <div className="event-card-container">
                <ContentLoaderSvg />
              </div>
              <div className="event-card-container">
                <ContentLoaderSvg />
              </div>
              <div className="event-card-container">
                <ContentLoaderSvg />
              </div>
              <div className="event-card-container">
                <ContentLoaderSvg />
              </div>
              <div className="event-card-container">
                <ContentLoaderSvg />
              </div>
              <div className="event-card-container">
                <ContentLoaderSvg />
              </div>
            </>
          )}
        </Col>
      </Row>
      {totalItems > limit && (
        <Pagination
          totalItems={totalItems}
          pageSize={limit}
          handlePageChange={handlePageChange}
        />
      )}
      <ConfirmDeletion
        modalOpen={deleteConfirmationModalOpen}
        setModalOpen={setDeleteCofirmationModalOpen}
        handleDelete={handleDelete}
        id={toBeDeleted}
      />
    </DashboardLayout>
  );
};
export default Career;
