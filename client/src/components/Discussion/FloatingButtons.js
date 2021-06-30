import React, { useState } from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
const FloatingButtons = ({
  sort = "",
  category = "",
  setSort = () => "",
  setCategory = () => "",
}) => {
  const [toggle1, settoggle1] = useState(false);
  const [toggle2, settoggle2] = useState(false);

  const changeToggle1 = () => {
    settoggle1((prev) => !prev);
  };
  const changeToggle2 = () => {
    settoggle2((prev) => !prev);
  };

  const changeSort = (newSort) => {
    setSort(newSort);
    window.scrollTo(0, 0);
    settoggle1(false);
  };
  const changeCategory = (newCategory) => {
    setCategory(newCategory);
    window.scrollTo(0, 0);
    settoggle2(false);
  };
  return (
    <>
      <Modal isOpen={toggle1} toggle={changeToggle1}>
        <div className="modal-dialog" style={{margin:0}}>
          <div className="modal-content mobilemodal">
            <ModalHeader toggle={changeToggle1}>Sorting Options</ModalHeader>
            <div className="modal-body">
              <button
                className={
                  sort == "alphabetically"
                    ? "sortbutton selected"
                    : "sortbutton"
                }
                onClick={() => changeSort("alphabetically")}
              >
                {/* <span className="btn-icon" style={{ marginRight: ".2rem" }}>
                      <i className="fas fa-sort-alpha-up-alt"></i>
                    </span> */}
                <span className="btn-label">Alphabetically</span>
              </button>

              <button
                className={
                  sort == "likes" ? "sortbutton selected" : "sortbutton"
                }
              >
                {/* <span className="btn-icon" style={{ marginRight: ".2rem" }}>
                      <i className="fa fa-thumbs-up"></i>
                    </span> */}
                <span className="btn-label" onClick={() => changeSort("likes")}>
                  Likes
                </span>
              </button>

              {/* <button className={category == "" ? "sortbutton selected" : "sortbutton"}>
                    <span className="btn-icon" style={{ marginRight: ".2rem" }}>
                      <i className="fa fa-thumbs-down"></i>
                    </span>
                    <span className="btn-label">Lowest Upvotes</span>
                  </button> */}

              <button
                className={
                  sort == "latest" ? "sortbutton selected" : "sortbutton"
                }
                onClick={() => changeSort("latest")}
              >
                {/* <span className="btn-icon" style={{ marginRight: ".2rem" }}>
                      <i className="fas fa-sort-up"></i>
                    </span> */}
                <span className="btn-label">Latest First</span>
              </button>

              <button
                className={
                  sort == "oldest" ? "sortbutton selected" : "sortbutton"
                }
                onClick={() => {
                  changeSort("oldest");
                }}
              >
                {/* <span className="btn-icon" style={{ marginRight: ".2rem" }}>
                      <i className="fas fa-sort-down"></i>
                    </span> */}
                <span className="btn-label">Oldest First</span>
              </button>
            </div>
          </div>
        </div>
      </Modal>

      <Modal isOpen={toggle2} toggle={changeToggle2}>
        <div className="modal-dialog" style={{margin:0}}>
          <div className="modal-content mobilemodal">
            <ModalHeader toggle={changeToggle2}>Filter Categories</ModalHeader>

            <div className="modal-body">
              <button
                className={
                  category == "Java" ? "sortbutton selected" : "sortbutton"
                }
                onClick={() => changeCategory("Java")}
              >
                <span className="btn-label">Java</span>
              </button>
              <button
                className={
                  category == "Python" ? "sortbutton selected" : "sortbutton"
                }
                onClick={() => changeCategory("Python")}
              >
                <span className="btn-label">Python</span>
              </button>
              <button
                className={
                  category == "Programming Languages"
                    ? "sortbutton selected"
                    : "sortbutton"
                }
                onClick={() => changeCategory("Programming Languages")}
              >
                <span className="btn-label">Programming Languages</span>
              </button>
              <button
                className={
                  category == "DS and Algo"
                    ? "sortbutton selected"
                    : "sortbutton"
                }
                onClick={() => changeCategory("DS and Algo")}
              >
                <span className="btn-label">DS & Algo</span>
              </button>
              <button
                className={
                  category == "Competitive Programming"
                    ? "sortbutton selected"
                    : "sortbutton"
                }
                onClick={() => changeCategory("Competitive Programming")}
              >
                <span className="btn-label">Competitive Programming</span>
              </button>
              <button
                className={
                  category == "Operating Systems"
                    ? "sortbutton selected"
                    : "sortbutton"
                }
                onClick={() => changeCategory("Operating Systems")}
              >
                <span className="btn-label">Operating Systems</span>
              </button>
              <button
                className={
                  category == "DBMS" ? "sortbutton selected" : "sortbutton"
                }
                onClick={() => changeCategory("DBMS")}
              >
                <span className="btn-label">DBMS</span>
              </button>
              <button
                className={
                  category == "Web Development"
                    ? "sortbutton selected"
                    : "sortbutton"
                }
                onClick={() => changeCategory("Web Development")}
              >
                <span className="btn-label">Web Development</span>
              </button>
              <button
                className={
                  category == "Android Development"
                    ? "sortbutton selected"
                    : "sortbutton"
                }
                onClick={() => changeCategory("Android Development")}
              >
                <span className="btn-label">Android Development</span>
              </button>
              <button
                className={
                  category == "ML and AI" ? "sortbutton selected" : "sortbutton"
                }
                onClick={() => changeCategory("ML and AI")}
              >
                <span className="btn-label">ML & AI</span>
              </button>
              <button
                className={
                  category == "Interview Preparation"
                    ? "sortbutton selected"
                    : "sortbutton"
                }
                onClick={() => changeCategory("Interview Preparation")}
              >
                <span className="btn-label">Interview Preparation</span>
              </button>
            </div>
          </div>
        </div>
      </Modal>

      <div id="floatingbtns">
        <button id="sortbtn" onClick={changeToggle1}>
          <i className="fa fa-sort"></i>
        </button>

        <button id="filterbtn" onClick={changeToggle2}>
          <i className="fa fa-filter"></i>
        </button>
      </div>
    </>
  );
};

export default FloatingButtons;
