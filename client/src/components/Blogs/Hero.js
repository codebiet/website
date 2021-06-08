import React from "react";
import image1 from "../assets/blogImg1.jpg";
const Hero = (props) => {
  return (
    <div className="blogs-hero-container">
      <div className="header_container">
        <div className="div1">
          <div id="containr" className="cards__item__pic-wrap1">
            <img src={image1} className="image1" />
            <div class="example">
              <a>
                Recursion in Data Structure: How Does it Work, Types & When Used
              </a>
              <div className="tab_h">
                <span className="round-tab_h">Designing</span>
                <span className="round-tab_h">Web development</span>
                <span className="round-tab_h">Coding</span>
              </div>
            </div>
          </div>
        </div>
        <div className="div2">
          <div className="recent_card  cards__item__pic-wrap1" id="container">
            <span className="d">
              <img src={image1} className="image2" />
            </span>
            <div className="text_overlay ">
              <a>How to use the map function in JavaScript?</a>
              <div className="tab_h">
                <span className="round-tab_h">Designing</span>
                <span className="round-tab_h">Web development</span>
                <span className="round-tab_h">Coding</span>
              </div>
            </div>
          </div>
          <div className="recent_card cards__item__pic-wrap1" id="container">
            <div className="d">
              <img src={image1} className="image2" />
            </div>
            <div className="text_overlay">
              <a>How to use the map function in JavaScript?</a>
              <div className="tab_h">
                <span className="round-tab_h">Designing</span>
                <span className="round-tab_h">Web development</span>
                <span className="round-tab_h">Coding</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
