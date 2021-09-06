import "date-fns";
import React, { useState, useContext, useEffect, lazy } from "react";
import axios from "axios";
import { InfoContext } from "../../../state/Store";
import {
  generateError,
  generateWarning,
  generateSuccess,
  clearEverything,
} from "../../../state/info/infoActions";
import { EditorState, convertToRaw } from "draft-js";
// import AddroadmapView from "./roadmapFormView";
import Loader from "../../Loader/Loader";
const AddRoadmapView = lazy(() => import("./RoadmapFormView"));
const AddRoadmap = (props) => {
  const info = useContext(InfoContext);
  const [roadmapTitle, setRoadmapTitle] = useState("");
  const [type, setType] = useState("");
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    return () => info.dispatch(clearEverything());
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    if (
      !roadmapTitle ||
      !type ||
      !JSON.stringify(convertToRaw(editorState.getCurrentContent()))
    )
      return info.dispatch(
        generateWarning(
          "All the fields are required. Please fill in the fields!"
        )
      );

    data.append("title", roadmapTitle);
    data.append("type", type);
    data.append(
      "roadmapDescription",
      JSON.stringify(convertToRaw(editorState.getCurrentContent()))
    );
    setLoading(true);

    let object = {};
    data.forEach(function (value, key) {
      object[key] = value;
    });

    axios
      .post("/post/admin/addRoadmap", { roadmap: object })
      .then((res) => {
        setLoading(false);
        info.dispatch(generateSuccess("roadmap Added Successfull!"));
      })
      .catch((err) => {
        setLoading(false);
        if (err.response && err.response.data)
          info.dispatch(generateError(err.response.data.errorMsg));
        else info.dispatch(generateError("Something went wrong!"));
      });
  };
  const state = {
    roadmapTitle,
    setRoadmapTitle,
    type,
    setType,
    handleSubmit,
    editorState,
    setEditorState,
  };
  return (
    <>
      <AddRoadmapView {...state} action="Add Roadmap" />
      {loading && <Loader />}
    </>
  );
};
export default AddRoadmap;
