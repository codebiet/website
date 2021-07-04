import React, { useState } from "react";

export default (props) => {
  const [lotus, setlotus] = useState("block");
  const [boat, setboat] = useState("none");
  const [leaves, setleaves] = useState("none");
  const [rocks, setrocks] = useState("none");

  const openLotus = () => {
    setlotus("block");
    setboat("none");
    setleaves("none");
    setrocks("none");
  };
  const openBoat = () => {
    setlotus("none");
    setboat("block");
    setleaves("none");
    setrocks("none");
  };
  const openLeaves = () => {
    setlotus("none");
    setboat("none");
    setleaves("block");
    setrocks("none");
  };
  const openRocks = () => {
    setlotus("none");
    setboat("none");
    setleaves("none");
    setrocks("block");
  };

  return (
    <main className="project-container-main">
      <br />

      <div className="container">
        <div
          className="card"
          style={{
            border: "1px solid #eee",
            borderRadius: "5px",
            boxShadow: "0 2px 12px 0 rgba(0,0,0,0.1)",
          }}
        >
          <div className="card-body">
            <p className="card-title">
              <span className="fa fa-star checked"></span>
              <span className="fa fa-star checked"></span>
              <span className="fa fa-star checked"></span>
              <span className="fa fa-star"></span>
              <span className="fa fa-star"></span> &nbsp;
              <span style={{ fontSize: "20px" }}>
                3
                <span style={{ fontWeight: "bold", fontSize: "25px" }}>
                  {" "}
                  /5
                </span>
              </span>
            </p>
            <div className="row">
              <div className="col-sm-6">
                <div className="row pt-4">
                  <div className="col-12">
                    <div id="lotus" className="picture">
                      <img
                        className="img-fluid"
                        src={props.data.pic1}
                        alt="Lotus"
                        style={{ display: lotus }}
                      />
                    </div>
                    <div
                      id="boat"
                      className="picture"
                      style={{ display: boat }}
                    >
                      <img
                        className="img-fluid"
                        src={props.data.pic2}
                        alt="Boat"
                      />
                    </div>
                    <div
                      id="leaves"
                      className="picture"
                      style={{ display: leaves }}
                    >
                      <img
                        className="img-fluid"
                        src={props.data.pic3}
                        alt="Leaves"
                      />
                    </div>
                    <div
                      id="rocks"
                      className="picture"
                      style={{ display: rocks }}
                    >
                      <img
                        className="img-fluid"
                        src={props.data.pic4}
                        alt="Rocks"
                      />
                    </div>
                  </div>
                </div>
                <div className="row pt-0 pb-4 no-gutters mt-2">
                  <div className="col">
                    <button
                      className="myhover"
                      style={{
                        border: "1px solid #d1d0cd",
                        background: "none",
                        borderRadius: "4px",
                        margin: "0px",
                        padding: "0px",
                      }}
                      onClick={openLotus}
                    >
                      <img
                        className="img-fluid"
                        src={props.data.pic1}
                        alt="Lotus"
                        style={{
                          width: "100%",
                          borderRadius: "4px",
                          margin: "0px",
                        }}
                      />
                    </button>
                  </div>
                  <div className="col">
                    <button
                      className="myhover"
                      style={{
                        border: "1px solid #d1d0cd",
                        background: "none",
                        borderRadius: "4px",
                        margin: "0px",
                        padding: "0px",
                      }}
                      onClick={openBoat}
                    >
                      <img
                        className="img-fluid"
                        src={props.data.pic2}
                        alt="Boat"
                        style={{
                          width: "100%",
                          borderRadius: "4px",
                          margin: "0px",
                        }}
                      />
                    </button>
                  </div>
                  <div className="col">
                    <button
                      className="myhover"
                      style={{
                        border: "1px solid #d1d0cd",
                        background: "none",
                        borderRadius: "4px",
                        margin: "0px",
                        padding: "0px",
                      }}
                      onClick={openLeaves}
                    >
                      <img
                        className="img-fluid"
                        src={props.data.pic3}
                        alt="Leaves"
                        style={{
                          width: "100%",
                          borderRadius: "4px",
                          margin: "0px",
                        }}
                      />
                    </button>
                  </div>
                  <div className="col">
                    <button
                      className="myhover"
                      style={{
                        border: "1px solid #d1d0cd",
                        background: "none",
                        borderRadius: "4px",
                        margin: "0px",
                        padding: "0px",
                      }}
                      onClick={openRocks}
                    >
                      <img
                        className="img-fluid"
                        src={props.data.pic4}
                        alt="Rocks"
                        style={{
                          width: "100%",
                          borderRadius: "4px",
                          margin: "0px",
                        }}
                      />
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-sm-6">
                <h4 className="card-title">{props.data.project_name}</h4>
                <h5 className="card-title">Team Leader: {props.data.leader}</h5>
                <p className="card-text">{props.data.description}</p>
                <div className="tab_h">
                  {props.data.tags &&
                    props.data.tags.map((tag) => (
                      <span className="round-tab_h">{tag}</span>
                    ))}
                </div>
                <div className="btn-group m-1">
                  <a href={props.data.github} target="_blank">
                    <button type="button" className="btn ">
                      Github
                    </button>
                  </a>
                </div>
                <div className="btn-group m-1">
                  <a href={props.data.demo} target="_blank">
                    <button type="button" className="btn ">
                      Demo
                    </button>
                  </a>
                </div>
                <div className="btn-group m-1">
                  <a href={props.data.documentation} target="_blank">
                    <button type="button" className="btn ">
                      Documentation
                    </button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <br />
    </main>
  );
};
