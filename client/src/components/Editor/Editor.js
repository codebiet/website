import React, { useState } from "react";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./Editor.scss";
import { Editor } from "react-draft-wysiwyg";
const EditorComponent = ({ content, setContent }) => {
  return (
    <Editor
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
      onContentStateChange={(contentState) => setContent(contentState)}
    ></Editor>
  );
};

export default EditorComponent;
