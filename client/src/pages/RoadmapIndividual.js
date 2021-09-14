import React, { Suspense, lazy, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import draftToHtml from "draftjs-to-html";
import DOMPurify from "dompurify";
import Loader from "../components/Loader/Loader";
import "../components/Roadmaps/MainPage.scss";

// const Resource = lazy(() => import("./Resource"));

const Nav = lazy(() => import("../components/Navbar/Nav"));
const Footer = lazy(() => import("../components/Footer/Footer"));
const MainTab = lazy(() => import("../components/Roadmaps/MainTab"));

const RoadmapIndividual = (props) => {

  const [roadmap, setRoadmap] = useState({})
  const [loading, setLoading] = useState(false)

  useEffect(()=>{
    const url = props.match.params.url
    setLoading(true)
    axios.get(`/api/roadmaps/${url}`)
    .then((res) => {
      setRoadmap(res.data)
      setLoading(false)
    })
    .catch((err) => {
      setLoading(false);
      console.log(err);
    });
  },[])

  const createMarkup = (html) => {
    return {
      __html: DOMPurify.sanitize(html),
    };
  };

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
        {loading && <Loader/>}
        <div className="main-content">
          <div className="headings">
            {/* fetch data from backend */}
            <h1>{roadmap.roadmapTitle}</h1>
          </div>
          <div className="sub-heading">
          </div>
          <div className="info">
            <div className="right-content"
                dangerouslySetInnerHTML={createMarkup(
                draftToHtml(JSON.parse(roadmap.roadmapDescription|| "{}")))}
              ></div>
          </div>
        </div>
        <div className="changeble-content">
          {!loading && <MainTab {...roadmap}/>}
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
                roadmap.roadmapImg
              )
            }
          >
            Download Roadmap
          </button>

          <Link to="/roadmaps">
          <button className="cta cta-1 default-btn round-corner na">
            Other Roadmaps
          </button>
          </Link>
        </div>

      </section>
      <Footer />
    </Suspense>
  );
};

export default RoadmapIndividual;
