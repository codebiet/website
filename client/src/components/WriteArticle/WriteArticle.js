import React, { useState, useEffect, useContext } from "react";
import Loader from "../Loader/Loader";
import { AuthContext } from "../../state/Store";
import Editor from "../Editor/Editor";
import { Container, Button } from "reactstrap";
import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
import { Redirect } from "react-router-dom";
import Nav from "../Navbar/Nav";
import Footer from "../Footer/Footer";
import axios from "axios";
export default (props) => {
  const auth = useContext(AuthContext);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [blog, setBlog] = useState({});
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `/api/blogs/${props.match.params.id}?writing=true&pickedBy=${auth.state.userId}`
      )
      .then((res) => {
        setLoading(false);
        if (res.data.blogs.length == 0)
          return props.history.push("/page-not-found");
        setBlog(res.data.blogs[0]);
        if (res.data.blogs.length > 0 && res.data.blogs[0].content)
          setEditorState(
            EditorState.createWithContent(
              convertFromRaw(JSON.parse(res.data.blogs[0].content))
            )
          );
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const getContent = () => {
    const data = new FormData();
    data.append(
      "content",
      JSON.stringify(convertToRaw(editorState.getCurrentContent()))
    );
    return data;
  };
  const submitForReview = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .patch(
        `/patch/blogs/${props.match.params.id}/submitForReview`,
        getContent()
      )
      .then((res) => {
        setLoading(false);
        props.history.push("/articles");
      })
      .catch((err) => {});
  };
  const saveAsDraft = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .patch(`/patch/blogs/${props.match.params.id}/saveAsDraft`, getContent())
      .then((res) => {
        setLoading(false);
      })
      .catch((err) => {});
  };
  return (
    <>
      {auth.state.userLoggedIn && (
        <>
          <Nav />
          <Container
            style={{ margin: "4rem auto" }}
            className="write-article-container"
          >
            <h2 className={loading ? "loading" : ""}>
              {!loading && blog.title}
            </h2>
            <Editor editorState={editorState} setEditorState={setEditorState} />
            <div className="button-container">
              <Button onClick={(e) => submitForReview(e)} className="default-btn">
                Submit for Review
              </Button>
              <Button onClick={(e) => saveAsDraft(e)}>Save As Draft</Button>
            </div>
          </Container>
          <Footer />
        </>
      )}
      {!auth.state.userLoggedIn && (
        <Redirect
          to={{
            pathname: "/login",
            state: { from: `/blogs/${props.match.params.id}/write-article` },
          }}
        />
      )}
      {loading && <Loader />}
    </>
  );
};
