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
                  <a
                    href="mailto:code@bietjhs.ac.in"
                    className="mail"
                    target="_blank"
                    rel="noopener"
                  >
                    code@bietjhs.ac.in
                  </a>
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
                    <img
                      src="https://img.icons8.com/metro/12/000000/chevron-right.png"
                      alt=""
                    />
                    Our Team
                  </Link>
                </li>
                <li className="links">
                  <Link to="/events">
                    <img
                      src="https://img.icons8.com/metro/12/000000/chevron-right.png"
                      alt=""
                    />
                    Events
                  </Link>
                </li>
                <li className="links">
                  <Link to="/projects">
                    <img
                      src="https://img.icons8.com/metro/12/000000/chevron-right.png"
                      alt=""
                    />
                    Projects
                  </Link>
                </li>
                <li className="links">
                  <Link to="/about">
                    <img
                      src="https://img.icons8.com/metro/12/000000/chevron-right.png"
                      alt=""
                    />
                    About Us
                  </Link>
                </li>
                <li className="links">
                  <Link to="/bietGems">
                    <img
                      src="https://img.icons8.com/metro/12/000000/chevron-right.png"
                      alt=""
                    />
                    BIET Gems
                  </Link>
                </li>
                <li className="links">
                  <Link to="/discussion-forum">
                    <img
                      src="https://img.icons8.com/metro/12/000000/chevron-right.png"
                      alt=""
                    />
                    Discussion Forum
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
                    <img
                      src="https://img.icons8.com/metro/12/000000/chevron-right.png"
                      alt=""
                    />
                    Blogs
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
                  <Link to="/suggestions">
                    <img
                      src="https://img.icons8.com/metro/12/000000/chevron-right.png"
                      alt=""
                    />
                    Write a Blog
                  </Link>
                </li>
                <li className="links">
                  <Link to="/careers">
                    <img
                      src="https://img.icons8.com/metro/12/000000/chevron-right.png"
                      alt=""
                    />
                    Work with Us
                  </Link>
                </li>
                <li className="links">
                  <Link to="/contact">
                    <img
                      src="https://img.icons8.com/metro/12/000000/chevron-right.png"
                      alt=""
                    />
                    Give Suggestions
                  </Link>
                </li>
                <li className="links">
                  <Link to="/verifyCertificate">
                    <img
                      src="https://img.icons8.com/metro/12/000000/chevron-right.png"
                      alt=""
                    />
                    Certificate Verification
                  </Link>
                </li>
                <li className="links">
                  <div className="socialIcons">
                    <a
                      href="https://www.facebook.com/codebietjhs/"
                      target="_blank"
                      rel="noopener"
                      className="socialIcon"
                    >
                      <span style={{ display: "none" }}>Facebook</span>
                      <img
                        src="https://img.icons8.com/fluent/40/000000/facebook-new.png"
                        alt=""
                      />
                    </a>
                    <a
                      href="https://t.me/joinchat/AAAAAFMLj2wLbN8JYCMtlg"
                      target="_blank"
                      rel="noopener"
                      className="socialIcon"
                    >
                      <span style={{ display: "none" }}>telegram</span>
                      <img
                        src="https://img.icons8.com/color/40/000000/telegram-app.png"
                        alt=""
                      />
                    </a>
                    <a
                      href="https://chat.whatsapp.com/GgbBW3sDiCnAiq9SBFQau0"
                      target="_blank"
                      rel="noopener"
                      className="socialIcon"
                    >
                      <span style={{ display: "none" }}>whatsapp</span>
                      <img
                        src="https://img.icons8.com/color/44/000000/whatsapp--v1.png"
                        alt=""
                      />
                    </a>
                    <a
                      href="https://github.com/codebiet"
                      target="_blank"
                      rel="noopener"
                      className="socialIcon"
                    >
                      <span style={{ display: "none" }}>github</span>
                      <img
                        src="https://img.icons8.com/material-rounded/40/000000/github.png"
                        alt=""
                      />
                    </a>
                    <a
                      href="https://www.linkedin.com/company/codebiet/"
                      target="_blank"
                      rel="noopener"
                      className="socialIcon"
                    >
                      <span style={{ display: "none" }}>LinkedIn</span>
                      <img
                        src="https://img.icons8.com/color/40/000000/linkedin.png"
                        alt=""
                      />
                    </a>
                    <a
                      href="https://www.youtube.com/channel/UCgxZ9rqaWscw-kOfkj2F2lQ"
                      target="_blank"
                      rel="noopener"
                      className="socialIcon"
                    >
                      <span style={{ display: "none" }}>Youtube</span>
                      <img
                        src="https://img.icons8.com/fluent/40/000000/youtube-play.png"
                        alt=""
                      />
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
