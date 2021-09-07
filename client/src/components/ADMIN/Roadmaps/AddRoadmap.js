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
  const roadmapImgRef = React.createRef();
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    return () => info.dispatch(clearEverything());
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(type);
    console.log(roadmapTitle);
    // console.log(roadmapTitle);
    // console.log(roadmapTitle);
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
    if (!roadmapImgRef.current.files[0]) {
        return info.dispatch(
          generateWarning("Roadmap Image is required to be uploaded!")
        );
    }
    data.append("roadmapTitle", roadmapTitle);
    data.append("type", type);
    data.append(
      "roadmapDescription",
      JSON.stringify(convertToRaw(editorState.getCurrentContent()))
    );
    data.append("roadmapImg", roadmapImgRef.current.files[0]);
    setLoading(true);

    axios
      .post("/post/admin/addRoadmap", data)
      .then((res) => {
        setLoading(false);
        info.dispatch(generateSuccess("Roadmap Added Successfull!"));
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
      <AddRoadmapView 
      ref={{ roadmapImgRef}}
      {...state} 
      action="Add Roadmap" />
      {loading && <Loader />}
    </>
  );
};
export default AddRoadmap;
