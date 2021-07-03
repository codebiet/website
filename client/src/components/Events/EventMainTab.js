import React, { useState } from "react";
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
import classnames from "classnames";
import EventSecondaryTab from "./EventSecondaryTab";
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
            All Events
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === "2" })}
            onClick={() => {
              toggle("2");
            }}
          >
            Webinars
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === "3" })}
            onClick={() => {
              toggle("3");
            }}
          >
            Coding Events
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent className="event-primary-tab-content" activeTab={activeTab}>
        <TabPane tabId="1">
          <EventSecondaryTab activeMainTab={activeTab} mainTab="1" />
        </TabPane>
        <TabPane tabId="2">
          <EventSecondaryTab activeMainTab={activeTab} mainTab="2" />
        </TabPane>
        <TabPane tabId="3">
          <EventSecondaryTab activeMainTab={activeTab} mainTab="3" />
        </TabPane>
      </TabContent>
    </Container>
  );
};

export default MainTab;
