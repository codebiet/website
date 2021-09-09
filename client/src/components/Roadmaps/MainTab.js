import React, { useState } from "react";

import classnames from "classnames";
import "./MainTab.scss";
import HTMLCSSR from "../../../public/icons/HTML and CSS Roadmap.svg";

import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Card,
  Button,
  CardTitle,
  CardText,
  Row,
  Col,
  Container,
} from "reactstrap";
import Resource from "./Resource";

const MainTab = (props) => {
  const [activeTab, setActiveTab] = useState("1");
  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };
  return (
    <Container className="event-container-main">
      <Nav tabs className="event-primary-tab">
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === "1" })}
            onClick={() => {
              toggle("1");
            }}
          >
            <h6>Roadmap</h6>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === "2" })}
            onClick={() => {
              toggle("2");
            }}
          >
            <h6>Resources</h6>
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent className="event-primary-tab-content" activeTab={activeTab}>
        <TabPane tabId="1">
          <img
            className="roadmapimg"
            src={HTMLCSSR}
            alt="rdmp"
          ></img>
        </TabPane>
        <TabPane tabId="2">
          {/* pass props here */}
          <Resource />
          <Resource />
          <Resource />
        </TabPane>
      </TabContent>
    </Container>
  );
};

export default MainTab;
