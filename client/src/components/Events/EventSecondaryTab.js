import React, { useState, useEffect } from "react";
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
import axios from "axios";
import EventCard from "../EventCard/EventCard";
import EventCardLoading from "../EventCard/EventCardLoader";

const getQuery = (activePrimaryTab, activeSecTab) => {
  let query = "";
  if (activePrimaryTab == 2) query = "type=Webinar&";
  else if (activePrimaryTab == 3) query = "type=Coding&";
  if (activeSecTab == 2)
    query = query + "gt=" + new Date(Date.now());
  else if (activeSecTab == 3) query = query + "lt=" + new Date(Date.now());
  return query;
};
const SecondaryTab = ({ activeMainTab }) => {
  const [activeTab, setActiveTab] = useState("1");
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };
  useEffect(() => {
    setLoading(true);
    const query = getQuery(activeMainTab, activeTab);
    axios
      .get(`/api/events?${query}`)
      .then((res) => {
        setLoading(false);
        setEvents(res.data.events);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [activeMainTab, activeTab]);
  return (
    <Container className="event-primary-tab-inner">
      <Nav tabs>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === "1" })}
            onClick={() => {
              toggle("1");
            }}
          >
            All
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === "2" })}
            onClick={() => {
              toggle("2");
            }}
          >
            Upcoming
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === "3" })}
            onClick={() => {
              toggle("3");
            }}
          >
            Previous
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
          <div className="event-cards-container">
            {!loading &&
              events.map((event) => <EventCard key={event._id} {...event} />)}
            {loading && (
              <>
                <EventCardLoading />
                <EventCardLoading />
                <EventCardLoading />
                <EventCardLoading />
              </>
            )}
          </div>
        </TabPane>
        <TabPane tabId="2">
          <div className="event-cards-container">
            {!loading &&
              events.map((event) => <EventCard key={event._id} {...event} />)}
            {loading && (
              <>
                <EventCardLoading />
                <EventCardLoading />
                <EventCardLoading />
                <EventCardLoading />
              </>
            )}
          </div>
        </TabPane>
        <TabPane tabId="3">
          <div className="event-cards-container">
            {!loading &&
              events.map((event) => <EventCard key={event._id} {...event} />)}
            {loading && (
              <>
                <EventCardLoading />
                <EventCardLoading />
                <EventCardLoading />
                <EventCardLoading />
              </>
            )}
          </div>
        </TabPane>
      </TabContent>
    </Container>
  );
};

export default SecondaryTab;
