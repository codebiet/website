import React from "react";
import {Link} from "react-router-dom";
import {Row,Container} from "reactstrap";
const Footer = (props) => {
  return (
    <footer style={{paddingTop:0}} className={"footer-dashboard footer" + (props.default ? " footer-default" : "")}>
      <Container fluid={props.fluid ? true : false}>
        <Row style={{display:"flex"}}>
          <nav className="footer-nav" style={{width:"unset"}}>
            <ul>
              <li>
                <Link to="/">
                  CODE
                </Link>
              </li>
              <li>
                  B.I.E.T Jhansi
              </li>
            </ul>
          </nav>
          <div className="credits ml-auto" style={{width:"unset"}}>
            <div className="copyright">
              &copy; {1900 + new Date().getYear()}, Club Of DEvelopers
            </div>
          </div>
        </Row>
      </Container>
    </footer>
  );
};
export default Footer;
