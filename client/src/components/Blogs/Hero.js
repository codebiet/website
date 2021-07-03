import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Loader from "../Loader/Loader";
const Hero = (props) => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    axios
      .get("/api/blogs?state=APPROVED&page=0&limit=3")
      .then((res) => {
        setLoading(false);
        setBlogs(res.data.blogs);
      })
      .catch((err) => {});
  }, []);
  return (
    <div className="blogs-hero-container">
      <div className="header_container">
        <div className="div1">
          {blogs.length > 0 && (
            <Link className="cards__item__link" to={"/blogs/" + blogs[0].url}>
              <div id="containr" className="cards__item__pic-wrap1">
                <div style={{ position: "relative", height: "100%" }}>
                  <img src={blogs[0].cardImg} className="image1" />
                  <span className="blog-category">{blogs[0].category}</span>
                </div>
                <div className="example">
                  <a>{blogs[0].title}</a>
                  <div className="tab_h">
                    {blogs[0].tags &&
                      blogs[0].tags.map((tag) => (
                        <span className="round-tab_h">{tag}</span>
                      ))}
                  </div>
                </div>
              </div>
            </Link>
          )}
        </div>
        <div className="div2">
          {blogs.length > 1 && (
            <Link className="cards__item__link" to={"/blogs/" + blogs[1].url}>
              <div
                className="recent_card  cards__item__pic-wrap1"
                id="container"
              >
                <span className="d">
                  <img src={blogs[1].cardImg} className="image2" />
                  <span className="blog-category">{blogs[1].category}</span>
                </span>
                <div className="text_overlay ">
                  <a>{blogs[1].title}</a>
                  <div className="tab_h">
                    {blogs[1].tags &&
                      blogs[1].tags.map((tag) => (
                        <span className="round-tab_h">{tag}</span>
                      ))}
                  </div>
                </div>
              </div>
            </Link>
          )}
          {blogs.length > 2 && (
            <Link className="cards__item__link" to={"/blogs/" + blogs[2].url}>
              <div
                className="recent_card cards__item__pic-wrap1"
                id="container"
              >
                <div className="d">
                  <img src={blogs[2].cardImg} className="image2" />
                  <span className="blog-category">{blogs[2].category}</span>
                </div>
                <div className="text_overlay">
                  <a>{blogs[2].title}</a>
                  <div className="tab_h">
                    {blogs[2].tags &&
                      blogs[2].tags.map((tag) => (
                        <span className="round-tab_h">{tag}</span>
                      ))}
                  </div>
                </div>
              </div>
            </Link>
          )}
        </div>
      </div>
      {loading && <Loader />}
    </div>
  );
};

export default Hero;
