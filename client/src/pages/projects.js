import React, { lazy, useEffect } from "react";
import { Suspense } from "react";
import Loader from "../components/Loader/Loader";
const Project = lazy(() => import("../components/ProjectCard/project"));
const Nav = lazy(() => import("../components/Navbar/Nav"));
const Footer = lazy(() => import("../components/Footer/Footer"));
function Projects() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <Suspense fallback={<Loader />}>
      <div className="App">
        <div>
          <Nav />
          <div className="this">
            <div className="projects">
              <h1>Projects</h1>
              <section>
                <Project />
              </section>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </Suspense>
  );
}
export default Projects;
