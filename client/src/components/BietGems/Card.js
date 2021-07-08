import React, { useState, useEffect } from "react";

import FilterForm from "./FilterForm";
import user_image from "../assets/boy.png";
import { Link } from "react-router-dom";
import axios from "axios";

import Pagination from '../Pagination/Pagination';

const CardItem = ({ _id, name, branch, facebook, linkedin, github }) => {
  return (
    <Link to={`/userProfile/${_id}`} style={{ textDecoration: "none" }}>
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

  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(6);
  const [limit, setLimit] = useState(6);
  // const [status, setStatus] = useState("")

  useEffect(() => {
    // setLoading(true);
    window.scrollTo(0, 0);

    axios
      .get(`/api/gems?year=${year}&branch=${branch}&profession=${profession}&page=${currentPage}&size=${limit}`)
      .then((res) => {
        setUserData(res.data.data);
        console.log(res.data);
        setTotalItems(res.data.totalItems)
      })
      .catch((err) => {
        console.log(err);
      });
  }, [currentPage,year, branch,profession]);

  const handlePageChange = (page) => {
    console.log(page);
    setCurrentPage(page);
  };

  return (
    <div className="card_main_cot">
      <FilterForm
        year={year}
        setYear={setYear}
        branch={branch}
        setBranch={setBranch}
        setProfession={setProfession}
        setPage={setCurrentPage}
      />
      <div className="c card_cot">
        <div className="card_wrapper">
          {userData.map((dt, index) => (
            <CardItem key={index} {...dt} />
          ))}
        </div>
      </div>
      {totalItems > limit && (
        <Pagination
          totalItems={totalItems}
          pageSize={limit}
          handlePageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default Card;
