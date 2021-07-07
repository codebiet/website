import React, { useState, useEffect, lazy } from "react";
import DOMPurify from "dompurify";
import axios from "axios";
import draftToHtml from "draftjs-to-html";
import { Link } from "react-router-dom";
// import Card from "./Card";
import Loader from "../Loader/Loader";
// import Comment from "./Comment";
const Card = lazy(() => import("./Card"));
// const Loader = lazy(() => import("../Loader/Loader"));
const Comment = lazy(() => import("./Comment"));
const Main = (props) => {
  const [blog, setBlog] = useState({});
  const [prevBlog, setPrevBlog] = useState({});
  const [nextBlog, setNextBlog] = useState({});
  const [recentBlogs, setRecentBlogs] = useState([]);
  const [suggestedBlogs, setSuggestedBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const createMarkup = (html) => {
    return {
      __html: DOMPurify.sanitize(html),
    };
  };
  useEffect(() => {
    setLoading(true);
    window.scrollTo(0, 0);
    axios
      .get("/api/blog/" + props.match.params.url)
      .then((res) => {
        setLoading(false);
        setBlog(res.data.blog);
        if (res.data.prevBlog.length != 0) setPrevBlog(res.data.prevBlog[0]);
        else setPrevBlog({});
        if (res.data.nextBlog.length != 0) setNextBlog(res.data.nextBlog[0]);
        else setNextBlog({});
        setRecentBlogs(res.data.recentBlogs);
        setSuggestedBlogs(res.data.suggestedBlogs);
      })
      .catch((err) => {
        if (err.response && err.response.status == 404)
          props.history.push("/page-not-found");
      });
  }, [props.match.params.url]);
  return (
    <main className="blogs-individual-container-main">
      <div className="ll" style={{ maxWidth: "100vw" }}>
        <div className=" l container">
          <div className="blogs-and-resent-blogs-container">
            <div className="main_container">
              <div className="content">
                <header className="header1 header2">
                  <aside className="cat_position cat_info">
                    <Link className="catagory" to="#">
                      {blog.category}
                    </Link>
                  </aside>
                  <h1
                    className="article_heading"
                    style={{ marginBottom: "1rem" }}
                  >
                    {blog.title}
                  </h1>
                  <div className="date" style={{ marginBottom: "1rem" }}>
                    <span>
                      {blog.postedAt && new Date(blog.postedAt).toDateString()}
                    </span>
                  </div>
                  {/* <div className="k">
                  <div className="l">
                    <img src={blog.cardImg}></img>
                  </div>
                  <span className="image_caption overlay">
                    Code gives you wings
                  </span>
                </div> */}
                </header>
              </div>

              <div className="content_body content">
                <div
                  dangerouslySetInnerHTML={createMarkup(
                    draftToHtml(JSON.parse(blog.content || "{}"))
                  )}
                  style={{ textAlign: "justify" }}
                ></div>
              </div>
              <div className="article_footer">
                <div className="article_tag">
                  <div className="tags post-tag">
                    <span className="tag_icon">
                      <i className="fas fa-tag"></i> TAGS
                    </span>
                    {blog.tags &&
                      blog.tags.map((tag) => (
                        <a>
                          <span className="round-tab">{tag}</span>
                        </a>
                      ))}
                  </div>
                </div>
              </div>
              {/* social media div */}
              {/* <aside className="social_media_cot">
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
           */}
              {/* comment box here */}
              {blog._id && (
                <Comment
                  id={blog._id}
                  prevBlog={prevBlog}
                  nextBlog={nextBlog}
                />
              )}

              {/* comment box */}
            </div>
            <Card suggestedBlogs={suggestedBlogs} />
          </div>
          {/* main container end here */}
          <div className="recent_container">
            <div className="blogs-sidebar">
              <div className="op search search_box">
                <form className="search_form" style={{ marginLeft: 0 }}>
                  <label style={{ width: "100%" }}>
                    <span></span>
                    {/* <input
                      type="Search"
                      placeholder="Search"
                      className="search_input"
                    ></input> */}
                  </label>
                </form>
              </div>
              {recentBlogs.length > 0 && (
                <div className="widget">
                  <h2 className="recent_widget recent_post">Recent Post</h2>
                  <ul className="recent-blogs" style={{marginLeft:"0"}}>
                    {recentBlogs &&
                      recentBlogs.map((blog) => {
                        return (
                          <li>
                            <Link id="link" to={"/blogs/" + blog.url}>
                              <i className="fas fa-edit"></i>
                              {blog.title}
                            </Link>
                            <span className="post-date">
                              {new Date(blog.postedAt).toDateString()}
                            </span>
                          </li>
                        );
                      })}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {loading && <Loader />}
    </main>
  );
};

export default Main;
