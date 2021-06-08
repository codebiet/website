import React from "react";
import image1 from "../assets/BlogImage.jpg";
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
        <div className="button">
          <button>Read more</button>
        </div>
      </Link>
    </div>
  );
};
const Card = (props) => {
  return (
    <div className="card-container-blogsIndividual">
      <div className="card_main_cot">
        <div className="card_cot cot">
          <div className="post">
            <header className="header">
              <h2 class="block_title h3" style={{ marginLeft: 10 }}>
                You might also enjoy
              </h2>
            </header>
            <div className="cards">
              <div className="cards__container">
                <div className="cards__wrapper">
                  <div className="cards__items">
                    <CardItem
                      src={image1}
                      text="Why You Should Learn R for Data Science?"
                      label="Competetive Programming"
                      path=""
                      tag="Designing"
                    />
                    <CardItem
                      src={image1}
                      text="Top 30 Hadoop Interview Questions You Must Prepare"
                      label="Code Studio"
                      path=""
                      tag="Designing"
                    />
                    <CardItem
                      src={image1}
                      text="10 Data Scientist Skills You Need in 2021"
                      label="Code Studio"
                      path=""
                      tag="Designing"
                    />
                    <CardItem
                      src={image1}
                      text="10 Data Scientist Skills You Need in 2021"
                      label="Code Studio"
                      path=""
                      tag="Designing"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
export { CardItem };
