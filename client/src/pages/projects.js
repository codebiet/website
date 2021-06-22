import React, { useState, useEffect } from "react";
import { Project } from "../components/Project/Project";
import Header from "../components/Project/Header";
import { GetProjects } from "../components/Project/GetProjects";
import Nav from "../components/Navbar/Nav";
import Footer from "../components/Footer/Footer";
function Projectpage() {
  const [projects, setProjects] = useState([{}]);
  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchData = async () => {
      let result = await GetProjects();
      console.log(result);
      setProjects(result);
    };
    fetchData();
  }, []);

  return (
    <>
      <Nav />
      <div className="Appdiv">
        <Header />
      </div>
      {projects.map((dt) => {
        return <Project data={dt} key={dt.key} />;
      })}
      <Footer />
    </>
  );
}

export default Projectpage;
