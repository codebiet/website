import React from "react";
// import './horizontalBar.css';
const HorizontalBar = ({ setCategory = () => "" }) => {
  const changeCategory = (category) => {
    setCategory(category);
  };
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-12 no-pad horizontalscroll">
          <div
            className="panel"
            style={{ background: "#AA7DCE", color: "#000", cursor: "pointer" }}
            onClick={() => changeCategory("Python")}
          >
            <h4 className="panel-title">Python Programming</h4>
            <p className="panel-desc">Discussion related to python language</p>
          </div>

          <div
            className="panel"
            style={{ background: "#BEB7A4", color: "#000", cursor: "pointer" }}
            onClick={() => changeCategory("Programming Languages")}
          >
            <h4 className="panel-title">Programming Lanugages</h4>
            <p className="panel-desc">
              Discussions related to other programming Languages
            </p>
          </div>

          <div
            className="panel"
            style={{ background: "#FF7F11", color: "#000", cursor: "pointer" }}
            onClick={() => changeCategory("DS and Algo")}
          >
            <h4 className="panel-title">DS and Algorithms</h4>
            <p className="panel-desc">Discussions related to DS & Algo</p>
          </div>

          <div
            className="panel"
            style={{ background: "#FDCFF3", color: "#000", cursor: "pointer" }}
            onClick={() => changeCategory("Interview Preparation")}
          >
            <h4 className="panel-title">Interview Preparation</h4>
            <p className="panel-desc">Doubts regarding Interview Preparation</p>
          </div>

          <div
            className="panel"
            style={{ background: "#FBB13C", color: "#000", cursor: "pointer" }}
            onClick={() => changeCategory("Competitive Programming")}
          >
            <h4 className="panel-title">Competitive Programming</h4>
            <p className="panel-desc">
              Discussions related to Competitive Programming
            </p>
          </div>
          <div
            className="panel"
            style={{ background: "#BEB7A4", color: "#000", cursor: "pointer" }}
            onClick={() => changeCategory("Web Development")}
          >
            <h4 className="panel-title">Web Development</h4>
            <p className="panel-desc">Discussions related to Web Development</p>
          </div>
          <div
            className="panel"
            style={{ background: "#E6B89C", color: "#000", cursor: "pointer" }}
            onClick={() => changeCategory("Andoird Development")}
          >
            <h4 className="panel-title">Android Development</h4>
            <p className="panel-desc">
              Discussions related to Android Development
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default HorizontalBar;
