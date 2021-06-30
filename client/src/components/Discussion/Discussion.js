import React, { useState, useEffect } from "react";
import AskBar from "./AskBar";
import SwitchBar from "./SwitchBar";
import PostCard from "./PostCard";
import HorizontalBar from "./HorizontalBar";
import Sidebar from "./Sidebar";
import FloatingButtons from "./FloatingButtons";
import axios from "axios";
import Loader from "../Loader/Loader";
import Pagination from "../Pagination/Pagination";
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
  //pagination
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const handlePageChange = (page) => {
    console.log(page);
    window.scrollTo(0, 0); //scrollTo top when page is changed;
    setCurrentPage(page);
  };
  //query construction
  const getQuery = () => {
    let query = `?page=${currentPage - 1}&limit=${limit}&`; //pagination starts from 0 in backend; hence passed page = currentPage-1
    if (category) query += "category=" + category + "&";
    if (tags.length > 0) query += "tags=" + tags.join(",") + "&";
    if (sort) query += "sort=" + sort + "&";
    if (type == "Help Others") query += "replyAdded=false";
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
        console.log(err);
      });
  }, [currentPage, category, tags, sort, type]);
  return (
    <main className="discussion-container-main">
      {topLoader && <div className="scroller"></div>}
      <div id="qna-wrapper" class="row">
        <div id="qnasection" class="col-xs-12 col-sm-12 col-lg-9">
          <div id="discussPanel">
            <AskBar
              setPosts={setPosts}
              getQuery={getQuery}
              setTotalItems={setTotalItems}
            />
            <HorizontalBar />
            <SwitchBar setSort={setSort} setType={setType} />
            {posts.map((post) => (
              <PostCard post={post} getQuery={getQuery} setPosts={setPosts} />
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
        />
      </div>
      <FloatingButtons
        sort={sort}
        setSort={setSort}
        category={category}
        setCategory={setCategory}
      />
      {loading && <Loader />}
    </main>
  );
}

export default Discussion;
