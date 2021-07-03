import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Button,
} from "reactstrap";
import Tags from "@yaireo/tagify/dist/react.tagify";
import axios from "axios";
const AddUpdateSuggestionModal = ({
  modalOpen,
  setModalOpen,
  setAlert = () => "",
  setSuggestions = () => "",
  defaultTitle = "",
  defaultCategory = "",
  defaultCardImgUrl = "",
  defaultTags = [],
  updating = false,
  approving = false,
  queryString = () => "",
  id = "",
  //below details are used for pagination purpose, after addition no. of items will increase
  setTotalItems = () => "",
  userDashboard = false,
}) => {
  const [title, setTitle] = useState(defaultTitle);
  const [category, setCategory] = useState(defaultCategory);
  const [cardImgUrl, setCardImgUrl] = useState(defaultCardImgUrl);
  const [tags, setTags] = useState(defaultTags);
  const cardImgRef = React.createRef();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    return () => setError("");
  }, []);
  useEffect(() => {
    setError("");
  }, [title]);
  const toggle = () => {
    setModalOpen((prev) => !prev);
  };
  const handleTagChange = (values) => {
    let parsedValues = [];
    if (values) parsedValues = JSON.parse(values);
    parsedValues = parsedValues.map((tagObj) => tagObj.value);
    setTags(parsedValues);
  };
  const handleAddSuggestion = () => {
    if (
      !title ||
      !category ||
      (!userDashboard && !cardImgRef.current.files[0] && !cardImgUrl)
    )
      //
      return setError("You are required to fill in all the fields!");
    const data = new FormData();
    data.append("title", title);
    data.append("tags", JSON.stringify(tags));
    data.append("category", category);
    if (!userDashboard) data.append("cardImg", cardImgRef.current.files[0]);
    setLoading(true);
    axios
      .post("/post/blogs/addSuggestion?" + queryString(), data)
      .then((res) => {
        setLoading(false);
        setSuggestions(res.data.suggestions);
        setTotalItems(res.data.totalItems);
        setAlert({
          type: "success",
          msg: "Successfully added the Suggestion!",
        });
        setModalOpen(false);
      })
      .catch((err) => {
        setLoading(false);
        if (err.response && err.response.data) {
          setError(err.response.data.errorMsg);
        } else setError("Something went wrong!");
      });
  };
  const handleUpdateSuggestion = () => {
    if (!title || !category || (!cardImgRef.current.files[0] && !cardImgUrl))
      return setError("You are required to fill in all the fields!");
    const data = new FormData();
    data.append("title", title);
    data.append("tags", JSON.stringify(tags));
    data.append("category", category);
    data.append("cardImg", cardImgRef.current.files[0]);
    setLoading(true);
    axios
      .patch(
        "/patch/admin/blogs/updateSuggestion/" + id + "?" + queryString(),
        data
      )
      .then((res) => {
        setLoading(false);
        setSuggestions(res.data.suggestions);
        let msg = updating
          ? "Successfully updated the Suggestion!"
          : "Successfully approved the Suggestion!";
        setAlert({
          type: "success",
          msg: msg,
        });
        setModalOpen(false);
      })
      .catch((err) => {
        setLoading(false);
        if (err.response && err.response.data) {
          setError(err.response.data.errorMsg);
        } else setError("Something went wrong!");
      });
  };
  const handleSubmit = () => {
    setError("");
    if (updating || approving) {
      return handleUpdateSuggestion();
    } else {
      return handleAddSuggestion();
    }
  };
  return (
    <Modal isOpen={modalOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>
        {updating
          ? "Update Suggestion"
          : approving
          ? "Approve Suggestion"
          : "Add Suggestion"}
        {loading && <div className="scroller"></div>}
      </ModalHeader>
      <ModalBody>
        {approving && (
          <p style={{ marginBottom: "1rem", fontWeight: "400" }}>
            Please Upload the card image to approve.
          </p>
        )}
        {error && (
          <p style={{ marginBottom: "1rem", color: "red", fontWeight: "600" }}>
            {error}
          </p>
        )}
        <FormGroup>
          <label htmlFor="title" className="fontType">
            Title
          </label>
          <input
            className="form-control"
            type="text"
            placeholder="Enter Blog Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <label htmlFor="title" className="fontType">
            Category
          </label>
          <input
            className="form-control"
            type="text"
            placeholder="Enter Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <label htmlFor="tags" className="fontType">
            Tags
          </label>
          <Tags
            id="tags"
            placeholder="Enter tag and press enter"
            className="form-control"
            value={tags.join(", ")}
            onChange={(e) => handleTagChange(e.detail.value)}
          />
        </FormGroup>
        {!userDashboard && ( //uesr is not required to upload card image, admin will upload during approval
          <FormGroup>
            <label htmlFor="card-img" className="fontType">
              Card Image
            </label>
            <input
              id="card-img"
              className="form-control"
              type="file"
              ref={cardImgRef}
            />
            {cardImgUrl && (
              <span>
                <a
                  href={cardImgUrl}
                  target="_blank"
                  style={{ color: "cornflowerblue" }}
                >
                  Card Image
                </a>
              </span>
            )}
          </FormGroup>
        )}
      </ModalBody>
      <ModalFooter>
        <Button
          color="warning"
          className="default-btn"
          onClick={() => handleSubmit()}
        >
          {updating ? "Update" : approving ? "Approve" : "Add"}
        </Button>
        <Button color="secondary" onClick={toggle}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default AddUpdateSuggestionModal;
