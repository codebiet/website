import React from "react";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./Editor.scss";
import { Editor } from "react-draft-wysiwyg";
const EditorComponent = ({ editorState, setEditorState }) => {
  return (
    <Editor
      editorState={editorState}
      wrapperClassName="editor-wrapper"
      editorClassName="editor"
      toolbarClassName="editor-toolbar"
      toolbar={{
        fontFamily: {
          options: [
            "Poppins",
            "Nunito",
            "Georgia",
            "Times New Roman",
            "Verdana",
          ],
        },
      }}
      onEditorStateChange={(editorState) => setEditorState(editorState)}
    ></Editor>
  );
};

export default EditorComponent;
