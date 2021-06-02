import React, { useState, useEffect, useContext } from "react";
import Loader from "../Loader/Loader";
import axios from "axios";
import { clearEverything, generateError } from "../../state/info/infoActions";
import { InfoContext } from "../../state/Store";
import dummyResumeData from "./dummyResumeData";
// import "./resumeTemplate1.scss";
const ResumeTemplate1 = React.forwardRef(({}, ref) => {
  const [resumeData, setResumeData] = useState(dummyResumeData);
  const [loading, setLoading] = useState(false);
  const info = useContext(InfoContext);
  useEffect(() => {
    setLoading(true);
    axios
      .get("/api/resumeData")
      .then((res) => {
        console.log(res.data);
        setResumeData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        if (err.response && err.response.data && err.response.data.errorMsg)
          info.dispatch(generateError(err.response.data.errorMsg));
        setLoading(false);
      });
    return () => info.dispatch(clearEverything());
  }, []);
  const hasSkills = () => {
    return (
      resumeData.skills.programmingLanguages.concat(
        resumeData.skills.technologies,
        resumeData.skills.dbms,
        resumeData.skills.platforms,
        resumeData.skills.other
      ).length > 0
    );
  };
  return (
    <>
      {!loading && (
        <div className="resume-container" ref={ref}>
          <header>
            <div>
              <h1>{resumeData.name}</h1>
              <p>
                {resumeData.year} Year {resumeData.degree} Student
              </p>
              <p>
                {resumeData.college}, {resumeData.city}
              </p>
            </div>
            <div style={{ textAlign: "right" }}>
              <div className="phoneNumber">+91 {resumeData.phoneNumber}</div>
              <a href="mailto:soorajshukla974@gmail.com" className="email">
                {resumeData.email}
              </a>
            </div>
          </header>
          <hr style={{ margin: "1rem 0 0 0" }} />
          <div
            className="full-width academic-details"
            aria-label="academic-details"
          >
            <div className="heading-container">
              <h2>Academic Details</h2>
            </div>
            <table className="full-width">
              <thead>
                <tr>
                  <th className="year">Year</th>
                  <th>Degree</th>
                  <th>Institute</th>
                  <th>Percentage/GPA</th>
                </tr>
              </thead>
              <tbody>
                {resumeData.academics.map((academic, index) => (
                  <tr key={academic.degree}>
                    <td className="year">{academic.year}</td>
                    <td>{academic.degree}</td>
                    <td>{academic.college}</td>
                    <td>
                      {academic.result.gpa != "0"
                        ? `CGPA = ${academic.result.gpa}`
                        : `${academic.result.percentage}%`}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="full-width" aria-label="objective">
            <div className="heading-container">
              <h2>Objective</h2>
            </div>
            <div className="full-width">
              <p style={{ textAlign: "justify", margin: "0" }}>
                {resumeData.objective}
              </p>
            </div>
          </div>
          {resumeData.projects.length > 0 && (
            <div className="full-width projects" aria-label="projects">
              <div className="heading-container">
                <h2>Projects</h2>
              </div>
              <table className="full-width">
                <tbody>
                  <tr>
                    {resumeData.projects &&
                      resumeData.projects.length > 0 &&
                      resumeData.projects.map((project, index) => {
                        return (
                          <td key={index}>
                            <div className="name">{project.name}</div>
                            <ul>
                              <li className="type">
                                <span>{project.type.toUpperCase()}</span>
                              </li>
                              <li className="technologies">
                                <div>
                                  <span>TECHNOLOGIES: </span>
                                  <span>
                                    {project.technologies.toUpperCase()}
                                  </span>
                                </div>
                              </li>
                              <li className="credentials">
                                <a href={project.credentials}>Credentials</a>
                              </li>
                            </ul>
                          </td>
                        );
                      })}
                  </tr>
                </tbody>
              </table>
            </div>
          )}
          {hasSkills() && (
            <div
              className="full-width technical-skills"
              aria-label="technical-skills"
            >
              <div className="heading-container">
                <h2>Technical Skills</h2>
              </div>
              <table>
                <tbody>
                  <tr>
                    {resumeData.skills.programmingLanguages &&
                      resumeData.skills.programmingLanguages.length > 0 && (
                        <td>
                          <ul>
                            <li>
                              <span className="header">
                                PROGRAMMING LANGUAGES :{" "}
                              </span>
                              <span className="name">
                                {resumeData.skills.programmingLanguages
                                  .map((language) =>
                                    language.name.toUpperCase()
                                  )
                                  .join(", ")}
                              </span>
                            </li>
                          </ul>
                        </td>
                      )}
                  </tr>
                  <tr>
                    {resumeData.skills.technologies &&
                      resumeData.skills.technologies.length > 0 && (
                        <td>
                          <ul>
                            <li>
                              <span className="header">TECHNOLOGIES: </span>
                              <span className="name">
                                {resumeData.skills.technologies
                                  .map((technology) =>
                                    technology.name.toUpperCase()
                                  )
                                  .join(", ")}
                              </span>
                            </li>
                          </ul>
                        </td>
                      )}
                  </tr>
                  <tr>
                    {resumeData.skills.dbms &&
                      resumeData.skills.dbms.length > 0 && (
                        <td>
                          <ul>
                            <li>
                              <span className="header">DBMS : </span>
                              <span className="name">
                                {resumeData.skills.dbms
                                  .map((dbms) => dbms.name.toUpperCase())
                                  .join(", ")}
                              </span>
                            </li>
                          </ul>
                        </td>
                      )}
                  </tr>
                  <tr>
                    {resumeData.skills.platforms &&
                      resumeData.skills.platforms.length > 0 && (
                        <td>
                          <ul>
                            <li>
                              <span className="header">PLATFORMS: </span>
                              <span className="name">
                                {resumeData.skills.platforms
                                  .map((platform) =>
                                    platform.name.toUpperCase()
                                  )
                                  .join(", ")}
                              </span>
                            </li>
                          </ul>
                        </td>
                      )}
                  </tr>
                  <tr>
                    {resumeData.skills.other &&
                      resumeData.skills.other.length > 0 && (
                        <td>
                          <ul>
                            <li>
                              <span className="header">OTHER SKILLS: </span>
                              <span className="name">
                                {resumeData.skills.other
                                  .map((other) => other.toUpperCase())
                                  .join(", ")}
                              </span>
                            </li>
                          </ul>
                        </td>
                      )}
                  </tr>
                </tbody>
              </table>
            </div>
          )}
          {resumeData.achievements && resumeData.achievements.length > 0 && (
            <div className="full-width achievements" aria-label="achievements">
              <div className="heading-container">
                <h2>Achievements</h2>
              </div>
              <ul>
                {resumeData.achievements.map((achievement, index) => (
                  <li key={index}>{achievement}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
      {loading && <Loader />}
    </>
  );
});
export default ResumeTemplate1;
