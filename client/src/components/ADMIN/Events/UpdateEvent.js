import "date-fns";
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { InfoContext } from "../../../state/Store";
import Loader from "../../Loader/Loader";
import {
  generateError,
  generateWarning,
  generateSuccess,
} from "../../../state/info/infoActions";
const UpdateEvent = (props) => {
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
  const [defaultTags, setDefaultTags] = useState([]);
  const [details, setDetails] = useState({});
  const bannerImgRef = React.createRef();
  const cardImgRef = React.createRef();
  const [bannerUrl, setBannerUrl] = useState("");
  const [cardImgUrl, setCardImgUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const setDefaultValues = (event) => {
    setEventName(event.name);
    setEventType(event.type);
    setEntryFee(event.entryFee);
    setStartsOn(new Date(event.startsOn));
    setEndsOn(new Date(event.endsOn));
    setDuration(event.duration);
    setVenue(event.venue);
    setDescription(event.shortDescription);
    setDefaultTags(event.tags);
    setDetails(JSON.parse(event.details));
    setBannerUrl(event.banner);
    setCardImgUrl(event.cardImg);
  }
  useEffect(() => {
    setLoading(true);
    axios
      .get(`/api/events/${props.match.params.id}`)
      .then((res) => {
        setLoading(false);
        setDefaultValues(res.data.event);
      })
      .catch((err) => {
        setLoading(false);
        if (err.response && err.response.status == 404)
          props.history.push("/error404");
      });
  }, []);
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
      .post("/put/admin/event", data)
      .then((res) => {
        setLoading(false);
        info.dispatch(generateSuccess("Event Updated Successfull!"));
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
    tags:defaultTags,
    bannerUrl,
    cardImgUrl
  };
  return (
    <>
      <UpdateEventsView
        ref={{ bannerImgRef, cardImgRef }}
        {...state}
        action="Update Event"
      />
      {loading && <Loader />}
    </>
  );
};

export default UpdateEvent;
