import React from "react";
function Footer() {
  return (
    <div className="">
      <footer>
        <div className="footerDiv">
          <div className="footerInnerDiv">
            <div className="footerLeft">
              <div className="footerDiv1">
                <h3>C.O.D.E</h3>
                <ul>
                  <li>About</li>
                  <li>Contact Us</li>
                  <li>Privacy</li>
                  <li>Careers</li>
                </ul>
              </div>
              <div className="footerDiv2">
                <h3>Follow Us</h3>
                <ul>
                  <li>Blog</li>
                  <li>Twitter</li>
                  <li>Instgram</li>
                  <li>Telegram</li>
                </ul>
              </div>
            </div>
            <div className="footerRight">
              <p>About C.O.D.E</p>
              <p>
                C O D E is club of developers , by developers and for the
                developers. It also contains college study behaviour ,GATE
                preparation focused From Competitive to College Subjects ,
                Guidance to collaboration in projects, Hiring to Learning .CODDE
                tries to remove the obstacles that hinders BIETian to prove
                themselves on bigger platform
              </p>
            </div>
          </div>
          <hr></hr>
          <div className="copyright">
            © C.O.D.E. • Privacy, simplified .BIET ,Jhansi
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
