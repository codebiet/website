import React, { useEffect } from "react";
import AOS from "aos";
import { Link } from "react-router-dom";
import like from "../assets/like.png";
import user from "../assets/user.png";
import calendar from "../assets/calendar.png";
import blogCardImg1 from "../assets/blogCardImg1.jpg";
import blogCardImg2 from "../assets/blogCardImg2.jpg";
import blogCardImg3 from "../assets/blogCardImg3.jpg";
const blogsData = [
  {
    writer: "Sooraj",
    likes: "26",
    publishedOn: "May-20",
    path: "#",
    category: "Web Development",
    tags: ["Web Development", "React", "React-To-Pdf"],
    blogImg: blogCardImg1,
    description: "How to generate pdf of a react component?",
  },
  {
    writer: "Sooraj",
    likes: "56",
    publishedOn: "May-25",
    path: "#",
    category: "Web Development",
    tags: ["Web Development", "Node.js", "Express.js", "ReactJs", "MongoDB"],
    blogImg: blogCardImg2,
    description: "Getting Started with MERN Stack!",
  },
  {
    writer: "Sooraj",
    likes: "10",
    publishedOn: "June-01",
    path: "#",
    category: "Web Development",
    tags: ["Node.js", "Express.js", "file-upload", "AWS-SDK", "S3"],
    blogImg: blogCardImg3,
    description: "Uploading files to AWS S3 using ExpressJS",
  },
];
export const BlogCard = ({
  writer,
  likes,
  publishedOn,
  path,
  category,
  tags,
  blogImg,
  description,
}) => {
  return (
    <div className="cards__item">
      <Link className="cards__item__link" to={path}>
        <figure
          className="cards__item__pic-wrap"
          data-category={category}
          style={{ marginRight: 0, marginLeft: 0, marginTop: 0 }}
        >
          <img className="cards__item__img" alt="Image" src={blogImg} />
        </figure>
        <div className="cards__item__info">
          <div className="info-icons">
            <div className=" icon-s">
              <img className="icon" src={user} />
              <span className="icon-name">{writer}</span>
            </div>
            <div className=" icon-s">
              <img className="icon" src={like} />
              <span className="icon-name">{likes}</span>
            </div>
            <div className=" icon-s">
              <img className="icon" src={calendar} />
              <span className="icon-name">{publishedOn}</span>
            </div>
          </div>
          <h3 className="cards__item__text">{description}</h3>
          <div className="tab">
            {tags.map((tag) => (
              <span key={tag} className="round-tab">
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className="button">
          <button>Read more</button>
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
          {blogsData.map((data) => {
            return (
              <div
                className="col-lg-4 col-md-6 col-sm-12 col-xs-12 blog-card"
                data-aos="zoom-in"
                data-aos-delay="100"
                data-aos-once={true}
                data-aos-duration="800"
              >
                <BlogCard {...data} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default Blogs;
