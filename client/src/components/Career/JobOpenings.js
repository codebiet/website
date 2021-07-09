import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import { Form, FormControl, InputGroup } from "react-bootstrap";
import axios from "axios";

const months = [
  "JAN",
  "FEB",
  "MAR",
  "APR",
  "MAY",
  "JUNE",
  "JULY",
  "AUG",
  "SEPT",
  "OCT",
  "NOV",
  "DEC",
];

const JobOpenings = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
    AOS.refresh({ duration: 1000, once: true });
  }, []);

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [domain, setDomain] = useState("All");
  const [workType, setWorkType] = useState("All");
  const [remoteOnly, setRemoteOnly] = useState(false);

  useEffect(() => {
    console.log("remote only:", remoteOnly);
  }, [remoteOnly]);

  useEffect(() => {
    setLoading(true);
    console.log("domain ", domain, workType);
    axios
      .get(
        `/api/jobs?filter=${domain}&workType=${workType}&remoteOnly=${remoteOnly}&size=10000&status=Active`
      )
      .then((res) => {
        setJobs(res.data.data);
        console.log(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  }, [domain, workType, remoteOnly]);

  const ParseTime = (startedBy) => {
    const starts = new Date(startedBy);
    const hour = starts.getHours() % 12 == 0 ? 12 : starts.getHours() % 12;
    const minutes = starts.getMinutes();
    const AM_PM = starts.getHours() < 12 ? "AM" : "PM";
    const year = starts.getFullYear();
    const date = starts.getDate();
    const month = months[starts.getMonth()];

    //hour + ":" + minutes +" " + AM_PM +", " +
    return date + " " + month + " " + year;
  };

  return (
    <section data-aos="fade-up" class="jobs-available">
      <div class="container">
        <div class="your-box">
          <h2 class="container" style={{ fontWeight: 700 }}>
            Job Openings
          </h2>
          <div class="container">
            <InputGroup size="lg" style={{ border: "1px solid #ddd" }}>
              <InputGroup.Prepend>
                <InputGroup.Text style={{ border: "none" }}>
                  Search
                </InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                style={{ border: "none", position: "relative", top: ".1rem" }}
                aria-label="Large"
                aria-describedby="inputGroup-sizing-sm"
              />
            </InputGroup>
            <br />
          </div>
          <div class="container">
            <div class="row">
              <div class="col-lg-4 col-md-6 col-sm-6">
                <div class="form-group">
                  <select
                    class="form-control"
                    id="sel1"
                    value={domain}
                    onChange={(e) => setDomain(e.target.value)}
                  >
                    <option value="All">Department</option>
                    <option value="All">All</option>
                    <option value="Android">Android</option>
                    <option value="Blockchain">Blockchain</option>
                    <option value="Content Writing">Content Writing</option>
                    <option value="Cyber Security">Cyber Security</option>
                    <option value="IOT">IOT</option>
                    <option value="ML/AI">ML/AI</option>
                    <option value="Software Development">
                      Software Development
                    </option>
                    <option value="Web Development">Web Development</option>
                  </select>
                </div>
              </div>
              <div class="col-lg-4 col-md-6 col-sm-6">
                <div class="form-group">
                  <select
                    class="form-control"
                    id="sel1"
                    value={workType}
                    onChange={(e) => {
                      setWorkType(e.target.value);
                    }}
                  >
                    <option value="All">Work Type</option>
                    <option value="All">All</option>
                    <option value="Internship">Internship</option>
                    <option value="Full Time">Full Time</option>
                  </select>
                </div>
              </div>
              <div class="col-lg-4 col-md-6 col-sm-6">
                <div class="custom-control custom-switch" id="switch1">
                  <input
                    type="checkbox"
                    class="custom-control-input"
                    id="customSwitches"
                  />
                  <Form>
                    <Form.Check
                      type="switch"
                      id="custom-switch"
                      class="custom-control-label"
                      label="Remote Only"
                      value={remoteOnly}
                      onChange={() => setRemoteOnly((prev) => !prev)}
                    />
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="row">
            {!loading &&
              jobs.map((job) => (
                <div
                  data-aos="fade-up-right"
                  class="col-lg-6 col-md-12 col-sm-12 col-12"
                >
                  <Link to={"/jobs/" + job._id} style={{color:"black"}}>
                    <div className="your-box-job">
                      <h3>{job.title}</h3>
                      <div className="eventDetails">
                        <div className="eventInfo">
                          <p className="eventInfo-header">
                            <i
                              className="far fa-calendar-alt"
                              style={{
                                marginRight: ".1rem",
                                fontSize: ".8rem",
                              }}
                            ></i>
                            <b>Posted On</b>
                          </p>
                          <p>{ParseTime(job.startedBy)}</p>
                        </div>
                      </div>

                      <div className="eventDetails">
                        <div className="eventInfo">
                          <p className="eventInfo-header">
                            <i
                              className="far fa-calendar-alt"
                              style={{
                                marginRight: ".1rem",
                                fontSize: ".8rem",
                              }}
                            ></i>
                            <b>Apply By</b>
                          </p>
                          <p>{ParseTime(job.applyBy)}</p>
                        </div>
                      </div>

                      <div className="eventDetails">
                        <div className="eventInfo">
                          <p className="eventInfo-header">
                            <i
                              className="far fa-clock"
                              style={{
                                marginRight: ".1rem",
                                fontSize: ".8rem",
                              }}
                            ></i>
                            <b>Duration</b>
                          </p>
                          <p>{job.duration ? job.duration : "--"}</p>
                        </div>
                      </div>

                      <div className="eventDetails">
                        <div className="eventInfo">
                          <p className="eventInfo-header">
                            <i
                              className="fas fa-rupee-sign"
                              style={{
                                marginRight: ".1rem",
                                fontSize: ".8rem",
                              }}
                            ></i>
                            <b>Stipend</b>
                          </p>
                          <p>{job.stipend ? job.stipend : "--"}</p>
                        </div>
                      </div>

                      <div className="eventDetails">
                        <div className="eventInfo">
                          <p className="eventInfo-header">
                            <i
                              className="fas fa-briefcase"
                              style={{
                                marginRight: ".1rem",
                                fontSize: ".8rem",
                              }}
                            ></i>
                            <b>Work Type</b>
                          </p>
                          <p>{job.workType}</p>
                        </div>
                      </div>

                      <div className="eventDetails">
                        <div className="eventInfo">
                          <p className="eventInfo-header">
                            <i
                              className="fas fa-user-friends"
                              style={{
                                marginRight: ".1rem",
                                fontSize: ".8rem",
                              }}
                            ></i>
                            <b>Openings</b>
                          </p>
                          <p>{job.totalOpening}</p>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            {!loading && (!jobs || jobs.length === 0) && (
              <div className="container">
                <div className="your-box" style={{ textAlign: "center" }}>
                  We don't have any vacancies right now
                </div>
              </div>
            )}
          </div>
        </div>
        {/* <div data-aos="fade-up-left" class="container">
            <br />
            <div class="join-box" id="openi">
              <button type="button" class="btn">
                View All Openings
              </button>
            </div>
          </div> */}
      </div>
    </section>
  );
};
export default JobOpenings;
