import React from "react";
import img from "../assets/SVG.svg";
function Project() {
  return (
    <div className="project">
      <div className="projectOuter">
        <div className="projectsCards">
          <div className="projectCard">
            <div className="projectThumbnail">
              <img src={img} className="imagesFounder" alt="devSvg"></img>
            </div>
            <hr></hr>
            <div className="projectDetails">
              Mario Forever <br></br>
              <div className="projectDesc">
                A Ml learning project drives and handles the proper guidance
              </div>
              <div className="pojectDeveloper">
                -Ryan Parag
                <span> ,third year,CSE</span>
              </div>
              <li>
                <a
                  href="https://www.linkedin.com/company/codebiet/"
                  target="_blank"
                  rel="noreferrer"
                >
                  See live
                </a>
              </li>
            </div>
          </div>
          <div className="projectCard">
            <div className="projectThumbnail">
              <img src={img} className="imagesFounder" alt="devSvg"></img>
            </div>
            <hr></hr>
            <div className="projectDetails">
              Mario Forever <br></br>
              <div className="projectDesc">
                A Ml learning project drives and handles the proper guidance
              </div>
              <div className="pojectDeveloper">
                -Ryan Parag
                <span> ,third year,CSE</span>
              </div>
              <li>
                <a
                  href="https://www.linkedin.com/company/codebiet/"
                  target="_blank"
                  rel="noreferrer"
                >
                  See live
                </a>
              </li>
            </div>
          </div>
          <div className="projectCard">
            <div className="projectThumbnail">
              <img src={img} className="imagesFounder" alt="devSvg"></img>
            </div>
            <hr></hr>
            <div className="projectDetails">
              Mario Forever <br></br>
              <div className="projectDesc">
                A Ml learning project drives and handles the proper guidance
              </div>
              <div className="pojectDeveloper">
                -Ryan Parag
                <span> ,third year,CSE</span>
              </div>
              <li>
                <a
                  href="https://www.linkedin.com/company/codebiet/"
                  target="_blank"
                  rel="noreferrer"
                >
                  See live
                </a>
              </li>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Project;
