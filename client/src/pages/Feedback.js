import React, { lazy, Suspense, useState, useEffect } from "react";
const RangeSlider = lazy(() => import("../components/Slider/Slider"));
const WorkWithUs = lazy(() => import("../components/WorkWithUs/WorkWithUs"));
const Contact = lazy(() => import("../components/Contact/Contact"));
const Nav = lazy(() => import("../components/Navbar/Nav"));
const Footer = lazy(() => import("../components/Footer/Footer"));
import { Form, FormGroup, Button } from "reactstrap";
import logo from "../components/assets/feedback.png";
import Loader from "../components/Loader/Loader";
export const Feedback = () => {
  const [feedback, setFeedback] = useState("");
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
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
              <RangeSlider />
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
                  <Button className="btnDefault" onClick={handleSubmit}>
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
      <Footer />
    </Suspense>
  );
};
export default Feedback;
