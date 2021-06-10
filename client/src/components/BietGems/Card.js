import React from "react";
import FilterForm from "./FilterForm";
import user_image from "../assets/boy.png";
import { Link } from "react-router-dom";
const userData = [
  {
    id: 1,
    name: "Sooraj Shukla",
    branch: "CSE",
    facebook: "https://www.facebook.com/sooraj.shukla.395/",
    linkedin: "https://linkedin.com/soorajshukla974",
    github: "https://github.com/soorajarsn",
  },
  {
    id: 2,
    name: "Sooraj Shukla",
    branch: "CSE",
    facebook: "https://www.facebook.com/sooraj.shukla.395/",
    linkedin: "https://linkedin.com/soorajshukla974",
    github: "https://github.com/soorajarsn",
  },
  {
    id: 3,
    name: "Sooraj Shukla",
    branch: "CSE",
    facebook: "https://www.facebook.com/sooraj.shukla.395/",
    linkedin: "https://linkedin.com/soorajshukla974",
    github: "https://github.com/soorajarsn",
  },
  {
    id: 4,
    name: "Sooraj Shukla",
    branch: "CSE",
    facebook: "https://www.facebook.com/sooraj.shukla.395/",
    linkedin: "https://linkedin.com/soorajshukla974",
    github: "https://github.com/soorajarsn",
  },
  {
    id: 5,
    name: "Sooraj Shukla",
    branch: "CSE",
    facebook: "https://www.facebook.com/sooraj.shukla.395/",
    linkedin: "https://linkedin.com/soorajshukla974",
    github: "https://github.com/soorajarsn",
  },
  {
    id: 6,
    name: "Sooraj Shukla",
    branch: "CSE",
    facebook: "https://www.facebook.com/sooraj.shukla.395/",
    linkedin: "https://linkedin.com/soorajshukla974",
    github: "https://github.com/soorajarsn",
  },
  {
    id: 7,
    name: "Sooraj Shukla",
    branch: "CSE",
    facebook: "https://www.facebook.com/sooraj.shukla.395/",
    linkedin: "https://linkedin.com/soorajshukla974",
    github: "https://github.com/soorajarsn",
  },
  {
    id: 8,
    name: "Sooraj Shukla",
    branch: "CSE",
    facebook: "https://www.facebook.com/sooraj.shukla.395/",
    linkedin: "https://linkedin.com/soorajshukla974",
    github: "https://github.com/soorajarsn",
  },
  {
    id: 9,
    name: "Sooraj Shukla",
    branch: "CSE",
    facebook: "https://www.facebook.com/sooraj.shukla.395/",
    linkedin: "https://linkedin.com/soorajshukla974",
    github: "https://github.com/soorajarsn",
  },
  {
    id: 10,
    name: "Sooraj Shukla",
    branch: "CSE",
    facebook: "https://www.facebook.com/sooraj.shukla.395/",
    linkedin: "https://linkedin.com/soorajshukla974",
    github: "https://github.com/soorajarsn",
  },
  {
    id: 11,
    name: "Sooraj Shukla",
    branch: "CSE",
    facebook: "https://www.facebook.com/sooraj.shukla.395/",
    linkedin: "https://linkedin.com/soorajshukla974",
    github: "https://github.com/soorajarsn",
  },
  {
    id: 12,
    name: "Sooraj Shukla",
    branch: "CSE",
    facebook: "https://www.facebook.com/sooraj.shukla.395/",
    linkedin: "https://linkedin.com/soorajshukla974",
    github: "https://github.com/soorajarsn",
  },
  {
    id: 13,
    name: "Sooraj Shukla",
    branch: "CSE",
    facebook: "https://www.facebook.com/sooraj.shukla.395/",
    linkedin: "https://linkedin.com/soorajshukla974",
    github: "https://github.com/soorajarsn",
  },
  {
    id: 14,
    name: "Sooraj Shukla",
    branch: "CSE",
    facebook: "https://www.facebook.com/sooraj.shukla.395/",
    linkedin: "https://linkedin.com/soorajshukla974",
    github: "https://github.com/soorajarsn",
  },
  {
    id: 5,
    name: "Sooraj Shukla",
    branch: "CSE",
    facebook: "https://www.facebook.com/sooraj.shukla.395/",
    linkedin: "https://linkedin.com/soorajshukla974",
    github: "https://github.com/soorajarsn",
  },
  {
    id: 16,
    name: "Sooraj Shukla",
    branch: "CSE",
    facebook: "https://www.facebook.com/sooraj.shukla.395/",
    linkedin: "https://linkedin.com/soorajshukla974",
    github: "https://github.com/soorajarsn",
  },
];
const CardItem = ({ id, name, branch, facebook, linkedin, github }) => {
  return (
    <Link to={`/userProfile/${id}`} style={{textDecoration:"none"}}>
      <div className="profile-card">
        <div className="card-header">
          <div className="pic">
            <img src={user_image} alt="" />
          </div>
          <div className="name">{name}</div>
          <div className="desc">{branch}</div>
          <div className="sm">
            <Link to={facebook} className="fab fa-facebook"></Link>
            <Link to={linkedin} className="fab fa-linkedin"></Link>
            <Link to={github} className="fab fa-github"></Link>
          </div>
        </div>
      </div>
    </Link>
  );
};
const Card = (props) => {
  return (
    <div className="card_main_cot">
      <FilterForm />
      <div className="c card_cot">
        <div className="card_wrapper">
          {userData.map((dt, index) => (
            <CardItem key={index} {...dt} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Card;
