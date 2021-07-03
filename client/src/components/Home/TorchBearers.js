import React, { useEffect } from "react";
import AOS from "aos";
import OwlCarousel from "react-owl-carousel";
import civil from '../assets/torchBearers/civil.jpeg';
import cossco from '../assets/torchBearers/cossco.jpeg';
import drones from '../assets/torchBearers/drones.jpeg';
import eef from '../assets/torchBearers/eef.jpeg';
import electronics from '../assets/torchBearers/electronics.jpeg';
import fee from '../assets/torchBearers/fee.png'
import findredd from '../assets/torchBearers/findRedd.jpeg';
import mechanical from '../assets/torchBearers/mechanical.jpeg';
import scoit from '../assets/torchBearers/Scoit.jpeg';
import swizzle from '../assets/torchBearers/Swizzle.png';
import tdl from '../assets/torchBearers/tdl.png';
import unknown1 from '../assets/torchBearers/unknown1.jpeg';
import unknown2 from '../assets/torchBearers/unknown2.jpeg';
const partners = [civil, cossco, drones, eef, electronics, fee, findredd, mechanical, scoit, swizzle, tdl, unknown1, unknown2];
const PartnerCard = ({ img }) => {
  return (
    <div
      className="partnericon"
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
      className="w3l-clients py-5 mt-4"
      data-aos="zoom-right"
      data-aos-delay="100"
      data-aos-duration="1000"
      data-aos-once={true}
    >
      <div className="container">
        <div
          className="title-main text-center mx-auto mb-5"
          style={{ maxWidth: "600px" }}
        >
          <p className="mt-2">partners in change</p>
          <h3 className="title-style title-style-torchbearers">
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
