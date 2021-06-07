import React from "react";
import image from "../assets/BlogImage.jpg";
import Comment from "./Comment";
const Main = (props) => {
  return (
    <main className="blogs-individual-container-main">
      <div className="ll">
        <div className=" l container">
          <div className="main_container">
            <div className="content">
              <header className="header1 header2">
                <aside className="cat_position cat_info">
                  <a class="catagory" href="">
                    Data structure
                  </a>
                </aside>
                <h1 className="article_heading">
                  Recursion in Data Structure: How Does it Work, Types &amp;
                  When Used | Coding Ninjas Blog
                </h1>
                <div className="date">
                  <span>12 May 2020</span>
                </div>
                <div className="k">
                  <div className="l">
                    <img src={image}></img>
                  </div>
                  <span class="image_caption overlay">
                    Code gives you wings
                  </span>
                </div>
              </header>
            </div>

            <div className="content_body content">
              <div>
                <h2>Introduction To Career Camp</h2>
                <p>
                  Meet Sudhendra Kumar Singh, a B. TECH (C.S.E) graduate from
                  Amity University batch 2016-20. He joined the Coders Club in
                  his college and won several distinctions in coding hackathons
                  throughout his graduation. Singh joined Coding Ninjas’ Career
                  Camp in January 2020 and soon bagged an internship in July
                  2020 as a Full-stack web developer in Brickview Studios and
                  soon got placed as a front-end developer in Gocomet Pvt Ltd
                  via Career Camp. He is also serving as a Teaching Assistant
                  for current Career Camp batches for web development and Data
                  structures courses.
                </p>
                <h2>Coding Journey</h2>
                <p>
                  First few months I struggled a lot, then after six months, I
                  was able to solve almost all basic to intermediate level
                  problems. Then I joined Coding Ninjas which improved my
                  problem-solving skills,” Singh mentions. He came to know about
                  Career Camp through his friend who suggested he appear for the
                  Career Camp entrance test.
                </p>
                <h2>Introduction To Career Camp</h2>
                <p>
                  Meet Sudhendra Kumar Singh, a B. TECH (C.S.E) graduate from
                  Amity University, batch 2016-20. He joined the Coders Club in
                  his college and won several distinctions in coding hackathons
                  throughout his graduation. Singh joined Coding Ninjas’ Career
                  Camp in January 2020 and soon bagged an internship in July
                  2020 as a Full-stack web developer in Brickview Studios and
                  soon got placed as a front-end developer in Gocomet Pvt Ltd
                  via Career Camp. He is also serving as a Teaching Assistant
                  for current Career Camp batches for web development and Data
                  structures courses.{" "}
                </p>
                <h2>Coding Journey</h2>
                <p>
                  First few months I struggled a lot, then after six months, I
                  was able to solve almost all basic to intermediate level
                  problems. Then I joined Coding Ninjas which improved my
                  problem-solving skills,” Singh mentions. He came to know about
                  Career Camp through his friend who suggested he appear for the
                  Career Camp entrance test.
                </p>
              </div>
            </div>
            <div className="article_footer">
              <div className="article_tag">
                <div className="tags post-tag">
                  <span className="tag_icon">
                    <i className="fas fa-tag"></i> TAGS
                  </span>
                  <a>
                    <span className="round-tab">Web development</span>
                  </a>
                  <a>
                    <span className="round-tab">Designing</span>
                  </a>
                  <a>
                    <span className="round-tab">Career</span>
                  </a>
                </div>
              </div>
            </div>
            {/* social media div */}
            <aside className="social_media_cot">
              <div className="share_tab">
                <span className="share_no">0</span>
                <span className="share">Shares</span>
              </div>
              <div className="social_media">
                <a>
                  <i className="social_icon facebook">
                    <i className="fab fa-facebook"></i>
                  </i>
                  <span className="fb"> Share on Facebook</span>
                </a>
                <a>
                  <i className="social_icon twitter">
                    <i className="fab fa-twitter"></i>
                  </i>
                  <span className="twi">Share on Twitter</span>
                </a>
                <a>
                  <i className="social_icon pinterest">
                    <i className="fab fa-pinterest"></i>
                  </i>
                </a>
                <a>
                  <i className="social_icon mail">
                    <i className="fas fa-envelope"></i>
                  </i>
                </a>
              </div>
            </aside>
            {/* comment box here */}
            <Comment />

            {/* comment box */}
          </div>
          {/* main container end here */}
          <div className="recent_container">
            <div className="blogs-sidebar">
              <div className="op search search_box">
                <form className="search_form" style={{ marginLeft: 0 }}>
                  <label style={{width:"100%"}}>
                    <span></span>
                    <input
                      type="Search"
                      placeholder="Search"
                      className="search_input"
                    ></input>
                  </label>
                  {/* <input type="submit" className="search_icon"></input> */}
                </form>
              </div>
              <div className="widget">
                <h2 className="recent_widget recent_post">Recent Post</h2>
                <ul>
                  <li>
                    <a id="link">
                      <i className="fas fa-edit"></i>
                      Facebook Interview Questions for Off-Campus Placement
                    </a>
                    <span className="post-date">date</span>
                  </li>

                  <li>
                    <a id="link">
                      <i className="fas fa-edit"></i>
                      Coding Ninjas’ Career Camp Gives You Wings To Achieve Your
                      Dreams
                    </a>
                    <span className="post-date">Date</span>
                  </li>
                  <li>
                    <a id="link">
                      <i className="fas fa-edit"></i>
                      Clustering in Machine Learning for Python
                    </a>
                    <span className="post-date">Date</span>
                  </li>
                  <li>
                    <a id="link">
                      <i className="fas fa-edit"></i>
                      Java Cheat Sheet: Things You Should Be Knowing
                    </a>
                    <span className="post-date">Date</span>
                  </li>
                  <li>
                    <a id="link">
                      <i className="fas fa-edit"></i>
                      Facebook Interview Questions for Off-Campus Placement
                    </a>
                    <span className="post-date">Date</span>
                  </li>
                  <li>
                    <a id="link">
                      <i className="fas fa-edit"></i>
                      Commonly used Machine Learning Algorithms (with Python & R
                      Codes)
                    </a>
                    <span className="post-date">Date</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Main;
