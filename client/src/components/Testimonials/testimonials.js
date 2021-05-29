import React from "react";
import img from "../assets/SVG.svg";
function Testimonials() {
  return (
    <div className="testomialsDiv">
      <h2>" What other say about C.O.D.E "</h2>

      <div className="testimonialInnerDiv">
        <div className="testimonialsCard">
          The mentors inspire a lot and encourage us to learn new technology.
          Happy to get training from them.
          <div className="writerDiv">
            <div className="writerImageDiv">
              <img src={img} alt=" Witer" className="writerImage"></img>
            </div>
            <div className="writerDesc">
              --Ramu bansilal ,first year student
              <br></br>
              @Taks
            </div>
          </div>
        </div>
        <div className="testimonialsCard">
          {" "}
          .I am highly influenced by the policy of “Learning on the go” that
          code follows to fulfill its learn build innovate moto
          <div className="writerDiv">
            <div className="writerImageDiv">
              <img src={img} alt="  Witer" className="writerImage"></img>
            </div>
            <div className="writerDesc">
              --Kanhaiya ,KIET
              <br></br>
              @Taks
            </div>
          </div>
        </div>
        <div className="testimonialsCard">
          {" "}
          .CODE is a place where you can broaden your mind with practical and
          beneficial web development projects. Highly recommend it to anyone who
          wants to reach the cutting edge of the web
          <div className="writerDiv">
            <div className="writerImageDiv">
              <img src={img} alt=" Witer" className="writerImage"></img>
            </div>
            <div className="writerDesc">
              --3rd yr,CSE
              <br></br>
              @Taks
            </div>
          </div>{" "}
        </div>
      </div>
    </div>
  );
}

export default Testimonials;
