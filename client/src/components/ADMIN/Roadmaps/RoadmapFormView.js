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
                    <option value="Front End Development">Front End Development</option>
                    <option value="Back End Development">Back End Development</option>
                    <option value="Database Development">Database Development</option>
                    <option value="Data Structures And Algorithm">Data Structures And Algorithm</option>
                    <option value="Programming Language">Programming Language</option>
                    <option value="Android Development">Android Development</option>
                    <option value="Machine Learning">Machine Learning</option>
                    <option value="Dev - Ops">Dev - Ops</option>
                    <option value="Cloud Technologies">Cloud Technologies</option>
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
