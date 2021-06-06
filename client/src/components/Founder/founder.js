import React from "react";
import development from "../assets/dev.jpeg";
function Founder() {
  return (
    <div className="aboutCODE">
      <div className="role">
        <h1 className="BlockHeading">
          Founder's <span className="Headingspan">Message</span>
        </h1>

        <div>
          <p>
            "" The world is changing, and old systems are no longer useful in
            the core fields. People have already stopped using hand drawing
            years ago ""
          </p>
          <br></br>
          <p>
            "" Although you may learn it in your college, it is just to learn
            how drawings work; the real industry focuses on programming and
            software for design and development.
            <br></br>
            "" You need to change yourself and adapt if you want to survive in a
            fast-changing world.""
            <br></br>
            <br></br> "" This makes the Club of Developers one of the most
            important clubs in the institute ""
          </p>
        </div>
        <div className="cardsFoundingMemberDiv">
          <div className="cardFounder">
            <span className="quoteFounder">
              " Teaching and making larn to Enthusiastic juniors is always a
              task of responsibilty"
            </span>
            <div className="imgFounder">
              <img
                src={development}
                className="imagesFounder"
                alt="devSvg"
              ></img>
            </div>

            <>
              <div className="FounderTitle">
                {" "}
                Ritesh Rai
                <span>
                  <a
                    href="https://www.linkedin.com/company/codebiet/"
                    rel="noreferrer"
                    target="_blank"
                  >
                    <i
                      className="fab fa-linkedin"
                      style={{ color: "#ec7c2d" }}
                    ></i>
                  </a>
                </span>
              </div>
              <div className="FounderDesc">
                Co-Founder ,CODE<br></br>
                B.Tech in Computer Science
                <br></br>
                BIET JHANSI
              </div>
            </>
          </div>
          <div className="cardFounder">
            <span className="quoteFounder">
              " Teaching and making larn to Enthusiastic juniors is always a
              task of responsibilty"
            </span>
            <div className="imgFounder">
              <img
                src={development}
                className="imagesFounder"
                alt="devSvg"
              ></img>
            </div>{" "}
            <>
              <div className="FounderTitle">
                {" "}
                Samarth Agrawal
                <span>
                  <a
                    href="https://www.linkedin.com/company/codebiet/"
                    rel="noreferrer"
                    target="_blank"
                  >
                    <i
                      className="fab fa-linkedin"
                      style={{ color: "#ec7c2d" }}
                    ></i>
                  </a>
                </span>
              </div>
              <div className="FounderDesc">
                Co-Founder ,CODE<br></br>
                B.Tech in Computer Science
                <br></br>
                BIET JHANSI
              </div>
            </>
          </div>
          <div className="cardFounder">
            <span className="quoteFounder">
              " Teaching and making larn to Enthusiastic juniors is always a
              task of responsibilty"
            </span>
            <div className="imgFounder">
              <img
                src={development}
                className="imagesFounder"
                alt="devSvg"
              ></img>
            </div>
            <>
              <div className="FounderTitle">
                {" "}
                Rajat Saxena
                <span>
                  <a
                    href="https://www.linkedin.com/company/codebiet/"
                    rel="noreferrer"
                    target="_blank"
                  >
                    <i
                      className="fab fa-linkedin"
                      style={{ color: "#ec7c2d" }}
                    ></i>
                  </a>
                </span>
              </div>
              <div className="FounderDesc">
                Co-Founder ,CODE<br></br>
                B.Tech in Computer Science
                <br></br>
                BIET JHANSI
              </div>

              <div></div>
            </>
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
}

export default Founder;
