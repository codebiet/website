import React, { useEffect } from "react";
import AOS from "aos";
import { FormControl, InputGroup } from "react-bootstrap";
const JobOpenings = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
    AOS.refresh({ duration: 1000, once: true });
  }, []);
  return (
    <section data-aos="fade-up" className="jobs-available">
      <div className="container">
        <div className="your-box">
          <h2 className="container" style={{ fontWeight: 700 }}>
            Job Openings
          </h2>
          <div className="container">
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
          <div className="container">
            <div className="row">
              <div className="col-lg-3 col-md-6 col-sm-6">
                <div className="form-group">
                  <select className="form-control" id="sel1">
                    <option>Country</option>
                  </select>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-6">
                <div className="form-group">
                  <select className="form-control" id="sel1">
                    <option>Department</option>
                  </select>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-6">
                <div className="form-group">
                  <select className="form-control" id="sel1">
                    <option>Work Type</option>
                  </select>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-6">
                <div className="custom-control custom-switch" id="switch1">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    id="customSwitches"
                  />
                  <label className="custom-control-label" for="customSwitches">
                    Remote Only
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="row">
            <div
              data-aos="fade-up-right"
              className="col-lg-4 col-md-12 col-sm-12 col-12"
            >
              <div className="your-box-job">
                <h3>Data Scientist</h3>
                <p>Elehirely | Full time or Contact</p>
                <div className="join-box">
                  <button type="button" className="btn default-btn">
                    Apply Now
                  </button>
                </div>
              </div>
            </div>
            <div
              data-aos="fade-up"
              className="col-lg-4 col-md-12 col-sm-12 col-12"
            >
              <div className="your-box-job">
                <h3>Wordpress Developer</h3>
                <p>Elehirely | Full time or Contact</p>
                <div className="join-box">
                  <button type="button" className="btn default-btn">
                    Apply Now
                  </button>
                </div>
              </div>
            </div>
            <div
              data-aos="fade-up-left"
              className="col-lg-4 col-md-12 col-sm-12 col-12"
            >
              <div className="your-box-job">
                <h3>Product Designer</h3>
                <p>Elehirely | Full time or Contact</p>
                <div className="join-box">
                  <button type="button" className="btn default-btn">
                    Apply Now
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div
              data-aos="fade-up-right"
              className="col-lg-4 col-md-12 col-sm-12 col-12"
            >
              <div className="your-box-job">
                <h3>Technical Support</h3>
                <p>Elehirely | Full time or Contact</p>
                <div className="join-box">
                  <button type="button" className="btn default-btn">
                    Apply Now
                  </button>
                </div>
              </div>
            </div>
            <div
              data-aos="fade-up"
              className="col-lg-4 col-md-12 col-sm-12 col-12"
            >
              <div className="your-box-job">
                <h3>Junior Graphic Designer</h3>
                <p>Elehirely | Full time or Contact</p>
                <div className="join-box">
                  <button type="button" className="btn default-btn">
                    Apply Now
                  </button>
                </div>
              </div>
            </div>
            <div
              data-aos="fade-up-left"
              className="col-lg-4 col-md-12 col-sm-12 col-12"
            >
              <div className="your-box-job">
                <h3>Digital Marketer</h3>
                <p>Elehirely | Full time or Contact</p>
                <div className="join-box">
                  <button type="button" className="btn default-btn">
                    Apply Now
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div
              data-aos="fade-up-right"
              className="col-lg-4 col-md-12 col-sm-12 col-12"
            >
              <div className="your-box-job">
                <h3>Content Writer</h3>
                <p>Elehirely | Full time or Contact</p>
                <div className="join-box">
                  <button type="button" className="btn default-btn">
                    Apply Now
                  </button>
                </div>
              </div>
            </div>
            <div
              data-aos="fade-up"
              className="col-lg-4 col-md-12 col-sm-12 col-12"
            >
              <div className="your-box-job">
                <h3>Backend Engineer</h3>
                <p>Elehirely | Full time or Contact</p>
                <div className="join-box">
                  <button type="button" className="btn default-btn">
                    Apply Now
                  </button>
                </div>
              </div>
            </div>
            <div
              data-aos="fade-up-left"
              className="col-lg-4 col-md-12 col-sm-12 col-12"
            >
              <div className="your-box-job">
                <h3>Corporate Ambassador</h3>
                <p>Elehirely | Full time or Contact</p>
                <div className="join-box">
                  <button type="button" className="btn default-btn">
                    Apply Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div data-aos="fade-up-left" className="container">
          <br />
          <div className="join-box" id="openi">
            <button type="button" className="btn default-btn">
              View All Openings
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
export default JobOpenings;
