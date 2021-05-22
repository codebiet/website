import React from "react";
import "./resumeTemplate2.scss";
import avatar from "../assets/avatar.jpg";
const Skills = (skills) => {
  const ul1 = [];
  const ul2 = [];
  const ul3 = [];
  const n = skills.length;
  const breakPoint1 = parseInt((n - 1) / 3) + 1;
  const breakPoint2 = breakPoint1 + parseInt((n - 1 - breakPoint1) / 2) + 1;
  for (var i = 0; i < breakPoint1; i++)
    ul1.push(
      <li key={skills[i]} className={i == breakPoint1 - 1 && "last"}>
        {skills[i].name.toUpperCase()}
      </li>
    );
  for (var i = breakPoint1; i < breakPoint2; i++)
    ul2.push(
      <li key={skills[i]} className={i == breakPoint2 - 1 && "last"}>
        {skills[i].name.toUpperCase()}
      </li>
    );
  for (var i = breakPoint2; i < n; i++)
    ul3.push(
      <li key={skills[i]} className={i == n - 1 && "last"}>
        {skills[i].name.toUpperCase()}
      </li>
    );
  return (
    <React.Fragment>
      <ul className="talent">{ul1.map((li) => li)}</ul>
      <ul className="talent">{ul2.map((li) => li)}</ul>
      <ul className="talent">{ul3.map((li) => li)}</ul>
    </React.Fragment>
  );
};
const Template2 = React.forwardRef(({ resumeData }, ref) => (
  <React.Fragment>
    <div className="resume-container template-2" ref={ref}>
      <div id="inner">
        <div id="hd">
          <div className="yui-gc header">
            <div className="yui-u avatar-img">
              <img src={avatar} alt="" />
            </div>
            <div className="yui-u title">
              <h1>{resumeData.name}</h1>
              <h2>{resumeData.degree + " " + resumeData.year} year Student</h2>
            </div>

            <div className="yui-u">
              <div className="contact-info">
                <h3>
                  <a href="mailto:name@yourdomain.com">{resumeData.email}</a>
                </h3>
                <h3>+91 {resumeData.phoneNumber}</h3>
              </div>
            </div>
          </div>
        </div>

        <div id="bd">
          <div id="yui-main">
            <div className="yui-b">
              <div className="yui-gf">
                <div className="yui-u first">
                  <h2>Profile</h2>
                </div>
                <div className="yui-u">
                  <p className="enlarge">{resumeData.objective}</p>
                </div>
              </div>

              {/* <div className="yui-gf">
                  <div className="yui-u first">
                    <h2>Skills</h2>
                  </div>
                  <div className="yui-u">
                    <div className="talent">
                      <h2>Web Design</h2>
                      <p>
                        Assertively exploit wireless initiatives rather than
                        synergistic core competencies.
                      </p>
                    </div>

                    <div className="talent">
                      <h2>Interface Design</h2>
                      <p>
                        Credibly streamline mission-critical value with
                        multifunctional functionalities.
                      </p>
                    </div>

                    <div className="talent">
                      <h2>Project Direction</h2>
                      <p>
                        Proven ability to lead and manage a wide variety of
                        design and development projects in team and independent
                        situations.
                      </p>
                    </div>
                  </div>
                </div> */}

              <div className="yui-gf">
                <div className="yui-u first">
                  <h2>Technical</h2>
                </div>
                <div className="yui-u">
                  {Skills(
                    resumeData.skills.programmingLanguages.concat(
                      resumeData.skills.technologies,
                      resumeData.skills.dbms,
                      resumeData.skills.platforms,
                      resumeData.skills.other
                    )
                  )}
                  {/* <ul className="talent">
                      <li>XHTML</li>
                      <li>CSS</li>
                      <li className="last">Javascript</li>
                    </ul>

                    <ul className="talent">
                      <li>Jquery</li>
                      <li>PHP</li>
                      <li className="last">CVS / Subversion</li>
                    </ul>

                    <ul className="talent">
                      <li>OS X</li>
                      <li>Windows XP/Vista</li>
                      <li className="last">Linux</li>
                    </ul> */}
                </div>
              </div>

              <div className="yui-gf">
                <div className="yui-u first">
                  <h2>Projects</h2>
                </div>
                <div className="yui-u">
                  {resumeData.projects.map((project, index) => (
                    <div
                      key={index}
                      className={index == 2 ? "job last" : "job"}
                    >
                      <h2>{project.name}</h2>
                      <h3>{project.type}</h3>
                      <h4>
                        {project.startDate}-{project.endDate}
                      </h4>
                      <p>
                        {project.technologies
                          .map((tech) => tech.toUpperCase())
                          .join(", ")}
                      </p>
                    </div>
                  ))}
                  {/* <div className="job">
                      <h2>Facebook</h2>
                      <h3>Senior Interface Designer</h3>
                      <h4>2005-2007</h4>
                      <p>
                        Intrinsicly enable optimal core competencies through
                        corporate relationships. Phosfluorescently implement
                        worldwide vortals and client-focused imperatives.
                        Conveniently initiate virtual paradigms and top-line
                        convergence.
                      </p>
                    </div> */}

                  {/* <div className="job">
                      <h2>Apple Inc.</h2>
                      <h3>Senior Interface Designer</h3>
                      <h4>2005-2007</h4>
                      <p>
                        Progressively reconceptualize multifunctional "outside
                        the box" thinking through inexpensive methods of
                        empowerment. Compellingly morph extensive niche markets
                        with mission-critical ideas. Phosfluorescently deliver
                        bricks-and-clicks strategic theme areas rather than
                        scalable benefits.
                      </p>
                    </div>

                    <div className="job">
                      <h2>Microsoft</h2>
                      <h3>Principal and Creative Lead</h3>
                      <h4>2004-2005</h4>
                      <p>
                        Intrinsicly transform flexible manufactured products
                        without excellent intellectual capital. Energistically
                        evisculate orthogonal architectures through covalent
                        action items. Assertively incentivize sticky platforms
                        without synergistic materials.
                      </p>
                    </div>

                    <div className="job last">
                      <h2>International Business Machines (IBM)</h2>
                      <h3>Lead Web Designer</h3>
                      <h4>2001-2004</h4>
                      <p>
                        Globally re-engineer cross-media schemas through viral
                        methods of empowerment. Proactively grow long-term
                        high-impact human capital and highly efficient
                        innovation. Intrinsicly iterate excellent e-tailers with
                        timely e-markets.
                      </p>
                    </div> */}
                </div>
              </div>

              <div className="yui-gf last">
                <div className="yui-u first">
                  <h2>Education</h2>
                </div>
                {resumeData.academics.map((academic, index) => {
                  return (
                    index == 0 && (
                      <div className="yui-u">
                        <h2>{academic.college}</h2>
                        <h3>
                          {academic.degree} &mdash;
                          <strong>
                            {academic.result.gpa == 0
                              ? academic.result.percentage + "%"
                              : academic.result.gpa + "CPA"}
                          </strong>
                        </h3>
                      </div>
                    )
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <div id="ft">
          <p>
            {resumeData.name} &mdash;
            <a href="mailto:name@yourdomain.com">{resumeData.email}</a> &mdash;
            +91 {resumeData.phoneNumber}
          </p>
        </div>
      </div>
    </div>
  </React.Fragment>
));
export default Template2;
