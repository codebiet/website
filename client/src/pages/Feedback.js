import React, { lazy, Suspense, useState, useEffect, useContext } from "react";
const RangeSlider = lazy(() => import("../components/Slider/Slider"));
const WorkWithUs = lazy(() => import("../components/WorkWithUs/WorkWithUs"));
const Contact = lazy(() => import("../components/Contact/Contact"));
const Nav = lazy(() => import("../components/Navbar/Nav"));
const Footer = lazy(() => import("../components/Footer/Footer"));
import { Form, FormGroup, Button } from "reactstrap";
import logo from "../components/assets/feedback.png";
import Loader from "../components/Loader/Loader";
import { InfoContext } from "../state/Store";
import {
  generateError,
  generateSuccess,
  clearEverything,
} from "../state/info/infoActions";
import axios from "axios";
export const Feedback = () => {
  const [rating, setRating] = useState(5);
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);
  const info = useContext(InfoContext);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    info.dispatch(clearEverything());
  }, [feedback]);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!feedback)
      return info.dispatch(
        generateError("Please tell us the reason for giving this score!")
      );
    if (feedback.length < 30)
      return info.dispatch(
        generateError(
          "Reason too short! Please write in atleast 30 characters."
        )
      );
    setLoading(true);
    axios
      .post("/post/feedback", { rating, message: feedback })
      .then((res) => {
        setFeedback("");
        setLoading(false);
        info.dispatch(
          generateSuccess("Thank you for providing us your valuable feedback!")
        );
      })
      .catch((err) => {
        setLoading(false);
        if (err.response && err.response.data)
          return info.dispatch(generateError(err.response.data.errorMsg));
        else info.dispatch(generateError("Something went wrong!"));
      });
  };
  return (
    <Suspense fallback={<Loader />}>
      <Nav />
      <main className="feedback-main">
        <div className="complete-screen">
          <h1 className="feedbackHead">Provide your feedback</h1>
          <div className="leftDiv">
            <div className="leftCol column">
              <p className="leftColHeading">
                Feel free to drop us your feedback
              </p>
              <p className="leftColPara">
                We are looking forward to hearing back from you
              </p>
              <div>
                <img className="imgBlock" src={logo} alt="" width="350px" />
              </div>
            </div>
            <div className="rightCol column">
              <p>How satisfied are you overall with our services?</p>
              <RangeSlider setRating={setRating} />
              <div className="formBlock">
                <Form onSubmit={handleSubmit}>
                  <FormGroup>
                    <textarea
                      name="text"
                      id="exampleText"
                      placeholder="Please tell us the reason for giving us this score .."
                      value={feedback}
                      onChange={(e) => setFeedback(e.target.value)}
                    />
                  </FormGroup>
                  <Button
                    className="btnDefault default-btn"
                    onClick={handleSubmit}
                  >
                    Submit
                  </Button>
                </Form>
              </div>
            </div>
          </div>
          <div className="contact">
            <Contact />
          </div>
        </div>
        <WorkWithUs />
      </main>
      {loading && <Loader />}
      <Footer />
    </Suspense>
  );
};
export default Feedback;
