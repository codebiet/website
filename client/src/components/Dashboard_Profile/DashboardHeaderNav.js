import React from "react";
import { useLocation } from "react-router-dom";
import { Navbar, NavbarBrand, NavItem, Container } from "reactstrap";
function Header(props) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [color, setColor] = React.useState("transparent");
  const sidebarToggle = React.useRef();
  const location = useLocation();
  const toggle = () => {
    setColor("light");

    setIsOpen((isOpen) => !isOpen);
  };

  const openSidebar = () => {
    document.documentElement.classList.toggle("nav-open");
    sidebarToggle.current.classList.toggle("toggled");
  };
  // function that adds color dark/transparent to the navbar on resize (this is for the collapse)
  const updateColor = () => {
    if (window.innerWidth < 993 && isOpen) {
      setColor("dark");
    } else {
      setColor("transparent");
    }
  };
  React.useEffect(() => {
    window.addEventListener("resize", updateColor.bind(this));
  });
  React.useEffect(() => {
    if (
      window.innerWidth < 993 &&
      document.documentElement.className.indexOf("nav-open") !== -1
    ) {
      document.documentElement.classList.toggle("nav-open");
      sidebarToggle.current.classList.toggle("toggled");
    }
  }, [location]);
  return (
    // add or remove classes depending if we are on full-screen-maps page or not
    <Navbar
      color={color}
      expand="lg"
      className={
        "navbar-absolute fixed-top " +
        (color === "transparent" ? "navbar-transparent " : "")
      }
    >
      <Container fluid>
        <div className="navbar-wrapper">
          <div className="navbar-toggle">
            <button
              type="button"
              ref={sidebarToggle}
              className="navbar-toggler"
              onClick={() => openSidebar()}
            >
              <span className="navbar-toggler-bar bar1" />
              <span className="navbar-toggler-bar bar2" />
              <span className="navbar-toggler-bar bar3" />
            </button>
          </div>
          <NavbarBrand href="/">
            <img
              src="https://club-of-developers.s3.ap-south-1.amazonaws.com/codeLogo.png"
              alt=""
              width="50px"
            />
          </NavbarBrand>
          <NavItem
            className="pr-3 font-weight-bold"
            style={{
              listStyle: "none",
              margin: "0",
              padding: "0",
              marginLeft: ".5rem",
              position: "relative",
              top: ".2rem",
            }}
          >
            MEMBER DASHBOARD
          </NavItem>
        </div>
        {/* <NavbarToggler onClick={toggle}>
          <span className="navbar-toggler-bar navbar-kebab" />
          <span className="navbar-toggler-bar navbar-kebab" />
          <span className="navbar-toggler-bar navbar-kebab" />
        </NavbarToggler> */}
        {/* <Collapse isOpen={isOpen} navbar className="justify-content-end">
          <Nav navbar>
            <NavItem className="pr-3">
              <Link to="#pablo">
                <HomeIcon style={{ color: "black" }} />
              </Link>
            </NavItem>
            <NavItem className="pr-3">
              <Link to="#pablo">
                <NotificationsIcon style={{ color: "black" }} />
              </Link>
            </NavItem>
            <NavItem className="pr-3">
              <Link to="#pablo">
                <PowerSettingsNewIcon style={{ color: "black" }} />
              </Link>
            </NavItem>
          </Nav>
        </Collapse> */}
      </Container>
    </Navbar>
  );
}

export default Header;
