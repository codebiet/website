import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import "regenerator-runtime/runtime";
import DashboardLayout from "../Dashboard/DashboardLayout";
import Loader from "../../Loader/Loader";
import projectRoutes from "./projectRoutes";
import { InfoContext } from "../../../state/Store";
import {
  generateError,
  clearEverything,
  generateSuccess,
} from "../../../state/info/infoActions";
import {
  Card,
  CardBody,
  CardHeader,
  Form,
  FormGroup,
  Row,
  Col,
  Button,
} from "reactstrap";
import Tags from "@yaireo/tagify/dist/react.tagify";
function Adminform() {
  const [developerName, setDeveloperName] = useState("");
  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [repoUrl, setRepoUrl] = useState("");
  const [demoUrl, setDemoUrl] = useState("");
  const [documentationUrl, setDocumenationUrl] = useState("");
  const [stack, setStack] = useState("");
  const [tags, setTags] = useState([]);
  const img1Ref = React.createRef();
  const img2Ref = React.createRef();
  const img3Ref = React.createRef();
  const img4Ref = React.createRef();
  const [loading, setLoading] = useState(false);
  const info = useContext(InfoContext);
  function resetStates() {
    setDeveloperName("");
    setProjectName("");
    setDescription("");
    setRepoUrl("");
    setDemoUrl("");
    setTags([]);
    setDocumenationUrl("");
    setStack("");
  }
  useEffect(() => {
    () => info.dispatch(clearEverything());
  }, []);
  const handleTagChange = (values) => {
    let parsedValues = [];
    if (values) parsedValues = JSON.parse(values);
    parsedValues = parsedValues.map((tagObj) => tagObj.value);
    setTags(parsedValues);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    let user = {
      developer_name: developerName,
      project_name: projectName,
      description: description,
      repo_url: repoUrl,
      demo_url: demoUrl,
      documentation_url: documentationUrl,
      main_stack: stack,
    };

    const data = new FormData();
    //   for (let i = 0; i < selectedFiles.length; i++) {
    //     let imageFile = selectedFiles[i];
    //     const file = await imageCompression(imageFile, options);

    //     const uploadFileAsText = (file) => {
    //       return new Promise((resolve, reject) => {
    //         const reader = new FileReader();
    //         reader.readAsDataURL(file);
    //         reader.onloadend = async () => {
    //           resolve(reader.result);
    //         };
    //         reader.onerror = () => {
    //           reject();
    //         };
    //       });
    //     };

    //     let res = await uploadFileAsText(file);
    //     images.push(res);
    //   }
    // for (let i = 0; i < selectedFiles.length; i++) {
    //   data.append("images", selectedFiles[i]);
    // }
    if (img1Ref.current.files && img1Ref.current.files[0])
      data.append("images", img1Ref.current.files[0]);
    if (img2Ref.current.files && img2Ref.current.files[0])
      data.append("images", img2Ref.current.files[0]);
    if (img3Ref.current.files && img3Ref.current.files[0])
      data.append("images", img3Ref.current.files[0]);
    if (img4Ref.current.files && img4Ref.current.files[0])
      data.append("images", img4Ref.current.files[0]);
    data.append("tags", JSON.stringify(tags));
    for (const property in user) {
      data.append(property, user[property]);
    }
    try {
      setLoading(true);
      let result = await axios.post("/post/admin/addproject", data);
      resetStates();
      setLoading(false);
      info.dispatch(generateSuccess("Project Added Successfully!"));
    } catch (err) {
      setLoading(false);
      info.dispatch(generateError(err.errorMsg));
    }
  };

  return (
    <DashboardLayout routes={projectRoutes}>
      <Card>
        <CardHeader>
          <h1>Input Project Data</h1>
        </CardHeader>
        <CardBody>
          <div className="add-project-form-main">
            <Form onSubmit={handleSubmit} autoComplete="off">
              <Row style={{ width: "100%", margin: 0 }}>
                <Col md="6">
                  <FormGroup>
                    <label htmlFor="project-name">Project Name</label>
                    <input
                      id="project-name"
                      className="form-control"
                      name="name"
                      value={projectName}
                      onChange={(evt) => {
                        setProjectName(evt.target.value);
                      }}
                    />
                  </FormGroup>
                </Col>
                <Col md="6">
                  <FormGroup>
                    <label htmlFor="project-leader">Project Leader</label>
                    <input
                      id="project-leader"
                      className="form-control"
                      name="leader"
                      value={developerName}
                      onChange={(evt) => {
                        setDeveloperName(evt.target.value);
                      }}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row style={{ width: "100%", margin: 0 }}>
                <Col>
                  <FormGroup>
                    <label htmlFor="project-desc">Project Description</label>
                    <textarea
                      id="project-desc"
                      name="description"
                      className="form-control"
                      value={description}
                      onChange={(evt) => {
                        setDescription(evt.target.value);
                      }}
                    ></textarea>
                  </FormGroup>
                </Col>
              </Row>
              <Row style={{ width: "100%", margin: 0 }}>
                <Col md="6">
                  <FormGroup>
                    <label htmlFor="img1">Image - 1</label>
                    <input
                      id="fileInput"
                      type="file"
                      name="image"
                      ref={img1Ref}
                      className="form-control"
                    />
                  </FormGroup>
                </Col>
                <Col md="6">
                  <FormGroup>
                    <label htmlFor="img1">Image - 2</label>
                    <input
                      id="fileInput"
                      type="file"
                      name="image"
                      ref={img2Ref}
                      className="form-control"
                    />
                  </FormGroup>
                </Col>
                <Col md="6">
                  <FormGroup>
                    <label htmlFor="img1">Image - 3</label>
                    <input
                      id="fileInput"
                      type="file"
                      name="image"
                      ref={img3Ref}
                      className="form-control"
                    />
                  </FormGroup>
                </Col>
                <Col md="6">
                  <FormGroup>
                    <label htmlFor="img1">Image - 4</label>
                    <input
                      id="fileInput"
                      type="file"
                      name="image"
                      ref={img4Ref}
                      className="form-control"
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row style={{ width: "100%", margin: 0 }}>
                <Col md="6">
                  <FormGroup>
                    <label htmlFor="repo-link">Repository Link</label>
                    <input
                      id="repo-link"
                      name="github"
                      value={repoUrl}
                      onChange={(evt) => {
                        setRepoUrl(evt.target.value);
                      }}
                      className="form-control"
                    />
                  </FormGroup>
                </Col>
                <Col md="6">
                  <FormGroup>
                    <label htmlFor="demo-link">Demo Link</label>
                    <input
                      id="demo-link"
                      className="form-control"
                      name="demolink"
                      value={demoUrl}
                      onChange={(evt) => {
                        setDemoUrl(evt.target.value);
                      }}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row style={{ width: "100%", margin: 0 }}>
                <Col md="6">
                  <FormGroup>
                    <label htmlFor="docs">Documentation</label>
                    <input
                      id="docs"
                      className="form-control"
                      name="documentation"
                      value={documentationUrl}
                      onChange={(evt) => {
                        setDocumenationUrl(evt.target.value);
                      }}
                    />
                  </FormGroup>
                </Col>
                <Col md="6">
                  <FormGroup>
                    <label htmlFor="tech-stack">Tech Stack</label>
                    <input
                      id="tech-stack"
                      className="form-control"
                      name="tech"
                      value={stack}
                      onChange={(evt) => {
                        setStack(evt.target.value);
                      }}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row style={{ width: "100%", margin: 0 }}>
                <Col>
                  <FormGroup>
                    <label htmlFor="tags">Tags</label>
                    <Tags
                      id="tags"
                      placeholder="Enter tag and press enter"
                      className="form-control"
                      value={tags.join(", ")}
                      onChange={(e) => handleTagChange(e.detail.value)}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row style={{ width: "100%", margin: 0 }}>
                <Col>
                  <FormGroup>
                    <Button
                      color="warning"
                      className="default-btn"
                      type="submit"
                      onClick={handleSubmit}
                    >
                      Submit
                    </Button>
                  </FormGroup>
                </Col>
              </Row>
            </Form>
          </div>
        </CardBody>
      </Card>
      {loading && <Loader />}
    </DashboardLayout>
  );
}

export default Adminform;
