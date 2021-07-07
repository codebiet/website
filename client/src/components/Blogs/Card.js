import React, { useState, useEffect, lazy } from "react";
import date from "../assets/date.png";
import user from "../assets/user.png";
import like from "../assets/like.png";
import { Link } from "react-router-dom";
import axios from "axios";
// import Pagination from "../Pagination/Pagination";
const Pagination = lazy(() => import("../Pagination/Pagination"));
import Loader from "../Loader/Loader";
import { LazyLoadImage } from "react-lazy-load-image-component";
const CardItem = (props) => {
  return (
    <div className="cards__item">
      <Link className="cards__item__link" to={props.path}>
        <figure
          className="cards__item__pic-wrap"
          data-category={props.category}
          style={{ marginRight: 0, marginLeft: 0, marginTop: 0 }}
        >
          <LazyLoadImage
            className="cards__item__img"
            alt="Image"
            src={props.src}
          />
        </figure>
        <div className="cards__item__info">
          <div className="info-icons">
            <div className=" icon-s">
              <img className="icon" src={user} />
              <span className="icon-name">{props.name} </span>
            </div>
            {/* <div className=" icon-s">
              <img className="icon" src={like} />
              <span className="icon-name">33 </span>
            </div> */}
            <div className=" icon-s">
              <img className="icon" src={date} />
              <span className="icon-name">
                {new Date(props.date).toDateString()}{" "}
              </span>
            </div>
          </div>
          <p className="cards__item__text" href={props.text}>
            {props.text}
          </p>
          <div className="tab">
            {props.tags.map((tag) => (
              <span className="round-tab">{tag}</span>
            ))}
          </div>
        </div>
        <div className="button" style={{ marginLeft: "20px" }}>
          <button className="default-btn">Read more</button>
        </div>
      </Link>
    </div>
  );
};
function Cards() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  //pagination -- start
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(9);
  const [totalItems, setTotalItems] = useState(8);
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  //pagination -- end
  useEffect(() => {
    setLoading(true);
    axios
      .get(`/api/blogs?state=APPROVED&page=${currentPage - 1}&limit=9&skip=3`) //pagination starts from 0
      .then((res) => {
        setBlogs(res.data.blogs);
        setTotalItems(res.data.totalItems);
        setLoading(false);
      })
      .catch((err) => {});
  }, []);
  return (
    <>
      <div className="blogs-card-container">
        <div className="cards">
          <div className="cards__container">
            <div className="cards__wrapper">
              <div className="cards__items">
                {blogs.map((blog) => (
                  <CardItem
                    key={blog._id}
                    src={blog.cardImg}
                    text={blog.title}
                    category={blog.category}
                    path={"/blogs/" + blog.url}
                    tags={blog.tags}
                    date={blog.postedAt}
                    name={blog.postedBy.name}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
        {/* <div className="cards">
        <h2>Web development</h2> 
        <div className="cards__container">
          <div className="cards__wrapper">
            <div className="cards__items">
              <CardItem
                src={image2}
                text="Top Angular Interview Questions and Answers [Updated in 2021]"
                label="Data Science & ML"
                path="/blogs/id"
                tag="Designing"
              />
              <CardItem
                src={image2}
                text="HTML VS CSS: What’s The Difference?"
                label="Data Science & ML"
                path="/blogs/id"
                tag="Designing"
              />
              <CardItem
                src={image2}
                text="Flask vs Django in 2021: Which Framework to Choose?"
                label="Data Science & ML"
                path="/blogs/id"
                tag="Designing"
              />
              <CardItem
                src={image2}
                text="Flask vs Django in 2021: Which Framework to Choose?"
                label="Data Science & ML"
                path="/blogs/id"
                tag="Designing"
              />
              <CardItem
                src={image2}
                text="Flask vs Django in 2021: Which Framework to Choose?"
                label="Data Science & ML"
                path="/blogs/id"
                tag="Designing"
              />
            </div>
          </div>
        </div>
      </div>
     */}
        {/* <div className="cards">
        <h2>Interview Preparations</h2>
        <div className="cards__container">
          <div className="cards__wrapper">
            <div className="cards__items">
              <CardItem
                src={image3}
                text="Building A Good Resume Of A Programmer"
                label="Data Science & ML"
                path="/blogs/id"
                tag="Designing"
              />
              <CardItem
                src={image3}
                text="How To Crack Off-Campus Internships?"
                label="Data Science & ML"
                path="/blogs/id"
                tag="Designing"
              />
              <CardItem
                src={image3}
                text="Top 30 Hadoop Interview Questions You Must Prepare"
                label="Data Science & ML"
                path="/blogs/id"
                tag="Designing"
              />
            </div>
          </div>
        </div>
      </div>
     */}
      </div>
      {totalItems > limit && (
        <Pagination
          totalItems={totalItems}
          pageSize={limit}
          handlePageChange={handlePageChange}
        />
      )}
      {loading && <Loader />}
    </>
  );
}

export default Cards;
