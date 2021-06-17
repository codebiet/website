import React, { useState, useEffect, useContext } from "react";
import { InfoContext } from "../../../state/Store";
import {
  generateError,
  generateSuccess,
  clearEverything,
} from "../../../state/info/infoActions";
import { Container } from "reactstrap";
import axios from "axios";
import DashboardLayout from "../Dashboard/DashboardLayout";
import blogRoutes from "./blogRoutes";
import AddSuggestion from "./AddSuggestion";
import SuggestionCard from "./SuggestionCard";
const Suggestions = (props) => {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({});
  const queryString = () => {
    let query = "";
    if(filters.state) query = 'state='+filters.state+"&";
    if(filters.approvedSuggestion) query = query+'approvedSuggestion='+filters.approvedSuggestion;
    return query;
  }
  useEffect(() => {
    setLoading(true);
    axios
      .get("/api/blogs/suggestions")
      .then((res) => {
        setLoading(false);
        setSuggestions(res.data.suggestions);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <DashboardLayout routes={blogRoutes}>
      <Container
        style={{
          maxWidth: "100%",
          paddingTop: "2rem",
          display: "flex",
          justifyContent: "center",
          flexWrap:"wrap"
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
      <AddSuggestion setSuggestions={setSuggestions} queryString={queryString} />
    </DashboardLayout>
  );
};
export default Suggestions;
