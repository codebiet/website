import React, { useEffect } from "react";
import AOS from "aos";
import { Link } from "react-router-dom";
import OwlCarousel from "react-owl-carousel";
import shivank from "../assets/testimonials/shivank.png";
import vikas from "../assets/testimonials/vikas.jpeg";
import abhinayDubey from "../assets/testimonials/abhinayDubey.jpg";
import aman from "../assets/testimonials/amanGangwani.jpeg";
import ashirvad from "../assets/testimonials/Ashirvad.jpeg";
import kshitiz from "../assets/testimonials/kshitizSharma.jpeg";
import prakhar from "../assets/testimonials/prakhar.jpeg";
import siddhantMishra from "../assets/testimonials/siddhantMishra.jpeg";
import { LazyLoadImage } from "react-lazy-load-image-component";
const usertestimonialsData = [
  {
    heading: "Plenty of Learning Opportunities",
    content: `The webinars organized by CODE are very helpful in constantly motivating towards your learning goal.`,
    userImg: shivank,
    name: "Shivank",
    branch: "CSE",
    year: 3,
  },
  {
    heading: "Recommended for Everyone",
    content:
      "CODE is a place where you can broaden your mind with practical and beneficial web development projects. Highly recommend it to anyone who wants to reach the cutting edge of the web.",
    userImg: vikas,
    name: "Vikas Singh Patel",
    branch: "CSE",
    year: 3,
  },
  {
    heading: "Straightforward Learning Platform",
    content: `It's always been useful and interesting to learn new things and their implementation in real world projects too and CODE has helped me a lot in this.
      It has an awesome interactive environment which is easy to use without facing any difficulty.`,
    userImg: abhinayDubey,
    name: "Abhinay Dubey",
    branch: "ECE",
    year: 2,
  },
  {
    heading: "Straightforward Learning Platform",
    content: `It's always been useful and interesting to learn new things and their implementation in real world projects too and CODE has helped me a lot in this.
      It has an awesome interactive environment which is easy to use without facing any difficulty.`,
    userImg: abhinayDubey,
    name: "Abhinay Dubey",
    branch: "ECE",
    year: 2,
  },
  {
    heading: "Learner to Earner",
    content: `CODE really helped me a lot in exploring something new and keeping updated about the latest technologies as well as sharing of knowledge keeps everyone boost up.
    Overall CODE is one stop solution of our journey from learner to earner.`,
    userImg: prakhar,
    name: "Prakhar Singh",
    branch: "ECE",
    year: 2,
  },
  {
    heading: "Great Learning Opportunity",
    content: `I learnt a lot about web development under the mentorship provided to us by CODE.
      Highly suggest being a part!`,
    userImg: kshitiz,
    name: "Kshitij Sharma",
    branch: "ECE",
    year: 2,
  },
  {
    heading: "Place to learn and Explore",
    content:
      "CODE is a platform where you can not only develop your coding skills but could  would get complete mentorship and guidance from the best coders of our college. Regular coding competition , seminars boost your knowledge of the field and help in brightening the future.",
    userImg: ashirvad,
    name: "Ashirvad Pathak",
    branch: "CSE",
    year: 2,
  },
  {
    heading: "A Platform for Beginers",
    content:
      "This is a great learning platform with ample of useful resources .Overall it is full of bunch of learning",
    userImg: siddhantMishra,
    name: "Siddhant Mishra",
    branch: "ECE",
    year: 1,
  },
  {
    heading: "Tool For A Developer",
    content: `It's A Wonderful Experience, the development section boost up my coding experience and
      organising events build my confidence.`,
    userImg: aman,
    name: "Aman Gangwani",
    branch: "ECE",
    year: 1,
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
            <LazyLoadImage
              src={userImg}
              className="img-responsive"
              alt="User Image"
            />
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
      className="w3l-clients py-5 mb-5"
      id="testimonials"
      data-aos="fade-left"
      data-aos-delay="300"
      data-aos-once={true}
      data-aos-duration="1000"
    >
      <div className="container py-4">
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
          rewind={true}
          margin={50}
          responsive={{ 0: { items: 1 }, 1000: { items: 2 } }}
          id="owl-demo2"
          className="owl-theme mt-4 py-md-2 mb-md-4"
        >
          {usertestimonialsData.map((testimonialData) => {
            return (
              <UserTestimonial
                key={testimonialData.name}
                {...testimonialData}
              />
            );
          })}
        </OwlCarousel>
      </div>
    </section>
  );
};
export default Testimonials;
