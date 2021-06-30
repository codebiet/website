import React, { useState, useContext } from "react";
import Tags from "@yaireo/tagify/dist/react.tagify";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import { InfoContext } from "../../state/Store";
import { generateError } from "../../state/info/infoActions";
import axios from "axios";
const ReplyModal = ({
  setPosts = () => "",
  getQuery = () => "",
  doubtId,
  replyModalOpen = true,
  toggleReplyModalOpen = () => "",
}) => {
  const [answerTitle, setAnswerTitle] = useState("");
  const [answer, setAnswer] = useState("");
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(false);
  const info = useContext(InfoContext);
  //handler for tags change
  const handleTagChange = (values) => {
    let parsedValues = [];
    if (values) parsedValues = JSON.parse(values);
    parsedValues = parsedValues.map((tagObj) => tagObj.value);
    console.log(parsedValues);
    setTags(parsedValues);
  };
  //reply submit handler
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .patch(`/patch/doubts/${doubtId}/reply/${getQuery()}`, {
        answerTitle,
        answer,
        tags: JSON.stringify(tags),
      })
      .then((res) => {
        setLoading(false);
        setPosts(res.data.doubts);
      })
      .catch((err) => {
        setLoading(false);
        if (err.response && err.response.data)
          info.dispatch(generateError(err.response.data.errorMsg));
        else
          info.dispatch(
            generateError("Something went wrong! Try refreshing the page!")
          );
      });
  };
  return (
    <Modal isOpen={replyModalOpen} toggle={toggleReplyModalOpen}>
      <div className="modal-dialog" style={{ margin: 0 }}>
        <div className="modal-content">
          <ModalHeader toggle={toggleReplyModalOpen}>
            Post a reply
            {loading && <div className="scroller slow"></div>}
          </ModalHeader>
          <ModalBody>
            <form onSubmit={(e) => handleSubmit(e)}>
              <div className="form-group">
                <textarea
                  className="form-control"
                  id="sol-title"
                  rows="1"
                  placeholder="Your Solution Headline"
                  value={answerTitle}
                  onChange={(e) => setAnswerTitle(e.target.value)}
                ></textarea>
                <small id="solHelpBlock" className="form-text text-muted">
                  Short and Simple
                </small>
              </div>
              <div className="form-group">
                <textarea
                  className="form-control"
                  id="sol-content"
                  rows="4"
                  placeholder="Describe your Solution"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                ></textarea>
                <small id="contentHelpBlock" className="form-text text-muted">
                  Provide a detailed description about your solution
                </small>
              </div>
              <div className="form-group">
                <Tags
                  placeholder="Enter tag and press enter"
                  className="form-control"
                  value={tags.join(", ")}
                  onChange={(e) => handleTagChange(e.detail.value)}
                />
                <small id="tagsHelpBlock" className="form-text text-muted">
                  To help people quicly see what you posted about
                </small>
              </div>
              <button className="btn btn-primary default-btn" type="submit">
                Post your Solution
              </button>
            </form>
          </ModalBody>
        </div>
      </div>
    </Modal>
  );
};

export default ReplyModal;
