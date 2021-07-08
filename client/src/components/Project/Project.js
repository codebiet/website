import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { AuthContext, InfoContext } from "../../state/Store";
import { generateError } from "../../state/info/infoActions";
import { Redirect } from "react-router-dom";
export default (props) => {
  const [avgRating, setAvgRating] = useState(props.data.avgRating);
  const [userRating, setUserRating] = useState(props.data.userRating);
  const [lotus, setlotus] = useState("block");
  const [boat, setboat] = useState("none");
  const [leaves, setleaves] = useState("none");
  const [rocks, setrocks] = useState("none");
  const [redirect, setRedirect] = useState(false);
  const [loading, setLoading] = useState(false);
  const auth = useContext(AuthContext);
  const info = useContext(InfoContext);
  useEffect(() => {
    setAvgRating(props.data.avgRating);
  }, [props.data.avgRating]);
  useEffect(() => {
    setUserRating(props.data.userRating);
  }, [props.data.userRating]);
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
  const rateProject = (rating) => {
    if (!auth.state.userLoggedIn) setRedirect(true);
    setLoading(true);
    axios
      .patch(`/patch/projects/${props.data.key}/rateProject`, { rating })
      .then((res) => {
        setLoading(false);
        setAvgRating(res.data.avgRating);
        setUserRating(res.data.userRating);
      })
      .catch((err) => {
        setLoading(false);
        if (err.response && err.response.data)
          info.dispatch(generateError(err.response.data.errorMsg));
        else info.dispatch(generateError("Something went wrong!"));
      });
  };
  return (
    <main className="project-container-main">
      {redirect && (
        <Redirect to={{ pathname: "/login", state: { from: "/projects" } }} />
      )}
      <br />
      <div className="container">
        <div
          className="card"
          style={{
            border: "1px solid #eee",
            borderRadius: "5px",
            boxShadow: "0 2px 12px 0 rgba(0,0,0,0.1)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {loading && <div className="scroller"></div>}
          <div className="card-body">
            <p className="card-title">
              <span
                className={"fa fa-star " + (avgRating >= 1 ? "checked" : "")}
              ></span>
              <span
                className={"fa fa-star " + (avgRating >= 2 ? "checked" : "")}
              ></span>
              <span
                className={"fa fa-star " + (avgRating >= 3 ? "checked" : "")}
              ></span>
              <span
                className={"fa fa-star " + (avgRating >= 4 ? "checked" : "")}
              ></span>
              <span
                className={"fa fa-star " + (avgRating == 5 ? "checked" : "")}
              ></span>{" "}
              &nbsp;
              <span style={{ fontSize: "20px" }}>
                {!avgRating ? (
                  <span>Not yet rated</span>
                ) : (
                  <>
                    {avgRating}
                    <span style={{ fontWeight: "bold", fontSize: "25px" }}>
                      {" "}
                      /5
                    </span>
                  </>
                )}
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
                <div className="tab_h" style={{ marginTop: "1rem" }}>
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
                <div className="btn-group m-1">
                  <p className="card-text">
                    <span style={{ marginRight: ".8rem" }}>
                      Rate This Project
                    </span>
                    <span
                      className={
                        "fa fa-star " + (userRating >= 1 ? "checked" : "")
                      }
                      onClick={() => rateProject(1)}
                      style={{ cursor: "pointer" }}
                    ></span>
                    <span
                      className={
                        "fa fa-star " + (userRating >= 2 ? "checked" : "")
                      }
                      onClick={() => rateProject(2)}
                      style={{ cursor: "pointer" }}
                    ></span>
                    <span
                      className={
                        "fa fa-star " + (userRating >= 3 ? "checked" : "")
                      }
                      onClick={() => rateProject(3)}
                      style={{ cursor: "pointer" }}
                    ></span>
                    <span
                      className={
                        "fa fa-star " + (userRating >= 4 ? "checked" : "")
                      }
                      onClick={() => rateProject(4)}
                      style={{ cursor: "pointer" }}
                    ></span>
                    <span
                      className={
                        "fa fa-star " + (userRating == 5 ? "checked" : "")
                      }
                      onClick={() => rateProject(5)}
                      style={{ cursor: "pointer" }}
                    ></span>
                  </p>
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
