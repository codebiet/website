import React, { useState, useEffect, lazy } from "react";
import axios from "axios";
// import AskBar from "./AskBar";
// import SwitchBar from "./SwitchBar";
// import PostCard from "./PostCard";
// import HorizontalBar from "./HorizontalBar";
// import Sidebar from "./Sidebar";
// import FloatingButtons from "./FloatingButtons";
import Loader from "../Loader/Loader";
// import Pagination from "../Pagination/Pagination";
const AskBar = lazy(() => import("./AskBar"));
const SwitchBar = lazy(() => import("./SwitchBar"));
const PostCard = lazy(() => import("./PostCard"));
const HorizontalBar = lazy(() => import("./HorizontalBar"));
const Sidebar = lazy(() => import("./Sidebar"));
const FloatingButtons = lazy(() => import("./FloatingButtons"));
const Pagination = lazy(() => import("../Pagination/Pagination"));
function Discussion(props) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [topLoader, setTopLoader] = useState(false); //top-loader is used when applying filters
  const [mounted, setMounted] = useState(false); //used to enable page loader(when first visited) and enable top-loader when filters are applied
  //filters
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState([]);
  const [sort, setSort] = useState("");
  const [type, setType] = useState(""); //if type == 'Help Others' we'll get only unanswered questions
  //search
  const [searchInputValue, setSearchInputValue] = useState("");
  const [searchFor, setSearchFor] = useState("");
  const changeSearchInputValue = (e) => {
    setSearchFor(""); //when user is typing in search field we don't need to append that value in our query string, since search will be appended in query string after clicking search button, and if user changed value after searching by clicking search button then we don't need to include search field in query string until they click search button again;
    setSearchInputValue(e.target.value);
  };
  const handleSearch = (e) => {
    e.preventDefault();
    setSearchFor(searchInputValue); //in this method we can't do get request using axios, because state is update asynchronously, so the app may request before state, i.e., searchFor gets changed;
    //this is why below useEffect is used so that when searchFor is changed and has any value then only the app make a get request to backend
  };
  useEffect(() => {
    if (searchFor) {
      setLoading(true);
      axios
        .get("/api/doubts" + getQuery())
        .then((res) => {
          setPosts(res.data.doubts || []);
          setTotalItems(res.data.totalItems);
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
        });
    }
  }, [searchFor]);
  //pagination
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const handlePageChange = (page) => {
    // console.log(page);
    window.scrollTo(0, 0); //scrollTo top when page is changed;
    setCurrentPage(page);
  };
  //query construction
  const getQuery = () => {
    let query = `?page=${currentPage - 1}&limit=${limit}&`; //pagination starts from 0 in backend; hence passed page = currentPage-1
    if (category) query += "category=" + category + "&";
    if (tags.length > 0) query += "tags=" + tags.join(",") + "&";
    if (sort) query += "sort=" + sort + "&";
    if (type == "Help Others") query += "replyAdded=false&";
    if (searchFor) query += "search=" + searchFor;
    return query;
  };
  useEffect(() => {
    if (!mounted) setLoading(true);
    else setTopLoader(true);
    axios
      .get("/api/doubts" + getQuery())
      .then((res) => {
        setPosts(res.data.doubts || []);
        setTotalItems(res.data.totalItems);
        setLoading(false);
        setTopLoader(false);
        setMounted(true);
      })
      .catch((err) => {
        setMounted(true);
        // console.log(err);
      });
  }, [currentPage, category, tags, sort, type]);
  return (
    <main className="discussion-container-main">
      {topLoader && <div className="scroller"></div>}
      <div id="qna-wrapper" className="row">
        <div id="qnasection" className="col-xs-12 col-sm-12 col-lg-9">
          <div id="discussPanel">
            <AskBar
              setPosts={setPosts}
              getQuery={getQuery}
              setTotalItems={setTotalItems}
            />
            <HorizontalBar setCategory={setCategory} />
            <SwitchBar
              setSort={setSort}
              setType={setType}
              setCurrentPage={setCurrentPage}
            />
            {posts.map((post, index) => (
              <PostCard
                key={index}
                post={post}
                getQuery={getQuery}
                setPosts={setPosts}
              />
            ))}
            {totalItems > limit && (
              <Pagination
                totalItems={totalItems}
                pageSize={limit}
                handlePageChange={handlePageChange}
              />
            )}
          </div>
        </div>
        <Sidebar
          category={category}
          setCategory={setCategory}
          tags={tags}
          setTags={setTags}
          searchInputValue={searchInputValue}
          changeSearchInputValue={changeSearchInputValue}
          handleSearch={handleSearch}
          setCurrentPage={setCurrentPage}
        />
      </div>
      <FloatingButtons
        sort={sort}
        setSort={setSort}
        category={category}
        setCategory={setCategory}
        setCurrentPage={setCurrentPage}
      />
      {loading && <Loader />}
    </main>
  );
}

export default Discussion;
