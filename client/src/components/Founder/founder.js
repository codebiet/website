import React from "react";
import development from "../assets/development.svg";
function Founder() {
  return (
    <div>
      <section className="role">
        <h1>Founder's Message</h1>

        <div>
          <p>
            "" The world is changing, and old systems are no longer useful in
            the core fields. People have already stopped using hand drawing
            years ago ""{" "}
          </p>
          <p>
            "" Although you may learn it in your college, it is just to learn
            how drawings work; the real industry focuses on programming and
            software for design and development. You need to change yourself and
            adapt if you want to survive in a fast-changing world. This makes
            the Club of Developers one of the most important clubs in the
            institute ""
          </p>
        </div>
        <div className="cardsFoundingMemberDiv">
          <div className="cardFounder">
            <div className="imgFounder">
              <img
                src={development}
                className="imagesFounder"
                alt="devSvg"
              ></img>
            </div>{" "}
            <>
              <div className="FounderTitle"> Ritsh Rai</div>
              <div className="FounderDesc">
                Co-Founder
                <li>
                  <a
                    href="https://www.linkedin.com/company/codebiet/"
                    rel="noreferrer"
                    target="_blank"
                  >
                    Lin
                  </a>
                </li>
              </div>
            </>
          </div>
          <div className="cardFounder">
            <div className="imgFounder">
              <img
                src={development}
                className="imagesFounder"
                alt="devSvg"
              ></img>
            </div>{" "}
            <>
              <div className="FounderTitle"> Samarth Agrawal</div>
              <div className="FounderDesc">
                Co-Founder
                <li>
                  <a
                    href="https://www.linkedin.com/company/codebiet/"
                    rel="noreferrer"
                    target="_blank"
                  >
                    Lin
                  </a>
                </li>
              </div>
            </>
          </div>
          <div className="cardFounder">
            <div className="imgFounder">
              <img
                src={development}
                className="imagesFounder"
                alt="devSvg"
              ></img>
            </div>
            <>
              <div className="FounderTitle"> Rajat Saxena </div>
              <div className="FounderDesc">
                Co-Foundr
                <li>
                  <a
                    href="https://www.linkedin.com/company/codebiet/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Lin
                  </a>
                </li>
              </div>
              <div></div>
            </>
          </div>
          <div></div>
        </div>
      </section>
    </div>
  );
}

export default Founder;
