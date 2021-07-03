import React, { useState, useEffect, lazy } from "react";
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Container,
} from "reactstrap";
import classnames from "classnames";
import axios from "axios";
const EventCard = lazy(() => import("../EventCard/EventCard"));
const EventCardLoading = lazy(() => import("../EventCard/EventCardLoader"));

const getQuery = (activePrimaryTab, activeSecTab) => {
  let query = "";
  if (activePrimaryTab == 2) query = "type=Webinar&";
  else if (activePrimaryTab == 3) query = "type=Coding&";
  if (activeSecTab == 2) query = query + "gt=" + new Date(Date.now());
  else if (activeSecTab == 3) query = query + "lt=" + new Date(Date.now());
  return query;
};
const SecondaryTab = ({ activeMainTab, mainTab }) => {
  const [activeTab, setActiveTab] = useState("1");
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true); //since initially events will be loaded from backend, that's why setting it to true so that EventCard component don't get rendered initially otherwise that will give an error, since tags will be undefined since events has no data and in EventCard component we've use tags.map(), EventCard gets rendered only after loading == false
  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };
  useEffect(() => {
    if (activeMainTab == mainTab) {
      setLoading(true);
      const query = getQuery(activeMainTab, activeTab);
      axios
        .get(`/api/events?${query}`)
        .then((res) => {
          console.log("setting events to :", res.data.events);
          setEvents(res.data.events);
          console.log("setting loading to false: ", false);
          setLoading(false);
        })
        .catch((err) => {
          // console.log(err);
        });
    }
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
            {loading && <LoadingPlaceholder />}
          </div>
        </TabPane>
        <TabPane tabId="2">
          <div className="event-cards-container">
            {!loading &&
              events.map((event) => <EventCard key={event._id} {...event} />)}
            {loading && <LoadingPlaceholder />}
          </div>
        </TabPane>
        <TabPane tabId="3">
          <div className="event-cards-container">
            {!loading &&
              events.map((event) => <EventCard key={event._id} {...event} />)}
            {loading && <LoadingPlaceholder />}
          </div>
        </TabPane>
      </TabContent>
    </Container>
  );
};
const LoadingPlaceholder = () => {
  return (
    <>
      <EventCardLoading />
      <EventCardLoading />
      <EventCardLoading />
    </>
  );
};
export default SecondaryTab;
