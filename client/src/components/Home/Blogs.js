import React, { useEffect, useState } from "react";
import AOS from "aos";
import { Link } from "react-router-dom";
import like from "../assets/like.png";
import user from "../assets/user.png";
import calendar from "../assets/calendar.png";
import { LazyLoadImage } from "react-lazy-load-image-component";
import axios from "axios";
export const BlogCard = ({ blog }) => {
  return (
    <div className="cards__item">
      <Link className="cards__item__link" to={"/blogs/" + blog.url}>
        <figure
          className="cards__item__pic-wrap"
          data-category={blog.category}
          style={{ marginRight: 0, marginLeft: 0, marginTop: 0 }}
        >
          <LazyLoadImage
            alt=""
            src={blog.cardImg}
            style={{ width: "100%", height: "15rem" }}
          />
          {/* <img className="cards__item__img" alt="Image" src={blogImg} /> */}
        </figure>
        <div className="cards__item__info">
          <div className="info-icons">
            <div className=" icon-s">
              <img className="icon" src={user} alt="" />
              <span className="icon-name">{blog.postedBy.name}</span>
            </div>
            <div className=" icon-s">
              <img className="icon" src={like} alt="" />
              <span className="icon-name">{blog.likes || 0}</span>
            </div>
            <div className=" icon-s">
              <img className="icon" src={calendar} alt="" />
              <span className="icon-name">
                {new Date(blog.postedAt).toDateString()}
              </span>
            </div>
          </div>
          <h3 className="cards__item__text">{blog.title}</h3>
          <div className="tab">
            {blog.tags.map((tag) => (
              <span key={tag} className="round-tab">
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className="button">
          <button className="default-btn" aria-label="read-complete-blog">
            Read more
          </button>
        </div>
      </Link>
    </div>
  );
};
const Blogs = (props) => {
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    axios
      .get("/api/blogs?page=0&limit=3")
      .then((res) => {
        setBlogs(res.data.blogs);
      })
      .catch((err) => {});
  }, []);
  return (
    <div
      className="w3l-blog-content blog-section py-5 grey-bg"
      data-aos="fade-left"
      data-aos-delay="100"
      data-aos-once={true}
      data-aos-duration="1000"
    >
      <div className="container py-md-5 py-4">
        <div
          className="title-main text-center mx-auto mb-5"
          style={{ maxWidth: "600px" }}
        >
          <p className="mt-2">Knowledgebase</p>
          <h3 className="title-style" style={{ textAlign: "center" }}>
            Learn more from our latest{" "}
            <span style={{ fontWeight: "700", fontSize: "inherit" }}>Blog</span>{" "}
            Posts
          </h3>
        </div>
        <div className="row blog-cards-container">
          {blogs.map((blog, index) => {
            return (
              <div
                key={index}
                className="col-lg-4 col-md-6 col-sm-12 col-xs-12 blog-card"
                data-aos="zoom-in"
                data-aos-delay="100"
                data-aos-once={true}
                data-aos-duration="800"
              >
                <BlogCard blog={blog} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default Blogs;
