import React, { useEffect, useState } from "react";
import AOS from "aos";
import { Collapse } from "reactstrap";
const faqsData = [
  {
    header: "Non consectetur a erat nam at lectus urna duis?",
    description:
      "Feugiat pretium nibh ipsum consequat. Tempus iaculis urna id volutpat lacus laoreet non curabitur gravida. Venenatis lectus magna fringilla urna porttitor rhoncus dolor purus non.",
  },
  {
    header:
      "Feugiat scelerisque varius morbi enim nunc faucibus a pellentesque?",
    description:
      "Dolor sit amet consectetur adipiscing elit pellentesque habitan morbi. Id interdum velit laoreet id donec ultrices. Fringill phasellus faucibus scelerisque eleifend donec pretium. Es pellentesque elit ullamcorper dignissim. Mauris ultrices eros i cursus turpis massa tincidunt dui.",
  },
  {
    header:
      "Dolor sit amet consectetur adipiscing elit pellentesque habitant morbi?",
    description:
      "Eleifend mi in nulla posuere sollicitudin aliquam ultrices sagittis orci. Faucibus pulvinar elementum integer enim. Sem nulla pharetra diam sit amet nisl suscipit. Rutrum tellus pellentesque eu tincidunt. Lectus urna duis convallis convallis tellus. Urna molestie at elementum eu facilisis sed odio morbi quis",
  },
];
const FaqAccordion = ({ header, description }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  return (
    <li style={{ display: "list-item" }}>
      <button
        onClick={toggle}
        className={isOpen ? "collapse" : "collapsed"}
        style={{ lineHeight: "22px" }}
      >
        {header}
        <i className="fa fa-chevron-up"></i>
      </button>
      <Collapse isOpen={isOpen}>
        <p>{description}</p>
      </Collapse>
    </li>
  );
};
const Faqs = (props) => {
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);
  return (
    <section id="faq" className="faq">
      <div className="container" data-aos="fade-up" data-aos-once={true}>
        <header className="section-header">
          <h3 style={{ lineHeight: "40px" }}>Frequently Asked Questions</h3>
        </header>

        <ul
          id="faq-list"
          data-aos="fade-up"
          data-aos-delay="100"
          data-aos-once={true}
          data-aos-duration="800"
        >
          {faqsData.map((faq) => {
            return <FaqAccordion key={faq.header} {...faq} />;
          })}
        </ul>
      </div>
    </section>
  );
};

export default Faqs;
