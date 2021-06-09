import React, { useEffect } from "react";
import AOS from "aos";
import { FormControl, InputGroup } from "react-bootstrap";
const JobOpenings = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
    AOS.refresh({ duration: 1000, once: true });
  }, []);
  return (
    <section data-aos="fade-up" class="jobs-available">
      <div class="container">
        <div class="your-box">
          <h2 class="container" style={{fontWeight:700}}>Job Openings</h2>
          <div class="container">
            <InputGroup size="lg">
              <InputGroup.Prepend>
                <InputGroup.Text id="inputGroup-sizing-lg">
                  Search
                </InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                aria-label="Large"
                aria-describedby="inputGroup-sizing-sm"
              />
            </InputGroup>
            <br />
          </div>
          <div class="container">
            <div class="row">
              <div class="col-lg-3 col-md-6 col-sm-6">
                <div class="form-group">
                  <select class="form-control" id="sel1">
                    <option>Country</option>
                  </select>
                </div>
              </div>
              <div class="col-lg-3 col-md-6 col-sm-6">
                <div class="form-group">
                  <select class="form-control" id="sel1">
                    <option>Department</option>
                  </select>
                </div>
              </div>
              <div class="col-lg-3 col-md-6 col-sm-6">
                <div class="form-group">
                  <select class="form-control" id="sel1">
                    <option>Work Type</option>
                  </select>
                </div>
              </div>
              <div class="col-lg-3 col-md-6 col-sm-6">
                <div class="custom-control custom-switch" id="switch1">
                  <input
                    type="checkbox"
                    class="custom-control-input"
                    id="customSwitches"
                  />
                  <label class="custom-control-label" for="customSwitches">
                    Remote Only
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div class="row">
            <div
              data-aos="fade-up-right"
              class="col-lg-4 col-md-12 col-sm-12 col-12"
            >
              <div class="your-box-job">
                <h3>Data Scientist</h3>
                <p>Elehirely | Full time or Contact</p>
                <div class="join-box">
                  <button type="button" class="btn">
                    Apply Now
                  </button>
                </div>
              </div>
            </div>
            <div data-aos="fade-up" class="col-lg-4 col-md-12 col-sm-12 col-12">
              <div class="your-box-job">
                <h3>Wordpress Developer</h3>
                <p>Elehirely | Full time or Contact</p>
                <div class="join-box">
                  <button type="button" class="btn">
                    Apply Now
                  </button>
                </div>
              </div>
            </div>
            <div
              data-aos="fade-up-left"
              class="col-lg-4 col-md-12 col-sm-12 col-12"
            >
              <div class="your-box-job">
                <h3>Product Designer</h3>
                <p>Elehirely | Full time or Contact</p>
                <div class="join-box">
                  <button type="button" class="btn">
                    Apply Now
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div class="row">
            <div
              data-aos="fade-up-right"
              class="col-lg-4 col-md-12 col-sm-12 col-12"
            >
              <div class="your-box-job">
                <h3>Technical Support</h3>
                <p>Elehirely | Full time or Contact</p>
                <div class="join-box">
                  <button type="button" class="btn">
                    Apply Now
                  </button>
                </div>
              </div>
            </div>
            <div data-aos="fade-up" class="col-lg-4 col-md-12 col-sm-12 col-12">
              <div class="your-box-job">
                <h3>Junior Graphic Designer</h3>
                <p>Elehirely | Full time or Contact</p>
                <div class="join-box">
                  <button type="button" class="btn">
                    Apply Now
                  </button>
                </div>
              </div>
            </div>
            <div
              data-aos="fade-up-left"
              class="col-lg-4 col-md-12 col-sm-12 col-12"
            >
              <div class="your-box-job">
                <h3>Digital Marketer</h3>
                <p>Elehirely | Full time or Contact</p>
                <div class="join-box">
                  <button type="button" class="btn">
                    Apply Now
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div class="row">
            <div
              data-aos="fade-up-right"
              class="col-lg-4 col-md-12 col-sm-12 col-12"
            >
              <div class="your-box-job">
                <h3>Content Writer</h3>
                <p>Elehirely | Full time or Contact</p>
                <div class="join-box">
                  <button type="button" class="btn">
                    Apply Now
                  </button>
                </div>
              </div>
            </div>
            <div data-aos="fade-up" class="col-lg-4 col-md-12 col-sm-12 col-12">
              <div class="your-box-job">
                <h3>Backend Engineer</h3>
                <p>Elehirely | Full time or Contact</p>
                <div class="join-box">
                  <button type="button" class="btn">
                    Apply Now
                  </button>
                </div>
              </div>
            </div>
            <div
              data-aos="fade-up-left"
              class="col-lg-4 col-md-12 col-sm-12 col-12"
            >
              <div class="your-box-job">
                <h3>Corporate Ambassador</h3>
                <p>Elehirely | Full time or Contact</p>
                <div class="join-box">
                  <button type="button" class="btn">
                    Apply Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div data-aos="fade-up-left" class="container">
          <br />
          <div class="join-box" id="openi">
            <button type="button" class="btn">
              View All Openings
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
export default JobOpenings;
