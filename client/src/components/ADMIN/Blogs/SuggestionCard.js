import React, { useState, useContext, useEffect } from "react";
import UpdateSuggestionModal from "./AddUpdateSuggestionModal";
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
  ThumbDownAltSharp,
  ThumbUpAltSharp,
} from "@material-ui/icons";
import ConfirmDeletion from "../Events/ConfirmDeletion";
import axios from "axios";
const SuggestionCard = ({
  queryString = () => "",
  setSuggestions = () => "",
  suggestion = {},
  setLoading = () => "",
  page = 1,
  limit = 12,
  setPage = () => "",
  setTotalItems = () => "",
}) => {
  const info = useContext(InfoContext);
  const [deleteConfirmationModalOpen, setDeleteCofirmationModalOpen] =
    useState(false);
  const [disapproveConfirmationModalOpen, setDisapproveConfirmationModalOpen] =
    useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [alert, setAlert] = useState({});
  useEffect(() => {
    return () => info.dispatch(clearEverything());
  }, []);
  useEffect(() => {
    if (alert.msg) {
      if (alert.type == "success") info.dispatch(generateSuccess(alert.msg));
      else if (alert.type == "failure") info.dispatch(generateError(alert.msg));
    }
  }, [alert]);
  const isAvailable = () => {
    if (suggestion.state == "AVAILABLE" && !suggestion.disapprovedSuggestion)
      return true;
    else return false;
  };
  const handleDelete = (id) => {
    setLoading(true);
    axios
      .delete("/delete/blogs/suggestion/" + id + queryString())
      .then((res) => {
        setLoading(false);
        info.dispatch(generateSuccess("Deleted Successfully!"));
        setTotalItems(res.data.totalItems);
        setSuggestions(res.data.suggestions);
        if ((page - 1) * limit >= res.data.totalItems) setPage(page - 1);
        setDeleteCofirmationModalOpen(false);
      })
      .catch((err) => {
        setLoading(false);
        if (err.response && err.response.data)
          info.dispatch(generateError(err.response.data.errorMsg));
        else info.dispatch(generateError("Something went wrong!"));
        setDeleteCofirmationModalOpen(false);
      });
  };
  const handleDisapproval = (id) => {
    axios
      .patch(`/patch/admin/blogs/suggestion/${id}/disapprove?${queryString()}`)
      .then((res) => {
        info.dispatch(generateSuccess("Suggestion Disapproved!"));
        setSuggestions(res.data.suggestions);
        setDeleteCofirmationModalOpen(false);
      })
      .catch((err) => {
        if (err.response && err.response.data)
          info.dispatch(generateError(err.response.data.errorMsg));
        else info.dispatch(generateError("Something went wrong!"));
        setDisapproveConfirmationModalOpen(false);
      });
  };
  const getState = () => {
    if (suggestion.disapprovedSuggestion) return "DISAPPROVED";
    else if (!suggestion.approvedSuggestion) return "SUGGESTED";
    //if suggestion is not approved this means it is a suggestion by any user;
    else return suggestion.state;
  };
  return (
    <div className="suggestion-card-main">
      <div
        className={suggestion.title ? "img-container" : "img-container loading"}
      >
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
          {suggestion.tags &&
            suggestion.tags.map((tag) => (
              <span className="tag" key={tag}>
                {tag}
              </span>
            ))}
          {/* below placeholders will be visible only if cards are used as loader placeholder */}
          <>
            <span className="tag-loading-placeholder tag"></span>
            <span className="tag-loading-placeholder tag"></span>
            <span className="tag-loading-placeholder tag"></span>
            <span className="tag-loading-placeholder tag"></span>
          </>
        </div>
        {suggestion.state && (
          <div className={"state " + getState()}>{getState()}</div>
        )}
      </div>

      <div className="actions">
        {suggestion.pickedBy && (
          <button>
            <PeopleAltTwoTone />
          </button>
        )}
        <>
          <button
            className={isAvailable() ? "" : "disabled"}
            disabled={isAvailable() ? false : true}
            onClick={() => setUpdateModalOpen((prev) => !prev)}
          >
            {suggestion.approvedSuggestion ? (
              <EditTwoTone />
            ) : (
              <ThumbUpAltSharp />
            )}
          </button>
          {/* the below modal will be used for approval or update */}
          {isAvailable() && (
            <UpdateSuggestionModal
              modalOpen={updateModalOpen}
              setModalOpen={setUpdateModalOpen}
              setAlert={setAlert}
              setSuggestions={setSuggestions}
              defaultTitle={suggestion.title}
              defaultTags={suggestion.tags}
              defaultCardImgUrl={suggestion.cardImg}
              updating={suggestion.approvedSuggestion ? true : false}
              approving={suggestion.approvedSuggestion ? false : true}
              queryString={queryString}
              id={suggestion._id}
            />
          )}
        </>
        {/* The below button handles disapproval for suggestions by users*/}
        {getState() == "SUGGESTED" && (
          <>
            <button
              onClick={() =>
                setDisapproveConfirmationModalOpen((prev) => !prev)
              }
            >
              <ThumbDownAltSharp />
            </button>
            {/* the below modal will be used for disapproval confirmation */}
            <ConfirmDeletion
              modalOpen={disapproveConfirmationModalOpen}
              setModalOpen={setDisapproveConfirmationModalOpen}
              handleDelete={handleDisapproval} //this won't delete but disapprove suggestion
              id={suggestion._id}
              buttonContent={"Disapprove"}
              msg={
                "This action is irreversible. You won't be able to change the state of this suggestion later once you disapprove."
              }
            />
          </>
        )}
        {/* remove button will be disabled if suggestion is not 'AVAILABLE', and can't be deleted */}
        <>
          <button
            className={
              isAvailable() ? "remove-button" : "remove-button disabled"
            }
            onClick={() => setDeleteCofirmationModalOpen((prev) => !prev)}
            disabled={isAvailable() ? false : true}
          >
            <DeleteForeverRounded />
          </button>
          {isAvailable() && (
            <ConfirmDeletion
              modalOpen={deleteConfirmationModalOpen}
              setModalOpen={setDeleteCofirmationModalOpen}
              handleDelete={handleDelete}
              id={suggestion._id}
            />
          )}
        </>
      </div>
    </div>
  );
};
export default SuggestionCard;
