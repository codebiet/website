import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { clearEverything, generateError } from "../../state/info/infoActions";
import { InfoContext } from "../../state/Store";
import Loader from "../Loader/Loader";
import dummyResumeData from "./dummyResumeData";
const getFirstHalfSkills = (skills) => {
  const length = skills.length;
  if (length % 2 == 0) {
    return skills.slice(0, parseInt(length / 2));
  } else {
    return skills.slice(0, parseInt(length / 2) + 1);
  }
};
const getLastHalfSkills = (skills) => {
  const length = skills.length;
  if (length % 2 == 0) {
    return skills.slice(parseInt(length / 2), length);
  } else {
    return skills.slice(parseInt(length / 2) + 1, length);
  }
};
const Template3 = React.forwardRef(({}, ref) => {
  const [resumeData, setResumeData] = useState(dummyResumeData);
  const [loading, setLoading] = useState(true);
  const info = useContext(InfoContext);
  useEffect(() => {
    setLoading(true);
    axios
      .get("/api/resumeData")
      .then((res) => {
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
        resumeData.skills.platforms
      ).length > 0
    );
  };
  return (
    <React.Fragment>
      {!loading && (
        <div className="page-content resume-template3" ref={ref}>
          <div
            className="container"
            style={{ maxWidth: "unset", width: "220mm", padding: 0 }}
          >
            <div className="cover shadow-lg bg-white">
              <div className="cover-bg p-3 p-lg-4 text-white">
                <div className="row">
                  <div className="col-lg-4 col-md-5">
                    <div className="avatar hover-effect bg-white shadow-sm p-1">
                      <img src={resumeData.img} width="200" height="200" />
                    </div>
                  </div>
                  <div className="col-lg-8 col-md-7 text-center text-md-start">
                    <h2 className="h1 name">{resumeData.name}</h2>
                    <p>{resumeData.degree + " " + resumeData.year} Student</p>
                  </div>
                </div>
              </div>
              <div className="about-section pt-4 px-3 px-lg-4 mt-1">
                <div className="row">
                  <div className="col-md-6">
                    <h2 className="h3 mb-3">About Me</h2>
                    <p>{resumeData.objective}</p>
                  </div>
                  <div className="col-md-5 offset-md-1">
                    <div className="row">
                      <div className="col-sm-4">
                        <div className="pb-1">Email</div>
                      </div>
                      <div className="col-sm-8">
                        <div className="pb-1 text-secondary">
                          {resumeData.email}
                        </div>
                      </div>
                      <div className="col-sm-4">
                        <div className="pb-1">Phone</div>
                      </div>
                      <div className="col-sm-8">
                        <div className="pb-1 text-secondary">
                          +91 {resumeData.phoneNumber}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {hasSkills() && (
                <>
                  <hr className="d-print-none" />
                  <div className="skills-section px-3 px-lg-4">
                    <h2 className="h3 mb-3">Professional Skills</h2>
                    <div className="row">
                      <div className="col-md-6">
                        {getFirstHalfSkills(
                          resumeData.skills.programmingLanguages.concat(
                            resumeData.skills.technologies,
                            resumeData.skills.dbms,
                            resumeData.skills.platforms
                          )
                        ).map((skill) => {
                          return (
                            <div key={skill.name} className="mb-2">
                              <span>{skill.name.toUpperCase()}</span>
                              <div className="progress my-1">
                                <div
                                  className="progress-bar bg-primary"
                                  style={{
                                    width:
                                      skill.level == "Beginner"
                                        ? "30%"
                                        : skill.level == "Intermediate"
                                        ? "50%"
                                        : "80%",
                                  }}
                                ></div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                      <div className="col-md-6">
                        {getLastHalfSkills(
                          resumeData.skills.programmingLanguages.concat(
                            resumeData.skills.technologies,
                            resumeData.skills.dbms,
                            resumeData.skills.platforms
                          )
                        ).map((skill) => {
                          return (
                            <div key={skill.name} className="mb-2">
                              <span>{skill.name.toUpperCase()}</span>
                              <div className="progress my-1">
                                <div
                                  className="progress-bar bg-success"
                                  style={{
                                    width:
                                      skill.level == "Beginner"
                                        ? "30%"
                                        : skill.level == "Intermediate"
                                        ? "50%"
                                        : "80%",
                                  }}
                                ></div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </>
              )}
              <hr className="d-print-none" />
              {resumeData.projects.length > 0 && (
                <>
                  <div className="work-experience-section px-3 px-lg-4">
                    <h2 className="h3 mb-4">Projects</h2>
                    <div className="timeline">
                      {resumeData.projects.map((project) => {
                        return (
                          <div
                            key={project.name}
                            className="timeline-card timeline-card-primary card shadow-sm"
                          >
                            <div className="card-body">
                              <div className="h5 mb-1">
                                {project.name}
                                <span className="text-muted h6">
                                  {" "}
                                  in {project.type}
                                </span>
                              </div>
                              {project.startDate && (
                                <div className="text-muted text-small mb-2">
                                  {project.startDate} -{" "}
                                  {project.endDate || "Present"}
                                </div>
                              )}
                              <div>{project.technologies.toUpperCase()}</div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <hr className="d-print-none" />
                </>
              )}
              <div className="page-break"></div>
              <div className="education-section px-3 px-lg-4 pb-4">
                <h2 className="h3 mb-4">Education</h2>
                <div className="timeline">
                  {resumeData.academics.map((academic) => (
                    <div
                      key={academic.degree}
                      className="timeline-card timeline-card-success card shadow-sm"
                    >
                      <div className="card-body">
                        <div className="h5 mb-1">
                          {academic.degree}
                          <span
                            className="text-muted h6"
                            style={{ marginLeft: ".3rem" }}
                          >
                            from {academic.college}
                          </span>
                        </div>
                        <div className="text-muted text-small mb-2">
                          {academic.year}
                        </div>
                        <div>
                          {academic.result.gpa == 0
                            ? "Percentage : " + academic.result.percentage
                            : "GPA : " + academic.result.gpa}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {loading && <Loader />}
    </React.Fragment>
  );
});

export default Template3;
