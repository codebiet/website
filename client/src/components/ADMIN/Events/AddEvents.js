import "date-fns";
import React, { useState } from "react";
import DashboardLayout from "../Dashboard/DashboardLayout";
import eventRoutes from "./eventRoutes";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import Tags from "@yaireo/tagify/dist/react.tagify";
import "@yaireo/tagify/dist/tagify.css";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  FormGroup,
  Row,
  Col,
  Form,
} from "reactstrap";
import EditorComponent from "../../Editor/Editor";
import axios from "axios";
const AddEvents = (props) => {
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
    console.log(startsOn, new Date(startsOn));
    data.append("bannerImg", bannerImgRef.current.files[0]);
    data.append("cardImg", cardImgRef.current.files[0]);
    data.append("name", eventName);
    data.append("type", eventType);
    data.append("entryFee", entryFee);
    data.append("starsOn", startsOn);
    data.append("endsOn", endsOn);
    data.append("duration", duration);
    data.append("venue", venue);
    data.append("shortDescription", description);
    data.append("tags", JSON.stringify(tags));
    data.append("details", JSON.stringify(details));
    axios
      .post("/post/admin/addEvent", data)
      .then((res) => {})
      .catch((err) => {});
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
  };
  return <AddEventsView ref={{ bannerImgRef, cardImgRef }} {...state} />;
};
const AddEventsView = React.forwardRef(
  (
    {
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
    },
    { bannerImgRef, cardImgRef }
  ) => {
    return (
      <DashboardLayout routes={eventRoutes}>
        <Card className="add-events-card">
          <CardHeader>
            <CardTitle>
              <h5>Add Event</h5>
            </CardTitle>
          </CardHeader>
          <CardBody>
            <Form onSubmit={handleSubmit} autoComplete="off">
              <Row style={{ width: "100%", marginLeft: 0 }}>
                <Col md="4">
                  <FormGroup>
                    <label htmlFor="eventName" className="fontType">
                      Event Name
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      value={eventName}
                      onChange={(e) => setEventName(e.target.value)}
                      placeholder="Event Name"
                      id="eventName"
                    />
                  </FormGroup>
                </Col>
                <Col md="4">
                  <FormGroup>
                    <label htmlFor="eventType" className="fontType">
                      Event Type
                    </label>
                    <select
                      className="form-control"
                      type="text"
                      value={eventType}
                      onChange={(e) => setEventType(e.target.value)}
                      id="eventType"
                    >
                      <option value="">Type</option>
                      <option value="Coding">Coding</option>
                      <option value="Webinar">Webinar</option>
                    </select>
                  </FormGroup>
                </Col>
                <Col md="4">
                  <FormGroup>
                    <label htmlFor="entryFee" className="fontType">
                      Entry Fee
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      value={entryFee}
                      onChange={(e) => setEntryFee(e.target.value)}
                      placeholder="Entry Fee"
                      id="entryFee"
                    />
                  </FormGroup>
                </Col>
              </Row>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Row style={{ width: "100%", marginLeft: 0 }}>
                  <Col md="4">
                    <FormGroup>
                      <label htmlFor="startingDate" className="fontType">
                        Starting Date
                      </label>
                      <KeyboardDatePicker
                        margin="0"
                        id="startingDate"
                        label=""
                        format="dd/MM/yyyy"
                        value={startsOn}
                        onChange={(date) => setStartsOn(date)}
                        className="form-control"
                      />
                    </FormGroup>
                  </Col>
                  <Col md="4">
                    <FormGroup>
                      <label htmlFor="startingTime" className="fontType">
                        Starting Time
                      </label>
                      <KeyboardTimePicker
                        margin="0"
                        id="startingTime"
                        label=""
                        value={startsOn}
                        onChange={(time) => setStartsOn(time)}
                        className="form-control"
                      />
                    </FormGroup>
                  </Col>
                  <Col md="4">
                    <FormGroup>
                      <label htmlFor="duration" className="fontType">
                        Duration
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                        placeholder="Duration(2 Days / 2 Hours)"
                        id="duration"
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row style={{ width: "100%", marginLeft: 0 }}>
                  <Col md="4">
                    <FormGroup>
                      <label htmlFor="endingDate" className="fontType">
                        Ending Date
                      </label>
                      <KeyboardDatePicker
                        margin="0"
                        id="endingDate"
                        label=""
                        format="dd/MM/yyyy"
                        value={endsOn}
                        onChange={(date) => setEndsOn(date)}
                        className="form-control"
                      />
                    </FormGroup>
                  </Col>
                  <Col md="4">
                    <FormGroup>
                      <label htmlFor="endingTime" className="fontType">
                        Ending Time
                      </label>
                      <KeyboardTimePicker
                        margin="0"
                        id="endingTime"
                        label=""
                        value={endsOn}
                        onChange={(time) => setEndsOn(time)}
                        className="form-control"
                      />
                    </FormGroup>
                  </Col>
                  <Col md="4">
                    <FormGroup>
                      <label htmlFor="venue" className="fontType">
                        Venue
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        value={venue}
                        onChange={(e) => setVenue(e.target.value)}
                        placeholder="venue"
                        id="venue"
                      />
                    </FormGroup>
                  </Col>
                </Row>
              </MuiPickersUtilsProvider>
              <Row style={{ width: "100%", marginLeft: 0 }}>
                <Col md="12">
                  <FormGroup>
                    <label htmlFor="shortDescription" className="fontType">
                      Short Description
                    </label>
                    <textarea
                      className="form-control"
                      type="text"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Write a short description for the event"
                      id="shortDescription"
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row style={{ width: "100%", marginLeft: 0 }}>
                <Col md="12">
                  <FormGroup>
                    <label htmlFor="tags" className="fontType">
                      Tags
                    </label>
                    <Tags
                      placeholder="Enter tag and press enter"
                      className="form-control"
                      onChange={(e) => handleTagChange(e.detail.value)}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row style={{ width: "100%", marginLeft: 0 }}>
                <Col md="12">
                  <FormGroup>
                    <label htmlFor="details" className="fontType">
                      Details
                    </label>
                    <EditorComponent
                      content={details}
                      setContent={setDetails}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row style={{ width: "100%", marginLeft: 0 }}>
                <Col md="6">
                  <FormGroup>
                    <label className="fontType" htmlFor="bannerImgFile">
                      Banner Image
                    </label>
                    <input
                      type="file"
                      className="form-control"
                      ref={bannerImgRef}
                      id="bannerImgFile"
                    />
                  </FormGroup>
                </Col>
                <Col md="6">
                  <FormGroup>
                    <label className="fontType" htmlFor="cardImgFile">
                      Card Image
                    </label>
                    <input
                      type="file"
                      className="form-control"
                      ref={cardImgRef}
                      id="cardImgFile"
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row style={{ width: "100%", marginLeft: 0 }}>
                <Col md="6">
                  <FormGroup>
                    <Button type="file" className="btn" id="add-event">
                      Add Event
                    </Button>
                  </FormGroup>
                </Col>
              </Row>
            </Form>
          </CardBody>
        </Card>
      </DashboardLayout>
    );
  }
);
export default AddEvents;
