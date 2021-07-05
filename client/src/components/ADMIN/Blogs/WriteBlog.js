import React, { useState, useContext, useEffect, lazy } from "react";
import { InfoContext } from "../../../state/Store";
import {
  clearEverything,
  generateSuccess,
  generateError,
} from "../../../state/info/infoActions";
import "regenerator-runtime/runtime";
import { EditorState, convertToRaw } from "draft-js";
import blogRoutes from "./blogRoutes";
// import DashboardLayout from "../Dashboard/DashboardLayout";
// import Editor from "../../Editor/Editor";
// import Loader from "../../Loader/Loader";
// import Tags from "@yaireo/tagify/dist/react.tagify";
const DashboardLayout = lazy(() => import("../Dashboard/DashboardLayout"));
const Editor = lazy(() => import("../../Editor/Editor"));
const Loader = lazy(() => import("../../Loader/Loader"));
const Tags = lazy(() => import("@yaireo/tagify/dist/react.tagify"));
import {
  Card,
  CardBody,
  CardHeader,
  Form,
  FormGroup,
  Button,
  Col,
  Row,
} from "reactstrap";
import axios from "axios";
const WriteBlog = (props) => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState([]);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [loading, setLoading] = useState(false);
  const cardImgRef = React.createRef();
  const info = useContext(InfoContext);
  useEffect(() => {
    return () => info.dispatch(clearEverything());
  }, []);
  const handleTagChange = (values) => {
    let parsedValues = [];
    if (values) parsedValues = JSON.parse(values);
    parsedValues = parsedValues.map((tagObj) => tagObj.value);
    setTags(parsedValues);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !title ||
      !category ||
      !tags.length ||
      !cardImgRef.current ||
      !cardImgRef.current.files[0]
    )
      return info.dispatch(generateError("Please fill in all the fields"));
    const data = new FormData();
    data.append("title", title);
    data.append("category", category);
    data.append("tags", JSON.stringify(tags));
    data.append(
      "content",
      JSON.stringify(convertToRaw(editorState.getCurrentContent()))
    );
    data.append("cardImg", cardImgRef.current.files[0]);
    setLoading(true);
    axios
      .post("/post/admin/write-blog", data)
      .then((res) => {
        setLoading(false);
        info.dispatch(generateSuccess("Published Successfully!"));
      })
      .catch((err) => {
        setLoading(false);
        if (err.response && err.response.data)
          return info.dispatch(generateError(err.response.data.errorMsg));
        else return info.dispatch(generateError("Something went wrong!"));
      });
  };
  return (
    <DashboardLayout routes={blogRoutes}>
      <Card style={{ marginTop: "2rem" }}>
        <CardHeader>
          <h3>Publish Your Blog</h3>
        </CardHeader>
        <CardBody>
          <Form onSubmit={(e) => handleSubmit(e)}>
            <Row style={{ maxWidth: "100%", width: "100%", margin: 0 }}>
              <Col md="6">
                <FormGroup>
                  <label htmlFor="title" className="fontType">
                    Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    placeholder="Enter blog Title"
                    className="form-control"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </FormGroup>
              </Col>
              <Col md="6">
                <FormGroup>
                  <label htmlFor="category" className="fontType">
                    Category
                  </label>
                  <input
                    id="category"
                    className="form-control"
                    type="text"
                    placeholder="Enter category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row style={{ maxWidth: "100%", width: "100%", margin: 0 }}>
              <Col md="6">
                <FormGroup>
                  <label htmlFor="tags" className="fontType">
                    Tags
                  </label>
                  <Tags
                    id="tags"
                    placeholder="Enter tag and press enter"
                    className="form-control"
                    value={tags.join(", ")}
                    onChange={(e) => handleTagChange(e.detail.value)}
                  />
                </FormGroup>
              </Col>
              <Col md="6">
                <FormGroup>
                  <label htmlFor="card-img" className="fontType">
                    Card Image
                  </label>
                  <input
                    id="card-img"
                    className="form-control"
                    type="file"
                    ref={cardImgRef}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row style={{ maxWidth: "100%", width: "100%", margin: 0 }}>
              <Col>
                <Editor
                  editorState={editorState}
                  setEditorState={setEditorState}
                />
              </Col>
            </Row>
            <Row style={{ width: "100%", maxWidth: "100%", margin: 0 }}>
              <Col>
                <FormGroup>
                  <Button
                    color="warning"
                    style={{
                      background: "orange",
                      color: "white",
                      border: "none",
                      width: "fit-content",
                    }}
                    onClick={(e) => handleSubmit(e)}
                    className="form-control default-btn"
                  >
                    Publish
                  </Button>
                </FormGroup>
              </Col>
            </Row>
          </Form>
        </CardBody>
      </Card>
      {loading && <Loader />}
    </DashboardLayout>
  );
};
export default WriteBlog;
