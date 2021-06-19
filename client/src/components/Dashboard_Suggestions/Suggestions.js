import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../state/Store";
import Loader from "../Loader/Loader";
import axios from "axios";
import DemoNavbar from "../Dashboard_Profile/DashboardHeaderNav";
import Sidebar from "../Dashboard_Profile/DashboardSidebar";
import Footer from "../Dashboard_Profile/DashboardFooter";
import SuggestionCard from "../ADMIN/Blogs/SuggestionCard";
import { Redirect } from "react-router-dom";
import ConfirmationModal from "../ConfirmationModal/ConfirmationModal";
import {Link} from "react-router-dom";
const PickArticle = ({ id, setUpdated }) => {
  const [confirmationModalOpen, setConfirmationModalOpen] = useState(false);
  const handlePickArticle = (id) => {
    axios
      .patch(`/patch/blogs/suggestions/pickArticle/${id}`)
      .then((res) => {
        setUpdated(true);
      })
      .catch((err) => {
        setUpdated(true);
        console.log(err);
      });
  };
  return (
    <>
      <button
        className="state AVAILABLE"
        style={{ border: "none", outline: "none" }}
        onClick={() => setConfirmationModalOpen((prev) => !prev)}
      >
        Pick Article
      </button>
      <ConfirmationModal
        modalOpen={confirmationModalOpen}
        setModalOpen={setConfirmationModalOpen}
        handleSubmit={handlePickArticle}
        msg={
          "You need to write this article under 5 days and if you are not able to complete it by deadline, this article will be again available for other users"
        }
        modalHeader="Pick Article"
        buttonContent="Pick"
        id={id}
      />
    </>
  );
};
const WriteArticle = ({ id, state }) => {
  return (
    <Link to={`/blogs/${id}/write-article`}>
      <div className="state AVAILABLE">
        {state == "DRAFT" ? "Continue writing..." : "Write Article"}
      </div>
    </Link>
  );
};
const Suggestions = (props) => {
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [pickedSuggestion, setPickedSuggestion] = useState([]);
  //to get updated suggestion when someone pick article
  const [mounted, setMounted] = useState(true);
  const [updated, setUpdated] = useState(false);
  useEffect(() => {
    if (mounted || updated) {
      window.scrollTo(0, 0);
      setLoading(true);
      axios
        .get("/api/blogs/suggestions?state=AVAILABLE&approvedSuggestion=true")
        .then((res) => {
          console.log(res.data);
          setSuggestions(res.data.suggestions);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
      console.log(auth.state.userId);
      axios
        .get(
          "/api/blogs/suggestions?state=PICKED&pickedBy=" + auth.state.userId
        )
        .then((res) => {
          setPickedSuggestion(res.data.suggestions);
        })
        .catch((err) => {
          console.log(err);
        });
      setMounted(false);
      setUpdated(false);
    }
  }, [mounted, updated]);
  const auth = useContext(AuthContext);
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
                <h2 style={{ paddingTop: "1rem" }}>Picked Articles</h2>
                <div className="picked-articles">
                  <div className="suggestions-container">
                    {!loading &&
                      pickedSuggestion.map((suggestion) => (
                        <SuggestionCard
                          key={suggestion._id}
                          suggestion={suggestion}
                          actions={false}
                          WriteArticle={WriteArticle}
                          writingCard={true}
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
                  {!loading && pickedSuggestion.length == 0 && (
                    <p className="no-picked">
                      Pick a suggestion to write an article.
                    </p>
                  )}
                </div>
                <h2 style={{ marginTop: "2rem" }}>Available Suggestions</h2>
                <div className="suggestions-container">
                  {!loading &&
                    suggestions.map((suggestion) => (
                      <SuggestionCard
                        key={suggestion._id}
                        suggestion={suggestion}
                        userDashboard={true}
                        actions={false}
                        setUpdated={setUpdated}
                        PickArticle={PickArticle}
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
              </div>
              <Footer fluid />
            </div>
          </div>
        </React.Fragment>
      ) : (
        <Redirect
          to={{ pathname: "/login", state: { from: "/user-projects" } }}
        />
      )}
    </React.Fragment>
  );
};
export default Suggestions;
