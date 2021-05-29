import React from "react";
function Social() {
  return (
    <div className="social">
      <div className="socialMediaDiv">
        <p>
          Join us on our social media platforms to get updated with our latest
          news and events.
        </p>
        <ul>
          <li>
            <a
              href="https://www.youtube.com/channel/UCgxZ9rqaWscw-kOfkj2F2lQ"
              target="_blank"
              rel="noreferrer"
            >
              <i className="fab fa-youtube"></i>
            </a>
          </li>
          <li>
            <a
              href="https://www.facebook.com/codebietjhs/"
              target="_blank"
              rel="noreferrer"
            >
              <i className="fab fa-facebook-square"></i>
            </a>
          </li>
          <li>
            <a
              href="https://www.linkedin.com/company/codebiet/"
              target="_blank"
              rel="noreferrer"
            >
              <i className="fab fa-linkedin"></i>
            </a>
          </li>
          <li>
            <a
              href="https://t.me/joinchat/AAAAAFMLj2wLbN8JYCMtlg"
              target="_blank"
              rel="noreferrer"
            >
              <i className="fab fa-telegram"></i>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Social;
