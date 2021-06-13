import "date-fns";
import React, { useState, useContext } from "react";
import AddEventsView from "./EventFormView";
import axios from "axios";
import { InfoContext } from "../../../state/Store";
import Loader from "../../Loader/Loader";
import {
  generateError,
  generateWarning,
  generateSuccess,
} from "../../../state/info/infoActions";
const AddEvents = (props) => {
  const info = useContext(InfoContext);
  const [eventName, setEventName] = useState("");
  const [eventType, setEventType] = useState("");
  const [entryFee, setEntryFee] = useState("Free");
  const [startsOn, setStartsOn] = useState(new Date(Date.now()));
  const [endsOn, setEndsOn] = useState(new Date(Date.now()));
  const [duration, setDuration] = useState("");
  const [venue, setVenue] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState([]);
  const [details, setDetails] = useState({});
  const bannerImgRef = React.createRef();
  const cardImgRef = React.createRef();
  const [loading, setLoading] = useState(false);
  const handleTagChange = (values) => {
    let parsedValues = [];
    if (values) parsedValues = JSON.parse(values);
    parsedValues = parsedValues.map((tagObj) => tagObj.value);
    console.log(parsedValues);
    setTags(parsedValues);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    if (
      !eventName ||
      !eventType ||
      !entryFee ||
      !startsOn ||
      !endsOn ||
      !duration ||
      !venue ||
      !description ||
      !JSON.stringify(details)
    )
      return info.dispatch(
        generateWarning(
          "All the fields are required. Please fill in the fields!"
        )
      );
    if (!bannerImgRef.current.files[0]) {
      return info.dispatch(
        generateWarning("Banner is required to be uploaded!")
      );
    }
    if (!cardImgRef.current.files[0]) {
      return info.dispatch(
        generateWarning("Card Image is required to be uploaded!")
      );
    }
    data.append("banner", bannerImgRef.current.files[0]);
    data.append("cardImg", cardImgRef.current.files[0]);
    data.append("name", eventName);
    data.append("type", eventType);
    data.append("entryFee", entryFee);
    data.append("startsOn", startsOn);
    data.append("endsOn", endsOn);
    data.append("duration", duration);
    data.append("venue", venue);
    data.append("shortDescription", description);
    data.append("tags", JSON.stringify(tags));
    data.append("details", JSON.stringify(details));
    setLoading(true);
    axios
      .post("/post/admin/addEvent", data)
      .then((res) => {
        setLoading(false);
        info.dispatch(generateSuccess("Event Added Successfull!"));
      })
      .catch((err) => {
        setLoading(false);
        if (err.response && err.response.data)
          info.dispatch(generateError(err.response.data));
        else info.dispatch(generateError("Something went wrong!"));
      });
  };
  const state = {
    eventName,
    setEventName,
    eventType,
    setEventType,
    entryFee,
    setEntryFee,
    startsOn,
    setStartsOn,
    endsOn,
    setEndsOn,
    duration,
    setDuration,
    venue,
    setVenue,
    description,
    setDescription,
    details,
    setDetails,
    handleTagChange,
    handleSubmit,
    tags:[]//since no default tags
  };
  return (
    <>
      <AddEventsView ref={{ bannerImgRef, cardImgRef }} {...state} action="Add Event" />
      {loading && <Loader />}
    </>
  );
};
export default AddEvents;
