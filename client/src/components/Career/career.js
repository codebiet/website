import React, { useEffect, useState, lazy } from "react";
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
// import Pagination from "../Pagination/Pagination";
// import ContentLoaderSvg from "../EventCard/EventCardLoader";
// import JobCard from "../JobCards/JobCard";
// const Pagination = lazy(() => import("../Pagination/Pagination"));
const ContentLoaderSvg = lazy(() => import("../EventCard/EventCardLoader"));
const JobCard = lazy(() => import("../JobCards/JobCard"));
const FilterComponent = ({ filter, setFilter, setPage }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const changeFilter = (newFilter) => {
    setPage(1);
    setFilter(newFilter);
  };
  return (
    <Card>
      <CardBody
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingBottom: "15px",
        }}
      >
        <h2 style={{ fontSize: "1.8rem", margin: 0, padding: 0 }}>Filters</h2>
        <Dropdown
          isOpen={dropdownOpen}
          toggle={() => setDropdownOpen((prev) => !prev)}
        >
          <DropdownToggle caret>{filter}</DropdownToggle>
          <DropdownMenu right style={{ zIndex: "1200" }}>
            <DropdownItem onClick={() => changeFilter("All")}>All</DropdownItem>
            <DropdownItem onClick={() => changeFilter("Android")}>
              Android
            </DropdownItem>
            <DropdownItem onClick={() => changeFilter("Blockchain")}>
              Blockchain
            </DropdownItem>
            <DropdownItem onClick={() => changeFilter("Content Writing")}>
              Content Writing
            </DropdownItem>
            <DropdownItem onClick={() => changeFilter("Cyber Security")}>
              Cyber Security
            </DropdownItem>
            <DropdownItem onClick={() => changeFilter("IOT")}>IOT</DropdownItem>
            <DropdownItem onClick={() => changeFilter("Software Development")}>
              Software Development
            </DropdownItem>
            <DropdownItem onClick={() => changeFilter("Web Development")}>
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
  //managing pagination -- start
  // const [currentPage, setCurrentPage] = useState(1);
  // const [totalItems, setTotalItems] = useState(6);
  // const [limit, setLimit] = useState(6);
  // const handlePageChange = (page) => {
  //   console.log(page);
  //   setCurrentPage(page);
  // };
  //managing pagination -- end
  //filters
  const [filter, setFilter] = useState("All");
  useEffect(() => {
    setLoading(true);
    //scroll to top when mounted;
    window.scrollTo(0, 0);
    axios
      .get(`/api/jobs?filter=${filter}`)
      .then((res) => {
        setJobs(res.data.data);
        console.log(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  }, [filter]);
  return (
    <div style={{ margin: "2rem" }}>
      <FilterComponent
        filter={filter}
        setFilter={setFilter}
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
      {/* {totalItems > limit && (
        <Pagination
          totalItems={totalItems}
          pageSize={limit}
          handlePageChange={handlePageChange}
        />
      )} */}
    </div>
  );
};
export default Career;
