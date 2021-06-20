import React, { useState, useEffect, useContext } from "react";
import draftToHtml from "draftjs-to-html";
import DOMPurify from "dompurify";
import axios from "axios";
import { AuthContext } from "../../state/Store";
import { Redirect } from "react-router-dom";
import Loader from "../Loader/Loader";
import Nav from "../Navbar/Nav";
import Footer from "../Footer/Footer";
const Main = (props) => {
  const [blog, setBlog] = useState({});
  const [loading, setLoading] = useState(false);
  const auth = useContext(AuthContext);
  console.log(auth.state.userLoggedIn);
  useEffect(() => {
    if (!props.match.params.id) props.history.push("/page-not-found");
    setLoading(true);
    axios
      .get(`/api/reviewBlog/` + props.match.params.id)
      .then((res) => {
        setLoading(false);
        setBlog(res.data.blog);
        console.log(res.data.blog);
      })
      .catch((err) => {
        if (err.response && err.response.status == 404)
          props.history.push("/page-not-found");
      });
  }, []);
  const createMarkup = (html) => {
    return {
      __html: DOMPurify.sanitize(html),
    };
  };
  return (
    <>
      {!auth.state.userLoggedIn ? (
        <Redirect
          to={{
            pathname: "/login",
            state: { from: "/reviewBlog/" + props.match.params.id },
          }}
        />
      ) : (
        <>
          <Nav />
          <main className="blogs-individual-container-main" style={{marginBottom:"2rem"}}>
            <div className="ll">
              <div className=" l container">
                <div className="main_container">
                  <div className="content">
                    <header className="header1 header2">
                      <aside className="cat_position cat_info">
                        <a class="catagory" href="">
                          {blog.category}
                        </a>
                      </aside>
                      <h1 className="article_heading">{blog.title}</h1>
                      <div className="date">
                        <span>
                          {blog.postedAt &&
                            new Date(blog.postedAt).toDateString()}
                        </span>
                      </div>
                      {/* <div className="k">
                  <div className="l">
                    <img src={image}></img>
                  </div>
                  <span class="image_caption overlay">
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
                      style={{ marginTop: "1rem" }}
                    ></div>
                  </div>
                  <div className="article_footer">
                    <div className="article_tag">
                      <div className="tags post-tag">
                        <span className="tag_icon">
                          <i className="fas fa-tag"></i> TAGS
                        </span>
                        {blog.tags &&
                          blog.tags.map((tag) => {
                            return (
                              <a>
                                <span className="round-tab">{tag}</span>
                              </a>
                            );
                          })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
          <Footer />
        </>
      )}
      {loading && <Loader />}
    </>
  );
};

export default Main;
