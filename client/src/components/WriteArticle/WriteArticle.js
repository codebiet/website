import react, { useState, useEffect, useContext } from "react";
import Loader from "../Loader/Loader";
import { AuthContext } from "../../state/Store";
import Editor from "../Editor/Editor";
import draftjsToHtml from "draftjs-to-html";
import { Container } from "reactstrap";
import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
import { Redirect } from "react-router-dom";
import Nav from "../Navbar/Nav";
import Footer from "../Footer/Footer";
export default WriteArticle = (props) => {
  const auth = useContext(AuthContext);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  return (
    <>
      {auth.state.userLoggedIn && (
        <>
          <Nav />
          <Container>
            <Editor editorState={editorState} setEditorState={setEditorState} />
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
    </>
  );
};
