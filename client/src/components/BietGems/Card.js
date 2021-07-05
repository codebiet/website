import React, { useState, useEffect } from "react";

import FilterForm from "./FilterForm";
import user_image from "../assets/boy.png";
import { Link } from "react-router-dom";
import axios from "axios";

const CardItem = ({ id, name, branch, facebook, linkedin, github }) => {
  return (
    <Link to={`/userProfile/${id}`} style={{ textDecoration: "none" }}>
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
  const [userData, setUserData] = useState([]);
  const [year, setYear] = useState("");
  const [branch, setBranch] = useState("");
  const [profession, setProfession] = useState("");

  useEffect(() => {
    // setLoading(true);
    window.scrollTo(0, 0);

    axios
      .get(`/api/gems?year=${year}&branch=${branch}&profession=${profession}`)
      .then((res) => {
        setUserData(res.data.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [year, branch,profession]);

  return (
    <div className="card_main_cot">
      <FilterForm
        year={year}
        setYear={setYear}
        branch={branch}
        setBranch={setBranch}
        setProfession={setProfession}
      />
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
