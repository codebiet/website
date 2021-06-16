import React, { useState, useEffect, useContext } from "react";
import { InfoContext } from "../../../state/Store";
import {
  generateError,
  generateSuccess,
  clearEverything,
} from "../../../state/info/infoActions";
import axios from "axios";
const Suggestions = (props) => {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
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
};
export default Suggestions;
