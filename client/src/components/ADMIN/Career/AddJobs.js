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
// import AddJobView from "./JobFormView";
import Loader from "../../Loader/Loader";
const AddJobView = lazy(() => import("./JobFormView"));
const AddJobs = (props) => {
  const info = useContext(InfoContext);
  const [jobTitle, setJobTitle] = useState("");
  const [department, setDepartment] = useState("");
  const [workType, setWorkType] = useState("");
  const [remote, setRemote] = useState("");
  const [applyBy, setApplyBy] = useState(new Date(Date.now()));
  const [duration, setDuration] = useState("");
  const [stipend, setStipend] = useState("");
  const [totalOpenings, setTotalOpenings] = useState("");
  const [tags, setTags] = useState([]);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    return () => info.dispatch(clearEverything());
  }, []);

  const handleTagChange = (values) => {
    let parsedValues = [];
    if (values) parsedValues = JSON.parse(values);
    parsedValues = parsedValues.map((tagObj) => tagObj.value);
    console.log(parsedValues);
    setTags(parsedValues);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    if (
      !jobTitle ||
      !department ||
      !workType ||
      !remote ||
      !applyBy ||
      !totalOpenings ||
      !JSON.stringify(convertToRaw(editorState.getCurrentContent()))
    )
      return info.dispatch(
        generateWarning(
          "All the fields are required. Please fill in the fields!"
        )
      );

    if (
      totalOpenings &&
      (!parseInt(totalOpenings) || parseInt(totalOpenings) <= 0)
    ) {
      return info.dispatch(
        generateWarning("Total Openings should be integer greater than 0")
      );
    }

    if (!stipend || isNaN(stipend)) {
      stipend = 0;
    }

    data.append("title", jobTitle);
    data.append("department", department);
    data.append("workType", workType);
    data.append("remote", remote === "Remote");
    data.append("duration", duration);
    data.append("stipend", parseInt(stipend));
    data.append("applyBy", applyBy);
    data.append("totalOpening", parseInt(totalOpenings));
    data.append("skills", JSON.stringify(tags));
    data.append(
      "jobDescription",
      JSON.stringify(convertToRaw(editorState.getCurrentContent()))
    );
    setLoading(true);

    let object = {};
    data.forEach(function (value, key) {
      object[key] = value;
    });

    axios
      .post("/post/admin/addjob", { job: object })
      .then((res) => {
        setLoading(false);
        info.dispatch(generateSuccess("Job Added Successfull!"));
      })
      .catch((err) => {
        setLoading(false);
        if (err.response && err.response.data)
          info.dispatch(generateError(err.response.data.errorMsg));
        else info.dispatch(generateError("Something went wrong!"));
      });
  };
  const state = {
    jobTitle,
    setJobTitle,
    department,
    setDepartment,
    workType,
    setWorkType,
    remote,
    setRemote,
    applyBy,
    setApplyBy,
    duration,
    setDuration,
    stipend,
    setStipend,
    totalOpenings,
    setTotalOpenings,
    handleTagChange,
    handleSubmit,
    tags: [], //since no default tags
    editorState,
    setEditorState,
  };
  return (
    <>
      <AddJobView {...state} action="Add Job" />
      {loading && <Loader />}
    </>
  );
};
export default AddJobs;
