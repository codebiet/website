import React, { useContext } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Store, { InfoContext } from "../../state/Store";
import ReactDOM from "react-dom";
import "aos/dist/aos.css";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import "./all.scss";
import ErrorBoundary from "../../HOC/ErrorBoundary";
// import Register from "../Authentication/Register";
// import SentVerifyEmail from "../Authentication/SentVerifyEmail";
// import Login from "../Authentication/Login";
// import SetPassword from "../Authentication/SetPassword";
// import ForgotPassword from "../Authentication/ForgotPassword";
import Toaster from "../Toaster/Toaster";
// import ForgotPassword from "../../pages/ForgotPassword";
// import Dashboard_Articles from "../Dashboard_Articles/Articles";
// import Dashboard_Competitions  from "../Dashboard_Competitions/Competitions";
// import Dashboard_Projects from "../Dashboard_Projects/Projects";
// import Dashboard_Profile from "../Dashboard_Profile/Dashboard";
// import Dashboard_Resume from "../Resume/Resume";
// import CertificateVerification from "../CertificateVerification/CertificateVerification";
// import Loader from "../Loader/Loader";
import Register from "../../pages/Register";
import SentVerifyEmail from "../../pages/SentVerifyEmail";
import Login from "../../pages/Login";
import SetPassword from "../../pages/SetPassword";
import ForgotPassword from "../../pages/ForgotPassword";
import Dashboard_Profile from "../../pages/Dashboard_Profile";
import Dashboard_Articles from "../../pages/Dashboard_Articles";
import Dashboard_Competitions from "../../pages/Dashboard_Competitions";
import Dashboard_Projects from "../../pages/Dashboard_Projects";
import Dashboard_Resume from "../../pages/Dashboard_Resume";
// import Toaster from "../Toaster/Toaster";
import CertificateVerification from "../../pages/CertificateVerification";
import About from "../../pages/About";
import Contact from "../../pages/Feedback";
import Home from "../../pages/Home";
import Error404 from "../../pages/404";
import Events from "../../pages/events";
import ProjectsPage from "../../pages/projects";
import EventDetails from "../../pages/Event_Individual";
import BietGems from "../../pages/BietGems";
import BlogsIndividual from "../../pages/Blogs_Individual";
import UserProfile from "../../pages/UserProfile";
import Blogs from "../../pages/Blogs";
import OurTeam from "../../pages/OurTeam";
// const Register = lazy(() => import("../../pages/Register"));
// const SentVerifyEmail = lazy(() => import("../../pages/SentVerifyEmail"));
// const Login = lazy(() => import("../../pages/Login"));
// const ForgotPassword = lazy(() => import("../../pages/ForgotPassword"));
// const SetPassword = lazy(() => import("../../pages/setPassword"));
// const Dashboard_Profile = lazy(() => import("../../pages/Dashboard_Profile"));
// const Dashboard_Articles = lazy(() => import("../../pages/Dashboard_Articles"));
// const Dashboard_Competitions = lazy(() =>
//   import("../../pages/Dashboard_Competitions")
// );
// const Dashboard_Projects = lazy(() => import("../../pages/Dashboard_Projects"));
// const Dashboard_Resume = lazy(() => import("../../pages/Dashboard_Resume"));
// const Toaster = lazy(() => import("../Toaster/Toaster"));
// const CertificateVerification = lazy(() =>
//   import("../../pages/CertificateVerification")
// );
// const About = lazy(() => import("../../pages/About"));
// const Contact = lazy(() => import("../../pages/contact"));
// const Home = lazy(() => import("../../pages/Home"));
// const Error404 = lazy(() => import("../../pages/404"));
// const Events = lazy(() => import("../../pages/events"));
// const ProjectsPage = lazy(() => import("../../pages/projects"));
// const EventDetails = lazy(() => import("../EventDetails/event_details"));
import Logout from "../../pages/Logout";
function App() {
  // const auth = useContext(AuthContext);
  const info = useContext(InfoContext);
  return (
    <React.Fragment>
      <ErrorBoundary>
        <Router>
          <Switch>
            <Route
              exact={true}
              path="/register"
              render={(props) => <Register {...props} />}
            />
            <Route
              exact={true}
              path="/sentVerifyEmail"
              render={(props) => <SentVerifyEmail {...props} />}
            />
            <Route
              exact={true}
              path="/setPassword"
              render={(props) => <SetPassword {...props} />}
            />
            <Route
              exact={true}
              path="/login"
              render={(props) => <Login {...props} />}
            />
            <Route
              exact={true}
              path="/forgotPassword"
              render={(props) => <ForgotPassword {...props} />}
            />
            <Route exact={true} path="/logout" render={(props) => <Logout />} />
            <Route
              exact={true}
              path="/"
              render={(props) => <Home {...props} />}
            />
            <Route
              exact={true}
              path="/dashboard"
              render={(props) => <Dashboard_Profile {...props} />}
            />
            <Route
              exact={true}
              path="/articles"
              render={(props) => <Dashboard_Articles {...props} />}
            />
            <Route
              exact={true}
              path="/user-projects"
              render={(props) => <Dashboard_Projects {...props} />}
            />
            <Route
              exact={true}
              path="/competitions"
              render={(props) => <Dashboard_Competitions {...props} />}
            />
            <Route
              exact={true}
              path="/resume"
              render={() => <Dashboard_Resume />}
            />
            <Route
              exact={true}
              path="/verifyCertificate"
              render={(props) => <CertificateVerification {...props} />}
            />
            <Route
              path="/bietGems"
              exact
              render={(props) => <BietGems {...props} />}
            />
            <Route path="/projects" component={ProjectsPage} />
            <Route path="/contact" component={Contact} />
            <Route exact path="/events" component={Events} />
            <Route path="/about" component={About} />
            <Route path="/ourTeam" component={OurTeam} />
            <Route
              exact
              path="/events/:id"
              render={(props) => <EventDetails {...props} />}
            />
            <Route
              exact
              path="/blogs/:id"
              render={(props) => <BlogsIndividual {...props} />}
            />
            <Route
              exact
              path="/blogs"
              render={(props) => <Blogs {...props} />}
            />
            <Route
              exact
              path="/userProfile/:id"
              render={(props) => <UserProfile {...props} />}
            />
            <Route
              exact={true}
              path="/internalServerError"
              render={() => <h1>Status-Code 500: Internal Server Error!</h1>}
            />
            <Route path="*" render={() => <Error404 />} />
          </Switch>
        </Router>
        {info.state.error &&
          ReactDOM.createPortal(
            <Toaster body={info.state.error} failure />,
            document.getElementById("info-portal")
          )}
        {info.state.warning &&
          ReactDOM.createPortal(
            <Toaster body={info.state.warning} info />,
            document.getElementById("info-portal")
          )}
        {info.state.success &&
          ReactDOM.createPortal(
            <Toaster body={info.state.success} success />,
            document.getElementById("info-portal")
          )}
      </ErrorBoundary>
    </React.Fragment>
  );
}
function AppWithStore() {
  return (
    <Store>
      <App />
    </Store>
  );
}

export default AppWithStore;
