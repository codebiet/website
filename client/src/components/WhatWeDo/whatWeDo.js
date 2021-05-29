import React from "react";
import Gate from "../assets/gatePrepare.svg";
import coding from "../assets/coding.svg";
import development from "../assets/development.svg";
function WhatWeDo() {
  return (
    <div>
      <section className="WhatweDo">
        <h2>What We Do</h2>

        <div className="cards-WhatweDo-div">
          <div className="cards">
            <img src={development} className="cardsImage" alt="devSvg"></img>
            <div className="cardsTitle"> Development </div>
            <div className="cardsDesc">
              We build a team of passionate developers to collaborate and
              contribute to open source projects, build applications and bring
              up innovative ideas.{" "}
            </div>
          </div>
          <div className="cards">
            <img src={Gate} className="cardsImage" alt="devSvg"></img>
            <div className="cardsTitle"> Mentorship for Interviews</div>
            <div className="cardsDesc">
              Mentorship from experts who have cracked various interviews.
              Equipping candidates with skills to ace interviews.{" "}
            </div>
          </div>
          <div className="cards">
            <img src={coding} className="cardsImage" alt="devSvg"></img>
            <div className="cardsTitle"> GATE preparation</div>
            <div className="cardsDesc">
              Taking students' GATE preparation to the next level by providing
              them with resources and guidance for their GATE exam.We not only
              focused on
            </div>
          </div>
          <div className="cards">
            <img src={coding} className="cardsImage" alt="devSvg"></img>
            <div className="cardsTitle"> Training and PLacements</div>
            <div className="cardsDesc">
              Making the students ready for the placement drives and
              recruitments under the guidance of our well placed seniors.{" "}
            </div>
          </div>
          <div className="cards">
            <img src={coding} className="cardsImage" alt="devSvg"></img>
            <div className="cardsTitle"> Interships / Jobs</div>
            <div className="cardsDesc">
              We provide students a platform to hone their skills and bring
              forth various internships and job opportunities.
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default WhatWeDo;
