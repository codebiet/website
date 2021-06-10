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
                  <Link to="/ourTeam">
                    <img src="https://img.icons8.com/metro/12/000000/chevron-right.png" />
                    Our Team
                  </Link>
                </li>
                <li className="links">
                  <Link to="/events">
                    <img src="https://img.icons8.com/metro/12/000000/chevron-right.png" />
                    Events
                  </Link>
                </li>
                <li className="links">
                  <Link to="/projects">
                    <img src="https://img.icons8.com/metro/12/000000/chevron-right.png" />
                    Projects
                  </Link>
                </li>
                {/* <li className="links">
                  <Link to="#">
                    <img src="https://img.icons8.com/metro/12/000000/chevron-right.png" />
                    Achievements
                  </Link>
                </li> */}
                <li className="links">
                  <Link to="/blogs">
                    <img src="https://img.icons8.com/metro/12/000000/chevron-right.png" />
                    Blog
                  </Link>
                </li>
                {/* <li className="links">
                  <Link to="#">
                    <img src="https://img.icons8.com/metro/12/000000/chevron-right.png" />
                    Image Gallery
                  </Link>
                </li> */}
              </ul>
            </div>
            <div className="menu">
              <h3 className="menu-head">Actions</h3>
              <ul className="submenu">
                <li className="links">
                  <Link to="/careers">
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
                  <Link to="/about">
                    <img src="https://img.icons8.com/metro/12/000000/chevron-right.png" />
                    About Us
                  </Link>
                </li>
                <li className="links">
                  <Link to="/bietGems">
                    <img src="https://img.icons8.com/metro/12/000000/chevron-right.png" />
                    BIET Gems
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
                    <a href="https://www.facebook.com/codebietjhs/" target="_blank" className="socialIcon">
                      <img src="https://img.icons8.com/fluent/40/000000/facebook-new.png" />
                    </a>
                    <Link to="#" className="socialIcon">
                      <img src="https://img.icons8.com/color/40/000000/twitter-circled--v1.png" />
                    </Link>
                    <a href="https://t.me/joinchat/AAAAAFMLj2wLbN8JYCMtlg" target="_blank" className="socialIcon">
                      <img src="https://img.icons8.com/fluent/40/000000/telegram-app.png" />
                    </a>
                    <a href="https://www.linkedin.com/company/codebiet/" target="_blank" className="socialIcon">
                      <img src="https://img.icons8.com/fluent/40/000000/linkedin-circled.png" />
                    </a>
                    <a to="https://www.youtube.com/channel/UCgxZ9rqaWscw-kOfkj2F2lQ" target="_blank" className="socialIcon">
                      <img src="https://img.icons8.com/fluent/40/000000/youtube-play.png" />
                    </a>
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
