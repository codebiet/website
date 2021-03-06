import React, { useEffect } from "react";
import HeroImg from "../assets/undraw_product_tour.svg";
import AOS from "aos";
const Hero = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
    AOS.refresh({ duration: 1000, once: true });
  }, []);
  return (
    <section class="career-section">
      <div class="container">
        <div data-aos="fade-up" class="row">
          <div class="col-sm-6 col-12" id="mob-apply">
            <h2 className="hero-heading">
              Join Our Team At <span>CODE</span>
            </h2>
            <p>Get a chance to become a part of a dynamic and successful club and work with some brightest minds of the industry.</p>
          </div>
          <div class="col-sm-6 col-12">
            <img src={HeroImg} style={{ width: "100%" }} alt="" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
