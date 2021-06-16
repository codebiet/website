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
  console.log(suggestions);
  const handleDelete = (id) => {
    axios
      .delete("/delete/blogs/suggestions/:id")
      .then((res) => {})
      .catch((err) => {
        console.log(err);
      });
  };
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
      <Container style={{ maxWidth: "100%", paddingTop: "2rem",display:"flex",justifyContent:"center" }}>
        {suggestions.map((suggestion) => (
          <SuggestionCard
            key={suggestion._id}
            suggestion={suggestion}
            handleDelete={handleDelete}
          />
        ))}
      </Container>
      <AddSuggestion setSuggestions={setSuggestions} />
    </DashboardLayout>
  );
};
export default Suggestions;
