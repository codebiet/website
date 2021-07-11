import React from "react";
import Ritesh from "../assets/final Year/ritesh_rai_sir_1.jpg";
import Samarth from "../assets/final Year/Samarth_Agarwal_Sir.jpg";
import Rajat from "../assets/final Year/Rajat Saxena.jpg";
const CardFounder = ({ quote, name, img, fbLink, lnkdinLink, email }) => {
  return (
    <div className="cardFounder">
      <p id="quoteFounder">{quote}</p>
      <div className="imgFounder">
        <img src={img} className="imagesFounder" alt="devSvg"></img>
      </div>

      <div className="Founderidentity">
        <p>
          <b>{name}</b>
        </p>
        <div className="social-links">
          <a href={fbLink} target="_blank">
            <i className="icon fab fa-facebook"></i>
          </a>
          <a href={lnkdinLink} target="_blank">
            <i className="icon fab fa-linkedin"></i>
          </a>
          <a href={"mailto:" + email} target="_blank">
            <i className="icon fas fa-envelope-square"></i>
          </a>
        </div>
      </div>
      <div className="FounderDesc">
        Founder | CODE<br></br>
        B.Tech | CSE |2017-21
        <br></br>
        BIET JHANSI
      </div>
    </div>
  );
};
function Founder() {
  return (
    <div className="founder-container">
      <div className="aboutCODE">
        <div className="role">
          <h1 className="BlockHeading">
            Founder's <span className="Headingspan">Message</span>
          </h1>

          <div>
            <p style={{marginBottom:"1rem"}}>
              "The world is changing, and old systems are no longer useful in
              the core fields. People have already stopped using hand drawing
              years ago. Although you may learn it in your college, it is just
              to learn how drawings work; the real industry focuses on
              programming and software for design and development.
            </p>
            <p>
              You need to change yourself and adapt if you want to survive in a
              fast-changing world.
              <br /> This makes the Club of DEvelopers one of the most important
              clubs in the institute "
            </p>
          </div>
          <div className="cardsFoundingMemberDiv">
            <CardFounder
              name="Ritesh Rai"
              quote="Technology is best when it brings people together. CODE enables you to come together and work."
              img={Ritesh}
              fbLink="https://www.facebook.com/profile.php?id=100023781995286"
              lnkdinLink="https://www.linkedin.com/in/ritesh-rai-3741ba178"
              email="riteshrai447@gmail.com"
            />
            <CardFounder
              name="Samarth Agarwal"
              quote={
                " Any sufficiently advanced technology is equivalent to magic. This club gives you multifarious advantages in a single place only "
              }
              img={Samarth}
              fbLink="https://www.facebook.com/samarthagarwal1414/"
              lnkdinLink="https://www.linkedin.com/in/samarth-agarwal-545429133/"
              email="samarthagarwal1414@gmail.com"
            />
            <CardFounder
              name="Rajat Saxena"
              quote={
                " Technology like art is a soaring exercise of the human imagination. Our Club have and will organise various competitions which will exercise your brain "
              }
              img={Rajat}
              fbLink="https://www.facebook.com/rajat.saxena.90410"
              lnkdinLink="https://www.linkedin.com/in/rajat-saxena-54509a15b/"
              email="saxena1975sanjeev@gmail.com"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Founder;
