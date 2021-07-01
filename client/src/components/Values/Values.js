import { TrendingUp } from "@material-ui/icons";
import React from "react";
import { FcSupport } from "react-icons/fc";
import { GrTechnology } from "react-icons/gr";

const Values = () => {
  return (
    <div className="aboutCODE">
      <h1 className="valuesHeading BlockHeading">
        Our <span className="Headingspan">Values</span>
      </h1>
      <div className="valuesDiv">
        <div className="valueCard">
          <span>🎯</span>Best Mentorship
        </div>
        <div className="valueCard">
          <span>🚀</span>Open source environment
        </div>
        <div className="valueCard">
          <span>
            <FcSupport />
          </span>
          Discussion Platform
        </div>
        <div className="valueCard">
          <span>💰</span>Free to join and Learn
        </div>
        <div className="valueCard">
          <span>
            <GrTechnology />
          </span>
          Work on Trending Technologies
        </div>
        <div className="valueCard">
          <span>❤️</span>Healthy competition
        </div>
      </div>
    </div>
  );
};

export default Values;
