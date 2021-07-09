import "date-fns";
import React, { useState, useEffect, useContext, lazy } from "react";
import axios from "axios";
import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
import { InfoContext } from "../../../state/Store";
import {
  generateError,
  generateWarning,
  generateSuccess,
  clearEverything,
} from "../../../state/info/infoActions";
// import UpdateJobsView from "./UpdateJob";
// import UpdateJobsView from "./JobFormView";
import Loader from "../../Loader/Loader";
const UpdateJobsView = lazy(() => import("./JobFormView"));
const UpdateJob = (props) => {
  const info = useContext(InfoContext);
  const [jobTitle, setJobTitle] = useState("");
  const [department, setDepartment] = useState("");
  const [workType, setWorkType] = useState("");
  const [remote, setRemote] = useState("Office");
  const [applyBy, setApplyBy] = useState(new Date(Date.now()));
  const [duration, setDuration] = useState(0);
  const [stipend, setStipend] = useState(0);
  const [totalOpenings, setTotalOpenings] = useState(0);
  const [tags, setTags] = useState([]);
  const [defaultTags, setDefaultTags] = useState([]);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [loading, setLoading] = useState(true); //since initially event will be loading

  const setDefaultValues = (job) => {
    setJobTitle(job.title);
    setDepartment(job.department);
    setWorkType(job.workType);
    setRemote(job.remote ? "Remote" : "Office");
    setApplyBy(job.applyBy);
    setDuration(job.duration);
    setStipend(job.stipend);
    setTotalOpenings(job.totalOpening);
    setDefaultTags(job.skills);
    setEditorState(
      EditorState.createWithContent(
        convertFromRaw(JSON.parse(job.jobDescription))
      )
    );
  };

  useEffect(() => {
    setLoading(true);
    axios
      .get(`/api/jobs/${props.match.params.id}`)
      .then((res) => {
        setDefaultValues(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        if (err.response && err.response.status == 404)
          props.history.push("/error404");
      });
    //clear any alerts when this component unmounts
    return () => info.dispatch(clearEverything());
  }, []);

  const handleTagChange = (values) => {
    let parsedValues = [];
    if (values) parsedValues = JSON.parse(values);
    parsedValues = parsedValues.map((tagObj) => tagObj.value);
    // console.log(parsedValues);
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
      .patch(`/patch/job/${props.match.params.id}`, { job: object })
      .then((res) => {
        setLoading(false);
        if (res.data) {
          setDefaultValues(res.data);
          info.dispatch(generateSuccess("Job Updated Successfull!"));
        }
      })
      .catch((err) => {
        setLoading(false);
        // console.log(err);
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
    tags: defaultTags,
    editorState,
    setEditorState,
  };
  return (
    <>
      {!loading && <UpdateJobsView {...state} action="Update Job" />}
      {loading && <Loader />}
    </>
  );
};

export default UpdateJob;
