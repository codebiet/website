import React from "react";
import "./Resource.scss";

const Resource = (props) => {
  return (
    <div>
      <div className="full">
        <div className="leftr">
          <img
            src="https://i.picsum.photos/id/302/536/354.jpg?hmac=TC5rkcbi3t6xjOKZygd2O51G1i9ascFddKoeTkPz6bw"
            alt="new"
          />
        </div>
        <div className="rightr">
          <div className="title">
            <h1>Learn react from scratch</h1>
          </div>
          <div className="desc">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate
              quam architecto corrupti. Maxime excepturi, aspernatur facere
              reiciendis perspiciatis, at ullam quaerat provident ipsa vitae
              fugit eveniet ab, nemo obcaecati eos repellendus officiis nesciunt
              corrupti quis asperiores ea unde minima voluptatibus. Beatae
              architecto neque quaerat error dolor.
            </p>
          </div>
          <div>
            <button className="outline-warning">view full</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resource;
