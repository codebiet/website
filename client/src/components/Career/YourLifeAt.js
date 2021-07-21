import React, { useEffect } from "react";
import AOS from "aos";
import "./career.css";
import ij1 from "../assets/opportunity.png";
import ij2 from "../assets/team.png";
import ij3 from "../assets/goal.svg";
import ij4 from "../assets/tech.png";
import ij5 from "../assets/job_5.png";
import ij6 from "../assets/collaborate.png";
import { Image } from "react-bootstrap";
const YourLife = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
    AOS.refresh({ duration: 1000, once: true });
  }, []);
  return (
    <section class="your-life">
      <div data-aos="fade-up" class="container">
        <div class="row middel-flex">
          <div class="col-md-6 col-sm-12">
            <div class="row">
              <div class="col-md-6 col-sm-6 col-12">
                <div data-aos="fade-up" class="your-box">
                <Image src={ij1} alt=""/>
                  <h3>Learning Opportunities</h3>
                  <p>
                  Various technologies to learn in different fields of programming and development.
                  </p>
                </div>
              </div>
              <div class="col-md-6 col-sm-6 col-12">
                <div data-aos="fade-up" class="your-box marg-top">
                  <Image src={ij2} alt="" />
                  <h3>Work with Bright Minds</h3>
                  <p>
                    Work with some of the best talents in the industry and
                    connect with them through us.
                  </p>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6 col-sm-6 col-12">
                <div data-aos="fade-up" class="your-box">
                  <Image src={ij3} alt="" />
                  <h3>Career Guidance</h3>
                  <p>
                  Know the right track to focus from the well placed seniors in various companies.
                  </p>
                </div>
              </div>
              <div class="col-md-6 col-sm-6 col-12">
                <div data-aos="fade-up" class="your-box marg-top">
                  <Image src={ij4} alt="" />
                  <h3>Work on new Technologies</h3>
                  <p>
                  With a motto of Learn, build and innovate, CODE provides a learning environment to master new technologies.
                  </p>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6 col-sm-6 col-12">
                <div data-aos="fade-up" class="your-box">
                <Image src={ij6} alt="" />
                  <h3>Collaborate with Others</h3>
                  <p>
                  Work on different projects and participate in various events in collaboration with your friends and colleagues.
                  </p>
                </div>
              </div>
              <div class="col-md-6 col-sm-6 col-12">
                <div data-aos="fade-up" class="your-box marg-top">
                  <Image src={ij5} alt="" />
                  <h3>Rewards</h3>
                  <p>
                    We belive that rewarding our co-workers would increase their productivity , You'll rewarded for your performance .
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-6 col-sm-12" id="your-life-class">
            <h2>
              Your Life At <br />
              <span>CODE</span>
            </h2>
            <p>
              At CODE we believe in working together and working hard. we are
              looking for dynamic and creative individuals who are willing to
              dedicate themselves to providing innovative products and servies
              for our clients.
            </p>
            <p>
              Besides getting the opportunity ot unlock your true potential, at
              CODE you can also network with some of the talented people in the
              industry and enjoy many other benefits by working with us.
            </p>
            <br />
            <br />
          </div>
        </div>
      </div>
    </section>
  );
};
export default YourLife;
