import React, { useState, useEffect, useContext, lazy } from "react";
import { InfoContext } from "../../../state/Store";
import {
  generateError,
  generateSuccess,
  clearEverything,
} from "../../../state/info/infoActions";
import { AddCircle } from "@material-ui/icons";
// import AddSuggestionModal from "./AddUpdateSuggestionModal";
const AddSuggestionModal = lazy(() => import("./AddUpdateSuggestionModal"));

const AddSuggestion = ({
  setSuggestions = () => "",
  queryString = () => "",
  setTotalItems = (items) => "",
  userDashboard = false,
}) => {
  const info = useContext(InfoContext);
  const [alert, setAlert] = useState({});
  const [addSuggestionModalOpen, setAddSuggestionModalOpen] = useState(false);
  useEffect(() => {
    return () => info.dispatch(clearEverything());
  }, []);
  useEffect(() => {
    if (alert.msg) {
      if (alert.type == "success") info.dispatch(generateSuccess(alert.msg));
      else if (alert.type == "failure") info.dispatch(generateError(alert.msg));
    }
  }, [alert]);
  return (
    <>
      <button
        className="add-suggestion-button"
        onClick={() => setAddSuggestionModalOpen((prev) => !prev)}
      >
        <AddCircle className="add-icon" />
      </button>
      <AddSuggestionModal
        setAlert={setAlert}
        modalOpen={addSuggestionModalOpen}
        setModalOpen={setAddSuggestionModalOpen}
        setSuggestions={setSuggestions} //so that we can get the new added suggestion and can render that
        setTotalItems={setTotalItems}
        queryString={queryString}
        userDashboard={userDashboard}
      />
    </>
  );
};
export default AddSuggestion;
