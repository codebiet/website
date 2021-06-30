import React, { useState, useEffect, useContext } from "react";
import DashboardLayout from "../Dashboard/DashboardLayout";
import {
  Container,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Button,
  Card,
  CardBody,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
} from "reactstrap";
import blogRoutes from "./blogRoutes";
import SuggestionCard from "./SuggestionCard";
import Pagination from "../../Pagination/Pagination";
import axios from "axios";
import { CheckCircle, Cancel } from "@material-ui/icons";
import Loader from "../../Loader/Loader";
import { InfoContext } from "../../../state/Store";
import {
  generateError,
  clearEverything,
} from "../../../state/info/infoActions";
const typeFilters = [
  { title: "All", value: "All" },
  { title: "Pending", value: "PENDING" },
  { title: "Approved", value: "APPROVED" },
  { title: "Discarded", value: "DISCARDED" },
];
const durationFilters = [
  { title: "All", value: "All" },
  { title: "Last Week", value: "Last Week" },
  { title: "Last Month", value: "Last Month" },
  { title: "Last 3 Months", value: "Last 3 Months" },
  { title: "Last 6 Months", value: "Last 6 Months" },
  { title: "Last Year", value: "Last Year" },
];
const getDurationQuery = (filter) => {
  if (filter == "All") return "";
  else if (filter == "Last Week")
    return (
      "gt=" +
      new Date(Date.now() - 1000 * 60 * 60 * 24 * 7) +
      "&lt=" +
      new Date(new Date(Date.now())) +
      "&"
    );
  else if (filter == "Last Month")
    return (
      "gt=" +
      new Date(Date.now() - 1000 * 60 * 60 * 24 * 30) +
      "&lt=" +
      new Date(new Date(Date.now())) +
      "&"
    );
  else if (filter == "Last 3 Months")
    return (
      "gt=" +
      new Date(Date.now() - 1000 * 60 * 60 * 24 * 30 * 3) +
      "&lt=" +
      new Date(new Date(Date.now())) +
      "&"
    );
  else if (filter == "Last 6 Months")
    return (
      "gt=" +
      new Date(Date.now() - 1000 * 60 * 60 * 24 * 30 * 6) +
      "&lt=" +
      new Date(new Date(Date.now())) +
      "&"
    );
  else if (filter == "Last 1 Year")
    return (
      "gt=" +
      new Date(Date.now() - 1000 * 60 * 60 * 24 * 30 * 12) +
      "&lt=" +
      new Date(new Date(Date.now())) +
      "&"
    );
  else return "";
};
const getTypeQuery = (filter) => {
  if (filter == "All") return "";
  return "state=" + filter;
};
const FilterComponent = ({
  filterName,
  availableFilters = ["All"],
  currentFilter,
  setCurrentFilter,
  setPage = () => "",
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const changeFilter = (newFilter) => {
    setPage(1);
    setCurrentFilter(newFilter);
  };
  return (
    <Card style={{ borderRadius: "0" }}>
      <CardBody
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingBottom: "15px",
        }}
      >
        <h2 style={{ fontSize: "1.8rem", margin: 0, padding: 0 }}>
          {filterName}
        </h2>
        <Dropdown
          isOpen={dropdownOpen}
          toggle={() => setDropdownOpen((prev) => !prev)}
        >
          <DropdownToggle caret>{currentFilter}</DropdownToggle>
          <DropdownMenu right style={{ zIndex: "1200" }}>
            {availableFilters.map((filter) => {
              return (
                <DropdownItem
                  key={filter.value}
                  onClick={() => changeFilter(filter.value)}
                >
                  {filter.title}
                </DropdownItem>
              );
            })}
          </DropdownMenu>
        </Dropdown>
      </CardBody>
    </Card>
  );
};
const DiscardModal = ({
  modalOpen,
  setModalOpen,
  id,
  queryString = () => "",
  setBlogs = () => "",
  setTotalItems = () => "",
}) => {
  const [reason, setReason] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setError("");
  }, [reason]);
  const toggle = () => {
    setModalOpen((prev) => !prev);
  };
  const handleDiscard = () => {
    if (!reason)
      return setError(
        "Please provide the reason why you are discarding this blog?"
      );
    else if (reason.lenght < 30)
      return setError(
        "Reason Too Short! Please give in 30 characters atleast."
      );
    setLoading(true);
    axios
      .patch(`/patch/admin/blogs/${id}/discard?${queryString()}`, { reason })
      .then((res) => {
        setLoading(false);
        setBlogs(res.data.blogs);
        setTotalItems(res.data.totalItems);
      })
      .catch((err) => {
        setLoading(false);
        if (err.response && err.response.data)
          setError(err.response.data.errorMsg);
        else setError("Something went wrong!");
      });
  };
  return (
    <Modal isOpen={modalOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>
        Give the reason
        {loading && <div className="scroller"></div>}
      </ModalHeader>
      <ModalBody>
        {error && <p style={{ marginBottom: "1rem", color: "red" }}>{error}</p>}
        <FormGroup>
          <label htmlFor="reason" className="fontType">
            Reason for discard
          </label>
          <textarea
            className="form-control"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          ></textarea>
        </FormGroup>
      </ModalBody>
      <ModalFooter>
        <Button color="warning" className="default-btn" onClick={handleDiscard}>
          Discard
        </Button>
        <Button color="secondary" onClick={toggle}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};
const ApproveOrDiscard = ({
  id,
  state,
  queryString = () => "",
  setBlogs = () => "",
  setTotalItems = () => "",
}) => {
  const [discardModalOpen, setDiscardModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const info = useContext(InfoContext);
  console.log(state);
  useEffect(() => {
    return () => info.dispatch(clearEverything());
  }, []);
  const handleApproval = () => {
    setLoading(true);
    axios
      .patch(`/patch/admin/blogs/${id}/approve?${queryString()}`)
      .then((res) => {
        setBlogs(res.data.blogs);
        setTotalItems(res.data.totalItems);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        if (err.response && err.response.data)
          info.dispatch(generateError(err.response.data.errorMsg));
        else info.dispatch(generateError("Something went wrong!"));
      });
  };
  return (
    <>
      {state != "APPROVED" && state != "DISCARDED" && (
        <div className="actions" style={{ right: "4.45rem" }}>
          <button className="approve-button" onClick={handleApproval}>
            <CheckCircle />
          </button>
          <button
            className="discard-button"
            onClick={() => setDiscardModalOpen((prev) => !prev)}
          >
            <Cancel />
          </button>
          <DiscardModal
            modalOpen={discardModalOpen}
            setModalOpen={setDiscardModalOpen}
            id={id}
            queryString={queryString}
            setBlogs={setBlogs}
            setTotalItems={setTotalItems}
          />
          {loading && <Loader />}
        </div>
      )}
    </>
  );
};
export default (props) => {
  const [loading, setLoading] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [currentTypeFilters, setCurrentTypeFilters] = useState("All");
  const [currentDurationFilters, setCurrentDurationFilters] = useState("All");
  //pagination -- start
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(6);
  const [totalItems, setTotalItems] = useState(5);
  const queryString = () => {
    return (
      `page=${currentPage - 1}&limit=${limit}&` +
      getDurationQuery(currentDurationFilters) +
      getTypeQuery(currentTypeFilters)
    );
  };
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  //pagination -- end
  useEffect(() => {
    setLoading(true);
    axios
      .get("/api/blogs?" + queryString())
      .then((res) => {
        console.log(res.data.blogs);
        setBlogs(res.data.blogs);
        setLoading(false);
      })
      .catch((err) => {});
  }, [currentPage, currentDurationFilters, currentTypeFilters]);
  return (
    <DashboardLayout routes={blogRoutes}>
      <FilterComponent
        filterName="Type"
        setPage={setCurrentPage}
        availableFilters={typeFilters}
        currentFilter={currentTypeFilters}
        setCurrentFilter={setCurrentTypeFilters}
      />
      <FilterComponent
        filterName="Duration"
        setPage={setCurrentPage}
        availableFilters={durationFilters}
        currentFilter={currentDurationFilters}
        setCurrentFilter={setCurrentDurationFilters}
      />
      <Container
        style={{
          maxWidth: "100%",
          paddingTop: "2rem",
          display: "flex",
          justifyContent: "flex-start",
          flexWrap: "wrap",
        }}
      >
        {!loading &&
          blogs.map((blog) => (
            <SuggestionCard
              key={blog._id}
              suggestion={blog}
              actions={false}
              ApproveOrDiscard={ApproveOrDiscard}
              queryString={queryString}
              setSuggestions={setBlogs}
              setTotalItems={setTotalItems}
              usedAsBlogCard={true}
              reviewEnabled={true}
            />
          ))}
        {/* suggestion cards are used as loader placeholder cards during loading */}
        {loading && (
          <>
            <SuggestionCard actions={false} />
            <SuggestionCard actions={false} />
            <SuggestionCard actions={false} />
            <SuggestionCard actions={false} />
            <SuggestionCard actions={false} />
            <SuggestionCard actions={false} />
          </>
        )}
      </Container>
      {totalItems > limit && (
        <Pagination
          totalItems={totalItems}
          pageSize={limit}
          handlePageChange={handlePageChange}
        />
      )}
    </DashboardLayout>
  );
};
