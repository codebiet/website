import React, { useEffect } from "react";
import AOS from "aos";
import { Image } from "react-bootstrap";
import ip1 from "../assets/p1.png";
import ip2 from "../assets/p2.png";
import ip3 from "../assets/p3.png";
import ip4 from "../assets/p4.png";
const RecruitmentProcess = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
    AOS.refresh({ duration: 1000, once: true });
  }, []);
  return (
    <section class="learn-process">
      <div class="container">
        <h1 data-aos="zoom-in" id="recruitment-text">
          Learn Our Recruitment <span id="changec">Process</span>
        </h1>
        <br />
        <div class="row">
          <div data-aos="fade-up" class="col-lg-3 col-md-6 col-sm-6 col-12">
            <div class="learn-box">
              <Image src={ip1} alt="" />
              <h2>CV Submission</h2>
              <p>
                Submit your CV or resume through our online portal if you meet
                our requirements.
              </p>
            </div>
          </div>
          <div data-aos="fade-up" class="col-lg-3 col-md-6 col-sm-6 col-12">
            <div class="learn-box">
              <Image src={ip2} alt="" />
              <h2>Phone Screening</h2>
              <p>
                After looking at your CV you will be invited for telephone
                interview at time of your choosing.
              </p>
            </div>
          </div>
          <div data-aos="fade-up" class="col-lg-3 col-md-6 col-sm-6 col-12">
            <div class="learn-box">
              <Image src={ip3} alt="" />
              <h2>Skill Assessment</h2>
              <p>
                You will be invited to a meeting to take a skills and
                knowledge assessment.
              </p>
            </div>
          </div>
          <div data-aos="fade-up" class="col-lg-3 col-md-6 col-sm-6 col-12">
            <div class="learn-box">
              <Image src={ip4} alt="" />
              <h2>Final Interview</h2>
              <p>
                If you can pass all stages we will invite you for a final
                interview with our Founder Team.{" "}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RecruitmentProcess;
