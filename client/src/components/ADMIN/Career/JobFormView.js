import React, { lazy } from "react";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import careerRoutes from "./careerRoutes";
// import DashboardLayout from "../Dashboard/DashboardLayout";
// import EditorComponent from "../../Editor/Editor";
const Tags = lazy(() => import("@yaireo/tagify/dist/react.tagify"));
const DashboardLayout = lazy(() => import("../Dashboard/DashboardLayout"));
const EditorComponent = lazy(() => import("../../Editor/Editor"));
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
const JobFormView = ({
  jobTitle,
  setJobTitle,
  department,
  setDepartment,
  workType,
  setWorkType,
  remote,
  setRemote,
  applyBy,
  setApplyBy,
  duration,
  setDuration,
  stipend,
  setStipend,
  totalOpenings,
  setTotalOpenings,
  handleTagChange,
  handleSubmit,
  tags,
  editorState,
  setEditorState,
  ...props
}) => {
  return (
    <DashboardLayout routes={careerRoutes}>
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
                  <label htmlFor="jobTitle" className="fontType">
                    Job Title
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                    placeholder="Job Title"
                    id="jobTitle"
                  />
                </FormGroup>
              </Col>
              <Col md="4">
                <FormGroup>
                  <label htmlFor="department" className="fontType">
                    Department
                  </label>
                  <select
                    className="form-control"
                    type="text"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    id="department"
                  >
                    <option value="">Department</option>
                    <option value="Android">Android</option>
                    <option value="Blockchain">Blockchain</option>
                    <option value="Content Writing">Content Writing</option>
                    <option value="Cyber Security">Cyber Security</option>
                    <option value="IOT">IOT</option>
                    <option value="ML/AI">ML/AI</option>
                    <option value="Software Development">
                      Software Development
                    </option>
                    <option value="Web Development">Web Development</option>
                  </select>
                </FormGroup>
              </Col>

              <Col md="4">
                <FormGroup>
                  <label htmlFor="workType" className="fontType">
                    Work Type
                  </label>
                  <select
                    className="form-control"
                    type="text"
                    value={workType}
                    onChange={(e) => setWorkType(e.target.value)}
                    id="workType"
                  >
                    <option value="">Work Type</option>
                    <option value="Internship">Internship</option>
                    <option value="Full Time">Full Time</option>
                  </select>
                </FormGroup>
              </Col>
            </Row>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Row style={{ width: "100%", marginLeft: 0 }}>
                <Col md="4">
                  <FormGroup>
                    <label htmlFor="remote" className="fontType">
                      Work Place
                    </label>
                    <select
                      className="form-control"
                      type="text"
                      value={remote}
                      onChange={(e) => setRemote(e.target.value)}
                      id="remote"
                    >
                      <option value="">Work Place</option>
                      <option value="Office">Office</option>
                      <option value="Remote">Remote</option>
                    </select>
                  </FormGroup>
                </Col>

                <Col md="4">
                  <FormGroup>
                    <label htmlFor="applyBy" className="fontType">
                      Apply By
                    </label>
                    <KeyboardDatePicker
                      margin="0"
                      id="applyBy"
                      label=""
                      value={applyBy}
                      onChange={(date) => setApplyBy(date)}
                      format="dd/MM/yyyy"
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
                      placeholder="Duration"
                      id="duration"
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                    />
                  </FormGroup>
                </Col>
              </Row>

              <Row style={{ width: "100%", marginLeft: 0 }}>
                <Col md="4">
                  <FormGroup>
                    <label htmlFor="stipend" className="fontType">
                      Stipend
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Stipend"
                      id="stipend"
                      value={stipend}
                      onChange={(e) => setStipend(e.target.value)}
                    />
                  </FormGroup>
                </Col>

                <Col md="4">
                  <FormGroup>
                    <label htmlFor="totalOpenings" className="fontType">
                      Total Openings
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Total Openings"
                      id="totalOpenings"
                      value={totalOpenings}
                      onChange={(e) => setTotalOpenings(e.target.value)}
                    />
                  </FormGroup>
                </Col>

                <Col md="4">
                  <FormGroup>
                    <label htmlFor="skills" className="fontType">
                      Skills
                    </label>
                    <Tags
                      placeholder="Enter skill and press enter"
                      className="form-control"
                      value={tags.join(", ")}
                      onChange={(e) => handleTagChange(e.detail.value)}
                    />
                  </FormGroup>
                </Col>
              </Row>
            </MuiPickersUtilsProvider>

            <Row style={{ width: "100%", marginLeft: 0 }}>
              <Col md="12">
                <FormGroup>
                  <label htmlFor="jobDescription" className="fontType">
                    Job Description
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
                  <Button type="file" className="btn" id="add-event">
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
};
export default JobFormView;
