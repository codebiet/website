import React, { useEffect, useState, useContext } from "react";
import eventRoutes from "./eventRoutes";
import DashboardLayout from "../Dashboard/DashboardLayout";
import { Link } from "react-router-dom";
import axios from "axios";
import ContentLoaderSvg from "../../EventCard/EventCardLoader";
import {
  Row,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Card,
  CardBody,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import EventCard from "../../EventCard/EventCard";
import {
  DeleteForeverRounded,
  EditTwoTone,
  PeopleAltTwoTone,
} from "@material-ui/icons";
import { InfoContext } from "../../../state/Store";
import {
  generateSuccess,
  generateError,
} from "../../../state/info/infoActions";
import Pagination from "../../Pagination/Pagination";
const ConfirmDeletion = ({ modalOpen, setModalOpen, handleDelete, id }) => {
  const toggle = () => {
    setModalOpen((prev) => !prev);
  };
  return (
    <Modal isOpen={modalOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Confirm</ModalHeader>
      <ModalBody>
        The event will be deleted permanently and can't be restored later. Are
        you sure you want to delete?
      </ModalBody>
      <ModalFooter>
        <Button color="warning" onClick={() => handleDelete(id)}>
          Delete
        </Button>
        <Button color="secondary" onClick={toggle}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};
const FilterComponent = ({ filter, setFilter }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  return (
    <Card >
      <CardBody
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingBottom: "15px",
        }}
      >
        <h2 style={{ fontSize: "1.8rem", margin: 0, padding: 0 }}>Filters</h2>
        <Dropdown
          isOpen={dropdownOpen}
          toggle={() => setDropdownOpen((prev) => !prev)}
        >
          <DropdownToggle caret>{filter}</DropdownToggle>
          <DropdownMenu right style={{zIndex:"1200"}}>
            <DropdownItem onClick={() => setFilter("All")}>All</DropdownItem>
            <DropdownItem onClick={() => setFilter("Upcoming")}>
              Upcoming
            </DropdownItem>
            <DropdownItem onClick={() => setFilter("Last Week")}>
              Last Week
            </DropdownItem>
            <DropdownItem onClick={() => setFilter("Last Month")}>
              Last Month
            </DropdownItem>
            <DropdownItem onClick={() => setFilter("Last 3 Months")}>
              Last 3 Months
            </DropdownItem>
            <DropdownItem onClick={() => setFilter("Last 6 Months")}>
              Last 6 Months
            </DropdownItem>
            <DropdownItem onClick={() => setFilter("Last 1 Year")}>
              Last 1 Year
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </CardBody>
    </Card>
  );
};
const getFilters = (filter) => {
  if(filter == "All") return '';
  else if(filter == "Upcoming") return 'gt='+new Date();
  else if(filter == "Last Week") return 'gt='+new Date(Date.now() - 1000*60*60*24*7)+"&lt="+new Date();
  else if(filter == "Last Month") return 'gt='+new Date(Date.now() - 1000*60*60*24*30)+"&lt="+new Date();
  else if(filter == "Last 3 Months") return 'gt='+new Date(Date.now() - 1000*60*60*24*30*3)+"&lt="+new Date();
  else if(filter == "Last 6 Months") return 'gt='+new Date(Date.now() - 1000*60*60*24*30*6)+"&lt="+new Date();
  else if(filter == "Last 1 Year") return 'gt='+new Date(Date.now() - 1000*60*60*24*30*12)+"&lt="+new Date();
}
const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deleteConfirmationModalOpen, setDeleteCofirmationModalOpen] =
    useState(false);
  const info = useContext(InfoContext);
  //managing pagination -- start
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(6);
  const [limit, setLimit] = useState(6);
  //managing pagination -- end
  //filters
  const [filter, setFilter] = useState("All");
  useEffect(() => {
    setLoading(true);
    //scroll to top when mounted;
    const queryString = getFilters(filter);
    console.log(queryString);
    window.scrollTo(0, 0);
    axios
      .get(`/api/events/?limit=${limit}&page=${currentPage - 1}&${queryString}`)
      .then((res) => {
        setLoading(false);
        setTotalItems(res.data.totalItems);
        setEvents(res.data.events);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [currentPage,filter]);

  const handleDelete = (id) => {
    setDeleteCofirmationModalOpen(false);
    setLoading(true);
    axios
      .delete(`/delete/event/${id}`)
      .then((res) => {
        console.log(res.data.events);
        setLoading(false);
        setEvents(res.data.events);
        info.dispatch(generateSuccess("Delete Successfully!"));
      })
      .catch((err) => {
        setLoading(false);
        if (err.response.data) {
          info.dispatch(generateError(err.response.data));
        } else {
          info.dispatch(generateError("Something went wrong!"));
        }
      });
  };
  const handlePageChange = (page) => {
    console.log(page);
    setCurrentPage(page);
  };
  return (
    <DashboardLayout routes={eventRoutes}>
      <FilterComponent filter={filter} setFilter={setFilter} />
      <Row style={{ width: "100%", margin: "0" }}>
        <Col style={{ display: "flex", flexWrap: "wrap" }}>
          {!loading &&
            events.map((event) => {
              return (
                <div className="event-card-container">
                  <EventCard key={event._id} {...event} />
                  <div className="update-remove-button-container">
                    <Link to={`/admin/events/${event._id}/registrations`}>
                      <button>
                        <PeopleAltTwoTone />
                      </button>
                    </Link>
                    <Link to={"/admin/events/update/" + event._id}>
                      <button>
                        <EditTwoTone />
                      </button>
                    </Link>
                    <button
                      className="remove-button"
                      onClick={() =>
                        setDeleteCofirmationModalOpen((prev) => !prev)
                      }
                    >
                      <DeleteForeverRounded />
                    </button>
                    <ConfirmDeletion
                      modalOpen={deleteConfirmationModalOpen}
                      setModalOpen={setDeleteCofirmationModalOpen}
                      handleDelete={handleDelete}
                      id={event._id}
                    />
                  </div>
                </div>
              );
            })}
          {loading && (
            <>
              <div className="event-card-container">
                <ContentLoaderSvg />
              </div>
              <div className="event-card-container">
                <ContentLoaderSvg />
              </div>
              <div className="event-card-container">
                <ContentLoaderSvg />
              </div>
              <div className="event-card-container">
                <ContentLoaderSvg />
              </div>
              <div className="event-card-container">
                <ContentLoaderSvg />
              </div>
              <div className="event-card-container">
                <ContentLoaderSvg />
              </div>
            </>
          )}
        </Col>
      </Row>
      {totalItems > limit && (
        <Pagination
          totalItems={totalItems}
          pageSize={limit}
          handlePageChange={handlePageChange}
        />
      )}
    </DashboardLayout>
  );
};
export default Events;
