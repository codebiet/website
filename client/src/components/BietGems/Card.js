import React from "react";
import FilterForm from "./FilterForm";
import user_image from "../assets/boy.png";
import { Link } from "react-router-dom";
const userData = [
  {
    name: "Sooraj Shukla",
    branch: "CSE",
    facebook: "https://www.facebook.com/sooraj.shukla.395/",
    linkedin: "https://linkedin.com/soorajshukla974",
    github: "https://github.com/soorajarsn",
  },
  {
    name: "Sooraj Shukla",
    branch: "CSE",
    facebook: "https://www.facebook.com/sooraj.shukla.395/",
    linkedin: "https://linkedin.com/soorajshukla974",
    github: "https://github.com/soorajarsn",
  },
  {
    name: "Sooraj Shukla",
    branch: "CSE",
    facebook: "https://www.facebook.com/sooraj.shukla.395/",
    linkedin: "https://linkedin.com/soorajshukla974",
    github: "https://github.com/soorajarsn",
  },
  {
    name: "Sooraj Shukla",
    branch: "CSE",
    facebook: "https://www.facebook.com/sooraj.shukla.395/",
    linkedin: "https://linkedin.com/soorajshukla974",
    github: "https://github.com/soorajarsn",
  },
  {
    name: "Sooraj Shukla",
    branch: "CSE",
    facebook: "https://www.facebook.com/sooraj.shukla.395/",
    linkedin: "https://linkedin.com/soorajshukla974",
    github: "https://github.com/soorajarsn",
  },
  {
    name: "Sooraj Shukla",
    branch: "CSE",
    facebook: "https://www.facebook.com/sooraj.shukla.395/",
    linkedin: "https://linkedin.com/soorajshukla974",
    github: "https://github.com/soorajarsn",
  },
  {
    name: "Sooraj Shukla",
    branch: "CSE",
    facebook: "https://www.facebook.com/sooraj.shukla.395/",
    linkedin: "https://linkedin.com/soorajshukla974",
    github: "https://github.com/soorajarsn",
  },
  {
    name: "Sooraj Shukla",
    branch: "CSE",
    facebook: "https://www.facebook.com/sooraj.shukla.395/",
    linkedin: "https://linkedin.com/soorajshukla974",
    github: "https://github.com/soorajarsn",
  },
  {
    name: "Sooraj Shukla",
    branch: "CSE",
    facebook: "https://www.facebook.com/sooraj.shukla.395/",
    linkedin: "https://linkedin.com/soorajshukla974",
    github: "https://github.com/soorajarsn",
  },
  {
    name: "Sooraj Shukla",
    branch: "CSE",
    facebook: "https://www.facebook.com/sooraj.shukla.395/",
    linkedin: "https://linkedin.com/soorajshukla974",
    github: "https://github.com/soorajarsn",
  },
  {
    name: "Sooraj Shukla",
    branch: "CSE",
    facebook: "https://www.facebook.com/sooraj.shukla.395/",
    linkedin: "https://linkedin.com/soorajshukla974",
    github: "https://github.com/soorajarsn",
  },
  {
    name: "Sooraj Shukla",
    branch: "CSE",
    facebook: "https://www.facebook.com/sooraj.shukla.395/",
    linkedin: "https://linkedin.com/soorajshukla974",
    github: "https://github.com/soorajarsn",
  },
  {
    name: "Sooraj Shukla",
    branch: "CSE",
    facebook: "https://www.facebook.com/sooraj.shukla.395/",
    linkedin: "https://linkedin.com/soorajshukla974",
    github: "https://github.com/soorajarsn",
  },
  {
    name: "Sooraj Shukla",
    branch: "CSE",
    facebook: "https://www.facebook.com/sooraj.shukla.395/",
    linkedin: "https://linkedin.com/soorajshukla974",
    github: "https://github.com/soorajarsn",
  },
  {
    name: "Sooraj Shukla",
    branch: "CSE",
    facebook: "https://www.facebook.com/sooraj.shukla.395/",
    linkedin: "https://linkedin.com/soorajshukla974",
    github: "https://github.com/soorajarsn",
  },
  {
    name: "Sooraj Shukla",
    branch: "CSE",
    facebook: "https://www.facebook.com/sooraj.shukla.395/",
    linkedin: "https://linkedin.com/soorajshukla974",
    github: "https://github.com/soorajarsn",
  },
];
const CardItem = ({ name, branch, facebook, linkedin, github }) => {
  return (
    <div className="profile-card">
      <div className="card-header">
        <div className="pic">
          <img src={user_image} alt=""/>
        </div>
        <div className="name">{name}</div>
        <div className="desc">{branch}</div>
        <div className="sm">
          <Link to={facebook} className="fab fa-facebook">
          </Link>
          <Link to={linkedin} className="fab fa-linkedin">
          </Link>
          <Link to={github} className="fab fa-github">
          </Link>
        </div>
      </div>
    </div>
  );
};
const Card = (props) => {
  return (
    <div className="card_main_cot">
      <FilterForm />
      <div className="c card_cot">
        <div className="card_wrapper">
          {userData.map((dt,index) => <CardItem key={index} {...dt} />)}
        </div>
      </div>
    </div>
  );
};

export default Card;
