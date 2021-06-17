import React, { useState, useEffect, useContext } from "react";
import { InfoContext } from "../../../state/Store";
import {
  generateError,
  generateSuccess,
  clearEverything,
} from "../../../state/info/infoActions";
import {
  Card,
  CardBody,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
} from "reactstrap";
import { Container } from "reactstrap";
import axios from "axios";
import DashboardLayout from "../Dashboard/DashboardLayout";
import blogRoutes from "./blogRoutes";
import AddSuggestion from "./AddSuggestion";
import SuggestionCard from "./SuggestionCard";
const typeFilters = [
  { title: "All", value: "All" },
  { title: "Suggested", value: "SUGGESTED" },
  { title: "By Admin", value: "ADMIN" },
  { title: "Picked", value: "PICKED" },
  { title: "Approved", value: "APPROVED" },
  { title: "Disapproved", value: "DISAPPROVED" },
  { title: "Drafted", value: "DRAFTED" },
];
const durationFilters = [
  { title: "All", value: "All" },
  { title: "Last Week", value: "Last Week" },
  { title: "Last Month", value: "Last Month" },
  { title: "Last 3 Months", value: "Last 3 Months" },
  { title: "Last 6 Months", value: "Last 6 Months" },
  { title: "Last Year", value: "Last Year" },
];
const getDurationQuery = (filter) => {
  if (filter == "All") return "";
  else if (filter == "Last Week")
    return (
      "gt=" +
      new Date(Date.now() - 1000 * 60 * 60 * 24 * 7) +
      "&lt=" +
      new Date(new Date(Date.now())) +
      "&"
    );
  else if (filter == "Last Month")
    return (
      "gt=" +
      new Date(Date.now() - 1000 * 60 * 60 * 24 * 30) +
      "&lt=" +
      new Date(new Date(Date.now())) +
      "&"
    );
  else if (filter == "Last 3 Months")
    return (
      "gt=" +
      new Date(Date.now() - 1000 * 60 * 60 * 24 * 30 * 3) +
      "&lt=" +
      new Date(new Date(Date.now())) +
      "&"
    );
  else if (filter == "Last 6 Months")
    return (
      "gt=" +
      new Date(Date.now() - 1000 * 60 * 60 * 24 * 30 * 6) +
      "&lt=" +
      new Date(new Date(Date.now())) +
      "&"
    );
  else if (filter == "Last 1 Year")
    return (
      "gt=" +
      new Date(Date.now() - 1000 * 60 * 60 * 24 * 30 * 12) +
      "&lt=" +
      new Date(new Date(Date.now())) +
      "&"
    );
  else return "";
};
const getTypeQuery = (filter) => {
  if (filter == "All") return "";
  else if (filter == "SUGGESTED")
    return "suggestedBy=USER&approvedSuggestion=false&disapprovedSuggestion=false";
  else if (filter == "ADMIN") return "suggestedBy=ADMIN";
  else if (filter == "PICKED") return "state=PICKED";
  else if (filter == "APPROVED")
    return "suggestedBy=USER&approvedSuggestion=true";
  else if (filter == "DISAPPROVED")
    return "suggestedBy=USER&disapprovedSuggestion=true";
  else if (filter == "DRAFTED") return "state=DRAFT";
  else return "";
};
const FilterComponent = ({
  filterName,
  availableFilters = ["All"],
  currentFilter,
  setCurrentFilter,
  setPage = () => "",
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const changeFilter = (newFilter) => {
    setPage(1);
    setCurrentFilter(newFilter);
  };
  return (
    <Card>
      <CardBody
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingBottom: "15px",
        }}
      >
        <h2 style={{ fontSize: "1.8rem", margin: 0, padding: 0 }}>
          {filterName}
        </h2>
        <Dropdown
          isOpen={dropdownOpen}
          toggle={() => setDropdownOpen((prev) => !prev)}
        >
          <DropdownToggle caret>{currentFilter}</DropdownToggle>
          <DropdownMenu right style={{ zIndex: "1200" }}>
            {availableFilters.map((filter) => {
              return (
                <DropdownItem
                  key={filter.value}
                  onClick={() => changeFilter(filter.value)}
                >
                  {filter.title}
                </DropdownItem>
              );
            })}
          </DropdownMenu>
        </Dropdown>
      </CardBody>
    </Card>
  );
};
const Suggestions = (props) => {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentTypeFilters, setCurrentTypeFilters] = useState("All");
  const [currentDurationFilters, setCurrentDurationFilters] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(12);
  const [totalItems, setTotalItems] = useState(11);
  const queryString = () => {
    return (
      getDurationQuery(currentDurationFilters) +
      getTypeQuery(currentTypeFilters)
    );
  };
  useEffect(() => {
    setLoading(true);
    axios
      .get("/api/blogs/suggestions?" + queryString())
      .then((res) => {
        setLoading(false);
        setSuggestions(res.data.suggestions);
        setTotalItems(res.data.totalItems);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [currentPage, currentDurationFilters, currentTypeFilters]);
  return (
    <DashboardLayout routes={blogRoutes}>
      <FilterComponent
        filterName="Type"
        setPage={setCurrentPage}
        availableFilters={typeFilters}
        currentFilter={currentTypeFilters}
        setCurrentFilter={setCurrentTypeFilters}
      />
      <FilterComponent
        filterName="Duration"
        setPage={setCurrentPage}
        availableFilters={durationFilters}
        currentFilter={currentDurationFilters}
        setCurrentFilter={setCurrentDurationFilters}
      />
      <Container
        style={{
          maxWidth: "100%",
          paddingTop: "2rem",
          display: "flex",
          justifyContent: "flex-start",
          flexWrap: "wrap",
        }}
      >
        {!loading &&
          suggestions.map((suggestion) => (
            <SuggestionCard
              key={suggestion._id}
              suggestion={suggestion}
              setSuggestions={setSuggestions}
              queryString={queryString}
              setLoading={setLoading}
            />
          ))}
        {/* suggestion cards are used as loader placeholder cards during loading */}
        {loading && (
          <>
            <SuggestionCard />
            <SuggestionCard />
            <SuggestionCard />
            <SuggestionCard />
            <SuggestionCard />
            <SuggestionCard />
          </>
        )}
      </Container>
      <AddSuggestion
        setSuggestions={setSuggestions}
        queryString={queryString}
      />
    </DashboardLayout>
  );
};
export default Suggestions;
