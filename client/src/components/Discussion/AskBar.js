import React, { useState, useEffect, useContext, lazy } from "react";
import { InfoContext } from "../../state/Store";
import { generateSuccess } from "../../state/info/infoActions";
import axios from "axios";
// import Tags from "@yaireo/tagify/dist/react.tagify";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
const Tags = lazy(() => import("@yaireo/tagify/dist/react.tagify"));
//
const whiteList = [
  "OOPs",
  "Polymorphism",
  "Programming Languages",
  "Interview Preparation",
  "Gate Preparation",
  "Dynamic Programming",
  "Greedy Algorithms",
  "Stack",
  "Queues",
  "Trees",
  "Graph Theory",
  "DFS",
  "BFS",
  "Deadlock",
  "Javascript",
  "HTML",
  "CSS",
  "React",
  "Node.js",
  "Express.js",
  "Webpack",
  "Mongodb",
];
const AskBar = ({
  setPosts = () => "",
  getQuery = () => "",
  setTotalItems = () => "",
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [queryTitle, setQueryTitle] = useState("");
  const [queryDescription, setQueryDescription] = useState("");
  const [category, setcategory] = useState("Java");
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const info = useContext(InfoContext);
  useEffect(() => {
    if (error) setError("");
  }, [queryTitle, queryDescription]);

  const toggleModal = (e) => {
    setModalOpen((prev) => !prev);
  };

  const handleTagChange = (values) => {
    let parsedValues = [];
    if (values) parsedValues = JSON.parse(values);
    parsedValues = parsedValues.map((tagObj) => tagObj.value);
    // console.log(parsedValues);
    setTags(parsedValues);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .post("/post/askDoubt" + getQuery(), {
        queryTitle,
        queryDescription,
        category,
        tags: JSON.stringify(tags),
      })
      .then((res) => {
        setLoading(false);
        setModalOpen(false);
        info.dispatch(
          generateSuccess(
            "Your doubt has been posted. We'll notify you when someone replies on this."
          )
        );
        // console.log(res.data);
        setPosts(res.data.doubts);
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
    <>
      <Modal isOpen={modalOpen} toggle={toggleModal}>
        <div className="modal-dialog" style={{ margin: 0 }}>
          <div className="modal-content">
            <ModalHeader toggle={toggleModal}>
              Ask your Question
              {loading && <div className="scroller"></div>}
            </ModalHeader>
            <ModalBody>
              <form onSubmit={(e) => handleSubmit(e)}>
                {error && (
                  <p
                    style={{
                      fontSize: "1rem",
                      color: "red",
                      textAlign: "center",
                    }}
                  >
                    {error}
                  </p>
                )}
                <div className="form-group">
                  <textarea
                    className="form-control"
                    id="ques-title"
                    rows="3"
                    placeholder="Add an interesting title"
                    value={queryTitle}
                    onChange={(e) => setQueryTitle(e.target.value)}
                  ></textarea>
                  <small id="quesHelpBlock" className="form-text text-muted">
                    Short but descriptive
                  </small>
                </div>
                <div className="form-group">
                  <textarea
                    className="form-control"
                    id="ques-content"
                    rows="4"
                    placeholder="Your text post (optional)"
                    value={queryDescription}
                    onChange={(e) => setQueryDescription(e.target.value)}
                  ></textarea>
                  <small id="contentHelpBlock" className="form-text text-muted">
                    Provide a detailed description to make it easier for others
                    to reply.
                  </small>
                </div>
                <div className="form-group">
                  <label htmlFor="category" className="form-text text-muted">
                    Choose a Category
                  </label>
                  <select
                    className="form-control"
                    id="category"
                    value={category}
                    onChange={(e) => setcategory(e.target.value)}
                  >
                    <option value="Java">Java</option>
                    <option value="Python">Python</option>
                    <option value="Programming Languages">
                      Programming Languages
                    </option>
                    <option value="DS and Algo">DS & Algo</option>
                    <option value="Competitive Programming">
                      Competitive Programming
                    </option>
                    <option value="Interview Preparation">
                      Interview Preparation
                    </option>
                    <option value="Operating Systems">Operating Systems</option>
                    <option value="DBMS">DBMS</option>
                    <option value="Web Development">Web Development</option>
                    <option value="Android Development"></option>
                    <option value="ML and AI">ML & AI</option>
                    <option value="Interview Preparation">
                      Interview Preparation
                    </option>
                    <option value="Others">Others</option>
                  </select>
                </div>
                <div className="form-group">
                  <Tags
                    placeholder="Enter tag and press enter"
                    className="form-control"
                    whitelist={whiteList}
                    showDropdown={true}
                    value={tags.join(", ")}
                    onChange={(e) => handleTagChange(e.detail.value)}
                  />
                  <small id="tagsHelpBlock" className="form-text text-muted">
                    To help people quicly see what you posted about
                  </small>
                </div>
                <button className="btn btn-primary default-btn" type="submit">
                  Submit your Question
                </button>
              </form>
            </ModalBody>
          </div>
        </div>
      </Modal>

      <div className="container-fluid mt-20">
        <div className="row">
          <div className="col-md-12 no-pad">
            <div className="card mb-4 banner">
              <div className="d-flex justify-content-between align-items-center px-0 pt-0 pb-3">
                <div className="px-4 pt-3 bnrhead">
                  <h3 style={{ marginBottom: 0 }}>
                    Ask your Question or discuss a topic
                  </h3>
                </div>
                <div className="px-4 pt-3 bnrimg">
                  <a
                    href="#"
                    className="arrowicon"
                    onClick={(e) => toggleModal(e)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      x="0px"
                      y="0px"
                      width="50"
                      height="50"
                      viewBox="0 0 172 172"
                      style={{ fill: "#000000" }}
                    >
                      <g
                        fill="none"
                        fillRule="nonzero"
                        stroke="none"
                        strokeWidth="1"
                        strokeLinecap="butt"
                        strokeLinejoin="miter"
                        strokeMiterlimit="10"
                        strokeDasharray=""
                        strokeDashoffset="0"
                        fontFamily="none"
                        fontWeight="none"
                        fontSize="none"
                        textAnchor="none"
                        style={{ mixBlendMode: "normal" }}
                      >
                        <path d="M0,172v-172h172v172z" fill="none"></path>
                        <g fill="#e67e22">
                          <path d="M86,6.88c-43.65844,0 -79.12,35.46156 -79.12,79.12c0,43.65844 35.46156,79.12 79.12,79.12c43.65844,0 79.12,-35.46156 79.12,-79.12c0,-43.65844 -35.46156,-79.12 -79.12,-79.12zM86,13.76c39.93625,0 72.24,32.30375 72.24,72.24c0,39.93625 -32.30375,72.24 -72.24,72.24c-39.93625,0 -72.24,-32.30375 -72.24,-72.24c0,-39.93625 32.30375,-72.24 72.24,-72.24zM99.4375,54.9325c-0.14781,0.02688 -0.29562,0.06719 -0.43,0.1075c-1.29,0.22844 -2.32469,1.16906 -2.6875,2.41875c-0.36281,1.26313 0.01344,2.60688 0.9675,3.49375l21.6075,21.6075h-74.175c-0.1075,0 -0.215,0 -0.3225,0c-1.89469,0.09406 -3.37281,1.70656 -3.27875,3.60125c0.09406,1.89469 1.70656,3.37281 3.60125,3.27875h74.175l-21.6075,21.6075c-1.37062,1.37063 -1.37062,3.57438 0,4.945c1.37063,1.37063 3.57438,1.37063 4.945,0l26.9825,-27.09c0.18813,-0.12094 0.37625,-0.26875 0.5375,-0.43c0.08063,-0.1075 0.14781,-0.215 0.215,-0.3225c0.08063,-0.06719 0.14781,-0.13437 0.215,-0.215c0.13438,-0.20156 0.24188,-0.41656 0.3225,-0.645c0.04031,-0.06719 0.08063,-0.14781 0.1075,-0.215c0,-0.04031 0,-0.06719 0,-0.1075c0.04031,-0.1075 0.08063,-0.215 0.1075,-0.3225c0.05375,-0.36281 0.05375,-0.71219 0,-1.075c0,-0.06719 0,-0.14781 0,-0.215c0,-0.04031 0,-0.06719 0,-0.1075c-0.02687,-0.06719 -0.06719,-0.14781 -0.1075,-0.215c0,-0.04031 0,-0.06719 0,-0.1075c-0.02687,-0.06719 -0.06719,-0.14781 -0.1075,-0.215c0,-0.04031 0,-0.06719 0,-0.1075c-0.02687,-0.06719 -0.06719,-0.14781 -0.1075,-0.215c-0.04031,-0.04031 -0.06719,-0.06719 -0.1075,-0.1075c-0.02687,-0.06719 -0.06719,-0.14781 -0.1075,-0.215c-0.12094,-0.18812 -0.26875,-0.37625 -0.43,-0.5375h-0.1075c-0.06719,-0.08062 -0.13437,-0.14781 -0.215,-0.215l-27.1975,-27.305c-0.71219,-0.76594 -1.74687,-1.15562 -2.795,-1.075z"></path>
                        </g>
                      </g>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AskBar;
