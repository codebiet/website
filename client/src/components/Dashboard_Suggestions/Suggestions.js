import React, { useState, useEffect, useContext, lazy } from "react";
import { AuthContext } from "../../state/Store";
import axios from "axios";
import { Redirect, Link } from "react-router-dom";
// import DemoNavbar from "../Dashboard_Profile/DashboardHeaderNav";
// import Sidebar from "../Dashboard_Profile/DashboardSidebar";
// import Footer from "../Dashboard_Profile/DashboardFooter";
// import SuggestionCard from "../ADMIN/Blogs/SuggestionCard";
// import ConfirmationModal from "../ConfirmationModal/ConfirmationModal";
// import AddSuggestion from "../ADMIN/Blogs/AddSuggestion";
const DemoNavbar = lazy(() =>
  import("../Dashboard_Profile/DashboardHeaderNav")
);
const Sidebar = lazy(() => import("../Dashboard_Profile/DashboardSidebar"));
const Footer = lazy(() => import("../Dashboard_Profile/DashboardFooter"));
const SuggestionCard = lazy(() => import("../ADMIN/Blogs/SuggestionCard"));
const AddSuggestion = lazy(() => import("../ADMIN/Blogs/AddSuggestion"));
const ConfirmationModal = lazy(() =>
  import("../ConfirmationModal/ConfirmationModal")
);
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
        // console.log(err);
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
    <Link
      to={`/blogs/${id}/write-article`}
      style={{ textDecoration: "none", width: "fit-content" }}
    >
      <div className="state AVAILABLE">
        {state == "DRAFT" ? "Continue writing..." : "Write Article"}
      </div>
    </Link>
  );
};
const Suggestions = (props) => {
  const [availableLoading, setAvailableLoading] = useState(false);
  const [pickedLoading, setPickedLoading] = useState(true); //making this true initially, so that do not see the note saying pick article, due to a bit latency in running useEffect, without even loading currently picked article by user
  const [suggestions, setSuggestions] = useState([]);
  const [pickedSuggestion, setPickedSuggestion] = useState([]);
  //to get updated suggestion when someone pick article
  const [mounted, setMounted] = useState(true);
  const [updated, setUpdated] = useState(false);
  useEffect(() => {
    if (mounted || updated) {
      window.scrollTo(0, 0);
      setPickedLoading(true);
      setAvailableLoading(true);
      axios
        .get(
          "/api/blogs/suggestions?state=PICKED,DRAFT&pickedBy=" +
            auth.state.userId
        )
        .then((res) => {
          setPickedSuggestion(res.data.suggestions);
          setPickedLoading(false);
        })
        .catch((err) => {
          //  console.log (err);
        });
      axios
        .get("/api/blogs/suggestions?state=AVAILABLE&approvedSuggestion=true")
        .then((res) => {
          // console.log(res.data);
          setSuggestions(res.data.suggestions);
          setAvailableLoading(false);
        })
        .catch((err) => {
          // console.log(err);
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
                    {!pickedLoading &&
                      pickedSuggestion.map((suggestion) => (
                        <SuggestionCard
                          key={suggestion._id}
                          suggestion={suggestion}
                          actions={false}
                          WriteArticle={WriteArticle}
                          writingCard={true}
                        />
                      ))}
                    {pickedLoading && (
                      <>
                        <SuggestionCard actions={false} />
                        <SuggestionCard actions={false} />
                        <SuggestionCard actions={false} />
                        <SuggestionCard actions={false} />
                      </>
                    )}
                  </div>
                  {!pickedLoading && pickedSuggestion.length == 0 && (
                    <p className="no-picked">
                      Pick a suggestion to write an article.
                    </p>
                  )}
                </div>
                <h2 style={{ marginTop: "2rem" }}>Available Suggestions</h2>
                <div className="suggestions-container">
                  {!availableLoading &&
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
                  {availableLoading && (
                    <>
                      <SuggestionCard actions={false} />
                      <SuggestionCard actions={false} />
                      <SuggestionCard actions={false} />
                      <SuggestionCard actions={false} />
                    </>
                  )}
                  {!availableLoading && availableLoading.length == 0 && (
                    <p className="no-picked">
                      Currectly We don't have any available topics.
                    </p>
                  )}
                </div>
              </div>

              <Footer fluid />
            </div>
          </div>
          <AddSuggestion userDashboard={true} />
        </React.Fragment>
      ) : (
        <Redirect
          to={{ pathname: "/login", state: { from: "/suggestions" } }}
        />
      )}
    </React.Fragment>
  );
};
export default Suggestions;
