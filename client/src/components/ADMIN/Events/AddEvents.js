import "date-fns";
import React, { useState, useContext, useEffect } from "react";
import AddEventsView from "./EventFormView";
import axios from "axios";
import { InfoContext } from "../../../state/Store";
import Loader from "../../Loader/Loader";
import {
  generateError,
  generateWarning,
  generateSuccess,
  clearEverything
} from "../../../state/info/infoActions";
import { EditorState, convertToRaw } from "draft-js";
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
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const bannerImgRef = React.createRef();
  const cardImgRef = React.createRef();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    return () => info.dispatch(clearEverything());
  },[])
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
      !JSON.stringify(convertToRaw(editorState.getCurrentContent()))
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
    data.append("details", JSON.stringify(convertToRaw(editorState.getCurrentContent())));
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
          info.dispatch(generateError(err.response.data.errorMsg));
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
    handleTagChange,
    handleSubmit,
    tags: [], //since no default tags
    editorState,
    setEditorState,
  };
  return (
    <>
      <AddEventsView
        ref={{ bannerImgRef, cardImgRef }}
        {...state}
        action="Add Event"
      />
      {loading && <Loader />}
    </>
  );
};
export default AddEvents;
