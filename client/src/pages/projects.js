import React, { useState, useEffect, lazy, Suspense } from "react";
import Loader from "../components/Loader/Loader";
import "regenerator-runtime/runtime";
const Project = lazy(() => import("../components/Project/Project"));
const Header = lazy(() => import("../components/Project/Header"));
const GetProjects = lazy(() => import("../components/Project/GetProjects"));
const Nav = lazy(() => import("../components/Navbar/Nav"));
const Footer = lazy(() => import("../components/Footer/Footer"));
function Projectpage() {
  const [projects, setProjects] = useState([{}]);
  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchData = async () => {
      let result = await GetProjects();
      // console.log(result);
      setProjects(result);
    };
    fetchData();
  }, []);

  return (
    <Suspense fallback={<Loader />}>
      <Nav />
      <div className="Appdiv">
        <Header />
      </div>
      {projects.map((dt) => {
        return <Project data={dt} key={dt.key} />;
      })}
      <Footer />
    </Suspense>
  );
}

export default Projectpage;
