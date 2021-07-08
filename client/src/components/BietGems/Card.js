import React, { useState, useEffect, lazy } from "react";
import user_image from "../assets/boy.png";
import { Link } from "react-router-dom";
import axios from "axios";
// import Pagination from "../Pagination/Pagination";
// import FilterForm from "./FilterForm";
import Loader from "../Loader/Loader";
const Pagination = lazy(() => import("../Pagination/Pagination"));
const FilterForm = lazy(() => import("./FilterForm"));

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
  const [totalItems, setTotalItems] = useState(19);
  const [limit, setLimit] = useState(20);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);
    axios
      .get(
        `/api/gems?year=${year}&branch=${branch}&profession=${profession}&page=${currentPage}&size=${limit}`
      )
      .then((res) => {
        setLoading(false);
        setUserData(res.data.data);
        setTotalItems(res.data.totalItems);
      })
      .catch((err) => {
        // console.log(err);
        setLoading(false);
      });
  }, [currentPage, year, branch, profession]);

  const handlePageChange = (page) => {
    console.log(page);
    setCurrentPage(page);
  };

  return (
    <div className="card_main_cot" style={{marginBottom:"3rem"}}>
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
      {loading && <Loader />}
    </div>
  );
};

export default Card;
