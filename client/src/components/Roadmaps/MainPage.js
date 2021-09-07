import React, { lazy } from "react";

import "./MainPage.scss";
const Resource = lazy(() => import("./Resource"));

// import { Tab, Tabs } from "react-bootstrap";

// import Resource from "./Resource";
// import MainTab from "./MainTab";

const MainPage = () => {
  return (
    <section>
      <div className="main-content">
        <div className="headings">
          <h1>APP DEVELOPMENT</h1>
        </div>
        <div className="sub-heading">
          <h3>
            Everything that is there to learn about React and the ecosystem in
            2021.
          </h3>
        </div>
        <div className="info">
          <div className="left">
            <a href="#" class="fa fa-facebook"></a>
            <a href="#" class="fa fa-twitter"></a>
            <a href="#" class="fa fa-linkedin"></a>
            <a href="#" class="fa fa-instagram"></a>
            <a href="#" class="fa fa-whatsapp"></a>
          </div>
          <div className="right">
            <p className="right-content">
              There are multiple ways to develop applications for the android;
              you can go down the path of hybrid application development where
              flutter, react-native, or NativeScript are the most common
              contenders. Flutter uses Dart, whereas React Native and Native
              Script rely on JavaScript. Answering the question of hybrid vs
              native is out of the scope of this roadmap. This roadmap is
              focused on the native Android apps development but if you are
              interested in learning any hybrid framework, my personal
              preference is react-native and I would recommend you to checkout
              the Frontend Developer Roadmap.
            </p>
            <div className="btns">
              <button className="outline-warning">Other Roadmaps</button>
              <button className="outline-warning">Send me Updates</button>
              <button className="outline-warning">Suggest Changes</button>
            </div>
          </div>
        </div>
      </div>
      <div className="changeble-content">
        {/* <MainTab /> */}
        {/* pass link and resource description as props */}
        <Resource />
        <img
          className="roadmapimg"
          src="https://image.shutterstock.com/image-vector/vertical-timeline-infographic-design-template-600w-1278150034.jpg"
          alt="rdmp"
        ></img>{" "}
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "20px 20px",
          borderRadius: "50px",
        }}
      >
        <button className="outline-warning"> Download</button>
      </div>
    </section>
  );
};

export default MainPage;
