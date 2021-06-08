import React, { lazy } from "react";
import image1 from "../assets/blogImg1.jpg";
import image2 from "../assets/blogImg2.jpg";
import image3 from "../assets/blogImg3.jpg";
import date from "../assets/date.png";
import user from "../assets/user.png";
import like from "../assets/like.png";
import { Link } from "react-router-dom";
const CardItem = (props) => {
  return (
    <div className="cards__item">
      <Link className="cards__item__link" to={props.path}>
        <figure
          className="cards__item__pic-wrap"
          data-category={props.label}
          style={{ marginRight: 0, marginLeft: 0, marginTop: 0 }}
        >
          <img className="cards__item__img" alt="Image" src={props.src} />
        </figure>
        <div className="cards__item__info">
          <div className="info-icons">
            <div className=" icon-s">
              <img className="icon" src={user} />
              <span className="icon-name">name </span>
            </div>
            <div className=" icon-s">
              <img className="icon" src={like} />
              <span className="icon-name">33 </span>
            </div>
            <div className=" icon-s">
              <img className="icon" src={date} />
              <span className="icon-name">Date </span>
            </div>
          </div>
          <p className="cards__item__text" href={props.text}>
            {props.text}
          </p>
          <div className="tab">
            <span className="round-tab">{props.tag}</span>
            <span className="round-tab">{props.tag}</span>
            <span className="round-tab">{props.tag}</span>
          </div>
        </div>
        <div className="button" style={{marginLeft:"20px"}}>
          <button>Read more</button>
        </div>
      </Link>
    </div>
  );
};
function Cards() {
  return (
    <div className="blogs-card-container">
      <div className="cards">
        <h2>Data science & ML</h2>
        <div className="cards__container">
          <div className="cards__wrapper">
            <div className="cards__items">
              <CardItem
                src={image1}
                text="Why You Should Learn R for Data Science?"
                label="Competetive Programming"
                path="/blogs/id"
                tag="Designing"
              />
              <CardItem
                src={image1}
                text="Top 30 Hadoop Interview Questions You Must Prepare"
                label="Code Studio"
                path="/blogs/id"
                tag="Designing"
              />
              <CardItem
                src={image1}
                text="10 Data Scientist Skills You Need in 2021"
                label="Code Studio"
                path="/blogs/id"
                tag="Designing"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="cards">
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
            </div>
          </div>
        </div>
      </div>
      <div className="cards">
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
    </div>
  );
}

export default Cards;
