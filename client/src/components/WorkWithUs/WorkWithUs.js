import React from "react";
import { Link } from "react-router-dom";
function WorkWithUs() {
  return (
    <div className="work-with-us-container">
      <div className="work_with_us">
        <h2>Alone we can do so little, together we can do so much.</h2>
        <p>Come and start your journey with CODE.</p>
        <button className="transitionbtn">
          <Link to="/careers">Work with us</Link>
        </button>
      </div>
    </div>
  );
}

export default WorkWithUs;
