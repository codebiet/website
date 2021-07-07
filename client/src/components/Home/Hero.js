import React, { useState, useEffect } from "react";
import undraw_Code_thinking_re_gka2 from "../assets/undraw_Code_thinking_re_gka2.svg";
import AOS from "aos";
import { LazyLoadImage } from "react-lazy-load-image-component";
const toBeTyped = [
  "L",
  "Le",
  "Lea",
  "Lear",
  "Learn",
  "Learn",
  "Learn ",
  "Learn  ",
  "Learn   ",
  "Learn    ",
  "Learn     ",
  "Learn      ",
  "Learn       ",
  "Learn        ",
  "Learn         ",
  "Learn          ",
  "Learn",
  "Lear",
  "Lea",
  "Le",
  "L",
  "",
  "B",
  "Bu",
  "Bui",
  "Buil",
  "Build",
  "Build",
  "Build ",
  "Build  ",
  "Build   ",
  "Build    ",
  "Build     ",
  "Build      ",
  "Build       ",
  "Build        ",
  "Build         ",
  "Build          ",
  "Build",
  "Buil",
  "Bui",
  "Bu",
  "B",
  "",
  "I",
  "In",
  "Inn",
  "Inno",
  "Innov",
  "Innova",
  "Innovat",
  "Innovate",
  "Innovate",
  "Innovate ",
  "Innovate  ",
  "Innovate   ",
  "Innovate    ",
  "Innovate     ",
  "Innovate      ",
  "Innovate       ",
  "Innovate        ",
  "Innovate         ",
  "Innovate          ",
  "Innovate",
  "Innovat",
  "Innova",
  "Innov",
  "Inno",
  "Inn",
  "In",
  "I",
  "",
];
const Hero = (props) => {
  const [typed, setTyped] = useState({ text: "", index: 0 });
  useEffect(() => {
    const timer = setTimeout(() => {
      setTyped((prev) => {
        let index = prev.index;
        let nextIndex;
        if (index == toBeTyped.length - 1) nextIndex = 0;
        else nextIndex = index + 1;
        let nextText = toBeTyped[index];
        let next = { text: nextText, index: nextIndex };
        return next;
      });
    }, 100);
    return () => clearTimeout(timer);
  }, [typed]);
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);
  return (
    <section
      id="home"
      className="w3l-banner py-5"
      data-aos="zoom-out-down"
      data-aos-delay="100"
      data-aos-once={true}
      data-aos-duration="1000"
    >
      <div
        className="banner-image"
        data-aos="fade-up"
        data-aos-delay="100"
        data-aos-once={true}
        data-aos-duration="500"
      ></div>
      <div
        className="banner-content"
        data-aos="zoom-in"
        data-aos-delay="100"
        data-aos-once={true}
        data-aos-duration="1000"
      >
        <div className="container pt-5 pb-md-4">
          <div className="row banner-items align-items-center">
            <div className="col-lg-5 col-md-6 pt-md-0 pt-4">
              <h2 id="typewriter">{typed.text.trim()}</h2>
              <p>
                Club of Developers is an initiative of The Department of
                Computer Science & Engineering, BIET Jhansi. CODE aims to
                establish a coding culture on campus, reaching every student
                passionate about development. The club's motto is to
                Learn-Build-Innovate. CODE is for everyone, regardless of their
                field of study or their current level of knowledge.
              </p>
              <div className="mt-md-5 mb-lg-0">
                <a
                  className="btn btn-style default-btn"
                  href="https://drive.google.com/file/d/1nD_OfSQ70HxRf7SJKShOHcuiLiCX1rmd/view?usp=sharing"
                  style={{ fontWeight: 700, textTransform: "capitalize" }}
                  target="_blank"
                  rel="noopener"
                >
                  View our Works
                </a>
              </div>
            </div>
            <div className="col-md-6 banner-right mt-lg-4 mt-0 text-right offset-lg-1">
              <LazyLoadImage
                className="img-fluid"
                src={undraw_Code_thinking_re_gka2}
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Hero;
