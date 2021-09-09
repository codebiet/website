import React from "react";
import "./Resource.scss";

// #FFE8D6

const Resource = (props) => {
  return (
    <div>
      <div className="full">
        <div className="rightr">
          <div className="title">
            {/* Heading resource */}
            <h3>Learn react from scratch</h3>
          </div>
          <div className="desc">
            {/* resource description */}
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate
              quam architecto corrupti. Maxime excepturi, aspernatur facere
              reiciendis perspiciatis, at ullam quaerat provident ipsa vitae
            </p>
          </div>
          <div>
            <button
              className="cta cta-1 default-btn round-corner na"
              href="https://www.freecodecamp.org"
            >
              view full source
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resource;
