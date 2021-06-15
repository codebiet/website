import React, { useContext, useEffect } from "react";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./Editor.scss";
import { Editor } from "react-draft-wysiwyg";
import { InfoContext } from "../../state/Store";
import { generateError, clearEverything } from "../../state/info/infoActions";
import axios from "axios";
const EditorComponent = ({ editorState, setEditorState }) => {
  const info = useContext(InfoContext);
  useEffect(() => {
    //clear alerts when component unmounts;
    return () => info.dispatch(clearEverything());
  }, []);
  const uploadFile = async (file) => {
    const data = new FormData();
    data.append("file", file);
    return new Promise((resolve, reject) => {
      axios
        .post("/post/uploadfile", data)
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          console.log(err);
          if (err.response && err.response.data)
            info.dispatch(generateError(err.response.data.errorMsg));
          else info.dispatch(generateError("Something went wrong!"));
          reject(err);
        });
    });
  };
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
        image: {
          uploadCallback: uploadFile,
          previewImage: true,
        },
      }}
      onEditorStateChange={(editorState) => setEditorState(editorState)}
    ></Editor>
  );
};

export default EditorComponent;
