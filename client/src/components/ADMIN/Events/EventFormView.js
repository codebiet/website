import React, { lazy } from "react";
import eventRoutes from "./eventRoutes";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
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
// import Tags from "@yaireo/tagify/dist/react.tagify";
// import DashboardLayout from "../Dashboard/DashboardLayout";
// import EditorComponent from "../../Editor/Editor";
import "@yaireo/tagify/dist/tagify.css";
const DashboardLayout = lazy(() => import("../Dashboard/DashboardLayout"));
const Tags = lazy(() => import("@yaireo/tagify/dist/react.tagify"));
const EditorComponent = lazy(() => import("../../Editor/Editor"));
const EventFormView = React.forwardRef(
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
      handleTagChange,
      handleSubmit,
      tags,
      bannerUrl,
      cardImgUrl,
      editorState,
      setEditorState,
      ...props
    },
    { bannerImgRef, cardImgRef }
  ) => {
    return (
      <DashboardLayout routes={eventRoutes}>
        <Card className="add-events-card">
          <CardHeader>
            <CardTitle>
              <h5>{props.action}</h5>
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
                      value={tags.join(", ")}
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
                      editorState={editorState}
                      setEditorState={setEditorState}
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
                    {bannerUrl && (
                      <a
                        href={bannerUrl}
                        target="_blank"
                        style={{ color: "cornflowerblue" }}
                      >
                        Banner
                      </a>
                    )}
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
                    {cardImgUrl && (
                      <a
                        href={cardImgUrl}
                        target="_blank"
                        style={{ color: "cornflowerblue" }}
                      >
                        Card Image
                      </a>
                    )}
                  </FormGroup>
                </Col>
              </Row>
              <Row style={{ width: "100%", marginLeft: 0 }}>
                <Col md="6">
                  <FormGroup>
                    <Button className="btn default-btn" id="add-event">
                      {props.action}
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
export default EventFormView;
