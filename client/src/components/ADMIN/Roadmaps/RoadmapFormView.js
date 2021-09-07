import React, { lazy } from "react";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import roadmapRoutes from "./roadmapRoutes";
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
const RoadmapFormView = React.forwardRef(
  (
    {
      roadmapTitle,
      setRoadmapTitle,
      type,
      setType,
      handleSubmit,
      editorState,
      setEditorState,
      ...props},
    {roadmapImgRef}
  ) => {
  return (
    <DashboardLayout routes={roadmapRoutes}>
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
                  <label htmlFor="roadmapTitle" className="fontType">
                    Roadmap Title
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    value={roadmapTitle}
                    onChange={(e) => setRoadmapTitle(e.target.value)}
                    placeholder="Roadmap Title"
                    id="roadmapTitle"
                  />
                </FormGroup>
              </Col>
              <Col md="4">
                <FormGroup>
                  <label htmlFor="type" className="fontType">
                    Type
                  </label>
                  <select
                    className="form-control"
                    type="text"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    id="type"
                  >
                    <option value="">Type</option>
                    <option value="Android">Android</option>
                    <option value="Blockchain">Blockchain</option>
                    <option value="Content Writing">Content Writing</option>
                    <option value="Graphics Designing">
                      Graphics Designing
                    </option>
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
                    <label className="fontType" htmlFor="roadmapImgFile">
                      Roadmap Image
                    </label>
                    <input
                      type="file"
                      className="form-control"
                      ref={roadmapImgRef}
                      id="roadmapImgFile"
                    />
                   
                  </FormGroup>
                </Col>
            </Row>
           
            <Row style={{ width: "100%", marginLeft: 0 }}>
              <Col md="12">
                <FormGroup>
                  <label htmlFor="roadmapDescription" className="fontType">
                    Roadmap Description
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
}
);
export default RoadmapFormView;
