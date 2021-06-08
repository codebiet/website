import React, { useEffect } from "react";
import AOS from "aos";
import OwlCarousel from "react-owl-carousel";
import img from "../assets/013-antimony.svg";
const partners = [img, img, img, img, img, img, img];
const PartnerCard = ({ img }) => {
  return (
    <div
      class="partnericon"
      data-aos="fade-up"
      data-aos-delay="100"
      data-aos-duration="1000"
      data-aos-once={true}
    >
      <img src={img} alt="" />
    </div>
  );
};

const TorchBearers = () => {
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);
  return (
    <section
      class="w3l-clients py-5 mb-5 mt-4"
      data-aos="zoom-right"
      data-aos-delay="100"
      data-aos-duration="1000"
      data-aos-once={true}
    >
      <div class="container">
        <div
          class="title-main text-center mx-auto mb-5"
          style={{ maxWidth: "600px" }}
        >
          <p class="mt-2">partners in change</p>
          <h3 class="title-style title-style-torchbearers">
            Our <span>Torchbearers</span>
          </h3>
        </div>
        <OwlCarousel
          items={2}
          autoplay={true}
          autoplayHoverPause={true}
          margin={50}
          responsive={{
            0: { items: 1 },
            320: { items: 2 },
            375: { items: 3 },
            700: { items: 4 },
            1000: { items: 5 },
            1200: { items: 6 }
          }}
          id="torchbearers"
          className="owl-theme mt-4"
        >
          {partners.map((img, index) => (
            <PartnerCard key={index} img={img} />
          ))}
        </OwlCarousel>
      </div>
    </section>
  );
};

export default TorchBearers;
