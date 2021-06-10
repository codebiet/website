import React, { useEffect, useState } from "react";
import AOS from "aos";
import { Collapse } from "reactstrap";
const faqsData = [
  {
    header: "Who can join the Club of Developers?",
    description:
      "Club of Developers is for everyone, regardless of their field of study or their current level of knowledge. The only criteria  is passion to learn, build and innovate.",
  },
  {
    header: "What are the types of events in CODE?",
    description:
      "CODE conducts various types of events including webinars, seminars and workshops. We also conduct various project building activities. Moreover, we also provide preparation for external events and placements.",
  },
  {
    header:
      "Can students of other colleges also participate in the events conducted under the club ?",
    description:
      "Yes, any college student can participate in the events which we conduct. However, only the students of BIET, Jhansi will be eligible to become a part of the club as well as for the rewards.",
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
