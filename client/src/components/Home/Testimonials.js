import React, { useEffect } from "react";
import AOS from "aos";
import { Link } from "react-router-dom";
import OwlCarousel from "react-owl-carousel";
import johnsonWilliamImg from "../assets/testi1.jpg";
import alexandarSakuraImg from "../assets/testi2.jpg";
import johnWilsonImg from "../assets/testi3.jpg";
const usertestimonialsData = [
  {
    heading: "Best Mentorship",
    content:
      "The mentors inspire a lot and encourage us to learn new technology. Happy to get training from them.",
    userImg: johnsonWilliamImg,
    name: "Johnson William",
    branch: "CSE",
    year: 1,
  },
  {
    heading: "Plenty of Learning Opportunities",
    content:
      "The webinars organized by CODE are very helpful in constantly motivating towards your learning goal",
    userImg: alexandarSakuraImg,
    name: "Alexander sakura",
    branch: "Information Technology",
    year: 1,
  },
  {
    heading: "Career Guidance",
    content:
      "CODE helps me build coding habits through its perfectly structured timeline of events.",
    userImg: johnWilsonImg,
    name: "John Wilson",
    branch: "CSE",
    year: 2,
  },
  {
    heading: "Knowledgebase of Resources",
    content:
      "Blog Section of code is the way to learn and keep up-to-date with the latest technologies and also share your knowledge.",
    userImg: johnsonWilliamImg,
    name: "Julia Sakura",
    branch: "IT",
    year: 2,
  },
  {
    heading: "Great Learning Opportunities",
    content:
      "I am highly influenced by the policy of “Learning on the go” that code follows to fulfill its learn build innovate moto.",
    userImg: johnWilsonImg,
    name: "John Nissan",
    branch: "Civil Engineering",
    year: 3,
  },
  {
    heading: "Recommended for Everyone!",
    content:
      "CODE is a place where you can broaden your mind with practical and beneficial web development projects. Highly recommend it to anyone who wants to reach the cutting edge of the web.",
    userImg: alexandarSakuraImg,
    name: "Duke Samson",
    branch: "CSE",
    year: 3,
  },
];
const UserTestimonial = ({ heading, content, userImg, name, branch, year }) => {
  return (
    <div className="item">
      <div className="testimonial-content">
        <div className="testimonial">
          <blockquote>
            <q>{heading}</q>
          </blockquote>
          <p>{content}</p>
        </div>
        <div className="bottom-info mt-4">
          <Link className="comment-img" to="">
            <img src={userImg} className="img-responsive" alt="User Image" />
          </Link>
          <div className="people-info align-self">
            <h3>{name}</h3>
            <p className="identity">
              {branch + " - " + year}
              <sup>
                {year == 1 ? "st" : year == 2 ? "nd" : year == 3 ? "rd" : ""}
              </sup>
              Year
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
const Testimonials = (props) => {
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);
  return (
    <section
      className="w3l-clients py-5 mb-5 mt-4"
      id="testimonials"
      data-aos="fade-left"
      data-aos-delay="300"
      data-aos-once={true}
      data-aos-duration="1000"
    >
      <div className="container py-md-5 py-4">
        <div
          className="title-main text-center mx-auto mb-5"
          style={{ maxWidth: "600px" }}
        >
          <p className="mt-2">Testimonials</p>
          <h3 className="title-style" style={{ textAlign: "center" }}>
            Some Words from our <br />
            <span style={{ fontSize: "inherit", fontWeight: "700" }}>
              Community
            </span>
          </h3>
        </div>
        <OwlCarousel
          items={2}
          autoplay={true}
          autoplayHoverPause={true}
          margin={50}
          responsive={{ 0: { items: 1 }, 1000: { items: 2 } }}
          id="owl-demo2"
          className="owl-theme mt-4 py-md-2 mb-md-4"
        >
          {usertestimonialsData.map((testimonialData) => {
            return <UserTestimonial key={testimonialData.name} {...testimonialData} />;
          })}
        </OwlCarousel>
      </div>
    </section>
  );
};
export default Testimonials;
