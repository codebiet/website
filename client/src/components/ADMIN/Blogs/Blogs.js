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
} from "reactstrap";
import blogRoutes from "./blogRoutes";
import SuggestionCard from "./SuggestionCard";
import Pagination from "../../Pagination/Pagination";
import axios from "axios";
import { ThumbUpAltSharp, ThumbDownAltSharp } from "@material-ui/icons";
import Loader from "../../Loader/Loader";
import { InfoContext } from "../../../state/Store";
import {
  generateError,
  clearEverything,
} from "../../../state/info/infoActions";
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
        <Button color="warning" onClick={handleDiscard}>
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
      {(state != "APPROVED" && state != "DISCARDED") && (
        <div className="actions">
          <button onClick={handleApproval}>
            <ThumbUpAltSharp />
          </button>
          <button onClick={() => setDiscardModalOpen((prev) => !prev)}>
            <ThumbDownAltSharp />
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
  //pagination -- start
  const [currentPage, setCurrentPage] = useState(0);
  const [limit, setLimit] = useState(6);
  const [totalItems, setTotalItems] = useState(5);
  const queryString = () => {
    return "";
  };
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  //pagination -- end
  useEffect(() => {
    setLoading(true);
    axios
      .get("/api/blogs")
      .then((res) => {
        setBlogs(res.data.blogs);
        setLoading(false);
      })
      .catch((err) => {});
  }, []);
  return (
    <DashboardLayout routes={blogRoutes}>
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
