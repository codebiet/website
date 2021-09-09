import React, { Suspense, lazy } from "react";
import Loader from "../components/Loader/Loader";
import "../components/Roadmaps/MainPage.scss";

// const Resource = lazy(() => import("./Resource"));

const Nav = lazy(() => import("../components/Navbar/Nav"));
const Footer = lazy(() => import("../components/Footer/Footer"));
const MainTab = lazy(() => import("../components/Roadmaps/MainTab"));

const ResourceIndividual = () => {
  const download = (e) => {
    console.log(e);
    fetch(e, {
      method: "GET",
      headers: {},
    })
      .then((response) => {
        response.arrayBuffer().then(function (buffer) {
          const url = window.URL.createObjectURL(new Blob([buffer]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "image.png");
          document.body.appendChild(link);
          link.click();
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <Suspense fallback={<Loader />}>
      <Nav />
      <section>
        <div className="main-content">
          <div className="headings">
            {/* fetch data from backend */}
            <h1>APP DEVELOPMENT</h1>
          </div>
          <div className="sub-heading">
            <h3>
              Everything that is there to learn about React and the ecosystem in
              2021.
            </h3>
          </div>
          <div className="info">
            <div className="right">
              {/* <div className="left">
                <a href="#" class="fa fa-facebook"></a>
                <a href="#" class="fa fa-twitter"></a>
                <a href="#" class="fa fa-linkedin"></a>
                <a href="#" class="fa fa-instagram"></a>
                <a href="#" class="fa fa-whatsapp"></a>
              </div> */}
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
            </div>
          </div>
        </div>
        <div className="changeble-content">
          <MainTab />
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexWrap: "wrap",
            justifyContent: "center",
            margin: "20px 20px",
            borderRadius: "50px",
          }}
        >
          <button
            className="cta cta-1 default-btn round-corner na"
            onClick={(e) =>
              download(
                "https://image.shutterstock.com/image-vector/vertical-timeline-infographic-design-template-600w-1278150034.jpg"
              )
            }
          >
            Download Roadmap
          </button>

          {/* <Link to="/roadmaps" /> */}
          <button className="cta cta-1 default-btn round-corner na">
            Other Roadmaps
          </button>
        </div>
        <div className="other-content">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto,
            reprehenderit?
          </p>
        </div>
      </section>
      <Footer />
    </Suspense>
  );
};

export default ResourceIndividual;
