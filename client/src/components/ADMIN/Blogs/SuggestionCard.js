import React, { useState, useContext, useEffect } from "react";
import UpdateSuggestionModal from "./AddUpdateSuggestionModal";
import { Link } from "react-router-dom";
import { InfoContext } from "../../../state/Store";
import {
  generateError,
  generateSuccess,
  clearEverything,
} from "../../../state/info/infoActions";
import {
  DeleteForeverRounded,
  EditTwoTone,
  PeopleAltTwoTone,
} from "@material-ui/icons";
import ConfirmDeletion from "../Events/ConfirmDeletion";
const SuggestionCard = ({ suggestion, handleDelete }) => {
  const info = useContext(InfoContext);
  const [deleteConfirmationModalOpen, setDeleteCofirmationModalOpen] =
    useState(false);
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
    <div className="suggestion-card-main">
      <div className="img-container">
        <img src={suggestion.cardImg} alt="" />
      </div>
      <div
        className={
          suggestion.title
            ? "suggestion-details-container"
            : "suggestion-details-container loading"
        }
      >
        <p>{suggestion.title}</p>
        <div className="tags-container">
          {suggestion.tags.map((tag) => (
            <span className="tag" key={tag}>
              {tag}
            </span>
          ))}
          <>
            <span className="tag-loading-placeholder tag"></span>
            <span className="tag-loading-placeholder tag"></span>
            <span className="tag-loading-placeholder tag"></span>
            <span className="tag-loading-placeholder tag"></span>
          </>
        </div>
        <div className={"state " + suggestion.state}>{suggestion.state}</div>
      </div>
      <div className="actions">
        {suggestion.pickedBy && (
          <button>
            <PeopleAltTwoTone />
          </button>
        )}
        {suggestion.state == "AVAILABLE" && (
          <>
            <button>
              <EditTwoTone />
            </button>
          </>
        )}
        {suggestion.state == "AVAILABLE" && (
          <>
            <button
              className="remove-button"
              onClick={() => setDeleteCofirmationModalOpen((prev) => !prev)}
            >
              <DeleteForeverRounded />
            </button>
            <ConfirmDeletion
              modalOpen={deleteConfirmationModalOpen}
              setModalOpen={setDeleteCofirmationModalOpen}
              handleDelete={handleDelete}
              id={suggestion._id}
            />
          </>
        )}
      </div>
    </div>
  );
};
export default SuggestionCard;
