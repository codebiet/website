import React from "react";
import { Link } from "react-router-dom";
function Footer() {
  const curDate = new Date().getFullYear();

  return (
    <footer className="main-footer">
      <div className="footer">
        <div className="prefooter">
          <div className="elevate">
            <div>
              <img
                src="https://media-exp1.licdn.com/dms/image/C4E0BAQG3bCYltvgjoQ/company-logo_200_200/0/1602502806637?e=2159024400&v=beta&t=e9_m3djcdm2I_Z9UsrBXIUmp0uW2K3c4T2A6MBhtAbM"
                className="logo"
                alt=""
              />
              <h3>Club Of DEvelopers</h3>
              <h4>BIET Jhansi</h4>
              <p>A Development Club founded in 2020 by BIETians</p>
              <ul className="submenu">
                <li>
                  <Link to="mailto:code@bietjhs.ac.in" className="mail">
                    code@bietjhs.ac.in
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="menu-section">
            <div className="menu">
              <h3 className="menu-head">Resources</h3>
              <ul className="submenu">
                <li className="links">
                  <Link to="#">
                    <img src="https://img.icons8.com/metro/12/000000/chevron-right.png" />
                    Our Team
                  </Link>
                </li>
                <li className="links">
                  <Link to="/events">
                    <img src="https://img.icons8.com/metro/12/000000/chevron-right.png" />
                    Club Activities
                  </Link>
                </li>
                <li className="links">
                  <Link to="/projects">
                    <img src="https://img.icons8.com/metro/12/000000/chevron-right.png" />
                    Projects
                  </Link>
                </li>
                <li className="links">
                  <Link to="#">
                    <img src="https://img.icons8.com/metro/12/000000/chevron-right.png" />
                    Achievements
                  </Link>
                </li>
                <li className="links">
                  <Link to="/blogs">
                    <img src="https://img.icons8.com/metro/12/000000/chevron-right.png" />
                    Blog
                  </Link>
                </li>
                <li className="links">
                  <Link to="#">
                    <img src="https://img.icons8.com/metro/12/000000/chevron-right.png" />
                    Image Gallery
                  </Link>
                </li>
              </ul>
            </div>
            <div className="menu">
              <h3 className="menu-head">Actions</h3>
              <ul className="submenu">
                <li className="links">
                  <Link to="#">
                    <img src="https://img.icons8.com/metro/12/000000/chevron-right.png" />
                    Work with Us
                  </Link>
                </li>
                <li className="links">
                  <Link to="/contact">
                    <img src="https://img.icons8.com/metro/12/000000/chevron-right.png" />
                    Suggestions
                  </Link>
                </li>
                <li className="links">
                  <Link to="#">
                    <img src="https://img.icons8.com/metro/12/000000/chevron-right.png" />
                    Discussion Forum
                  </Link>
                </li>
                <li className="links">
                  <Link to="/verifyCertificate">
                    <img src="https://img.icons8.com/metro/12/000000/chevron-right.png" />
                    Certificate Verification
                  </Link>
                </li>
                <li className="links">
                  <div className="socialIcons">
                    <Link to="#" className="socialIcon">
                      <img src="https://img.icons8.com/fluent/40/000000/facebook-new.png" />
                    </Link>
                    <Link to="#" className="socialIcon">
                      <img src="https://img.icons8.com/color/40/000000/twitter-circled--v1.png" />
                    </Link>
                    <Link to="#" className="socialIcon">
                      <img src="https://img.icons8.com/fluent/40/000000/telegram-app.png" />
                    </Link>
                    <Link to="#" className="socialIcon">
                      <img src="https://img.icons8.com/fluent/40/000000/linkedin-circled.png" />
                    </Link>
                    <Link to="#" className="socialIcon">
                      <img src="https://img.icons8.com/fluent/40/000000/youtube-play.png" />
                    </Link>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="copyright">
          <p>
            &copy; Copyright {curDate + " "}
            <Link to="#">Club Of DEvelopers, BIET Jhansi</Link> | All Rights
            Reserved
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
