import React, { useEffect } from "react";
import AOS from "aos";
import ij1 from "../assets/job_1.png";
import ij2 from "../assets/job_2.png";
import ij3 from "../assets/job_3.png";
import ij4 from "../assets/job_4.png";
import ij5 from "../assets/job_5.png";
import ij6 from "../assets/job_6.png";
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
                  <Image src={ij1} alt="" />
                  <h3>Large Beautiful Office</h3>
                  <p>
                    Enjoy a comfortable office enviroment with the most modern
                    and stylish furnishing.
                  </p>
                </div>
              </div>
              <div class="col-md-6 col-sm-6 col-12">
                <div data-aos="fade-up" class="your-box marg-top">
                  <Image src={ij2} alt="" />
                  <h3>Great Co-Workers</h3>
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
                  <h3>Easy Location</h3>
                  <p>
                    Commute easily to work at your convinience and enjoy
                    compensession for transport costs.
                  </p>
                </div>
              </div>
              <div class="col-md-6 col-sm-6 col-12">
                <div data-aos="fade-up" class="your-box marg-top">
                  <Image src={ij4} alt="" />
                  <h3>Education Opportunity</h3>
                  <p>
                    Get resources for develop your skills and knowledge to
                    kickstart your carrer.
                  </p>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6 col-sm-6 col-12">
                <div data-aos="fade-up" class="your-box">
                  <Image src={ij5} alt="" />
                  <h3>Performance Award</h3>
                  <p>
                    Get awarded for better performance in every 6 months and
                    recognized for your work.
                  </p>
                </div>
              </div>
              <div class="col-md-6 col-sm-6 col-12">
                <div data-aos="fade-up" class="your-box marg-top">
                  <Image src={ij6} alt="" />
                  <h3>Free Lunch and Snacks</h3>
                  <p>
                    Enjoy free delicious meals prepared by our trusted vendors
                    for lunch and snaks.
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
              looking for dynamic and ceative induviduels who are willing to
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
            <div class="join-box">
              <button type="button" class="btn">
                Apply Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default YourLife;
