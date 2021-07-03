import React, { lazy, useState, useEffect, useContext } from "react";
import { AuthContext } from "../../state/Store";
const DemoNavbar = lazy(() =>
  import("../Dashboard_Profile/DashboardHeaderNav")
);
const Sidebar = lazy(() => import("../Dashboard_Profile/DashboardSidebar"));
const Footer = lazy(() => import("../Dashboard_Profile/DashboardFooter"));
const SuggestionCard = lazy(() => import("../ADMIN/Blogs/SuggestionCard"));
import axios from "axios";
import { Redirect } from "react-router-dom";
const Articles = (props) => {
  const [loading, setLoading] = useState(false);
  const [articles, setArticles] = useState([]);
  const auth = useContext(AuthContext);
  useEffect(() => {
    setLoading(true);
    axios
      .get(`/api/blogs?postedBy=${auth.state.userId}`)
      .then((res) => {
        setArticles(res.data.blogs);
        setLoading(false);
      })
      .catch((err) => {
        // console.log(err);
      });
  }, []);
  return (
    <React.Fragment>
      {auth.state.userLoggedIn && auth.state.emailVerified ? (
        <React.Fragment>
          <div className="wrapper dashboard-main-wrapper">
            <Sidebar
              bgColor="white"
              activeColor="info"
              profileImg={auth.state.profileImg}
            />
            <div className="main-panel dashboard-main-panel">
              <DemoNavbar {...props} />
              <div className="content">
                <h2 style={{ paddingTop: "1rem" }}>Your Articles</h2>
                <div className="suggestions-container">
                  {!loading &&
                    articles.map((article) => (
                      <SuggestionCard
                        key={article._id}
                        suggestion={article}
                        actions={false}
                      />
                    ))}
                  {loading && (
                    <>
                      <SuggestionCard actions={false} />
                      <SuggestionCard actions={false} />
                      <SuggestionCard actions={false} />
                      <SuggestionCard actions={false} />
                    </>
                  )}
                </div>
                {!loading && articles.length == 0 && (
                  <div className="no-article">
                    <h1 className="text-muted">Nothing to Show</h1>
                  </div>
                )}
              </div>
              <Footer fluid />
            </div>
          </div>
        </React.Fragment>
      ) : (
        <Redirect to={{ pathname: "/login", state: { from: "/articles" } }} />
      )}
    </React.Fragment>
  );
};
export default Articles;
