import React, { useState, useEffect, useContext } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
} from "reactstrap";
import axios from "axios";
import { convertToRaw, EditorState } from "draft-js";
import EditorComponent from "../../Editor/Editor";
import draftToHtml from "draftjs-to-html";
import { InfoContext } from "../../../state/Store";
import {
  generateError,
  generateSuccess,
} from "../../../state/info/infoActions";
const SendMessageModal = ({ modalOpen, setModalOpen, eventId }) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [subject, setSubject] = useState("");
  const [warning, setWarning] = useState("");
  const info = useContext(InfoContext);
  const toggle = () => {
    setModalOpen((prev) => !prev);
  };
  useEffect(() => {
    if (warning) setWarning("");
  }, []);
  const sendMessage = () => {
    if (!subject) return setWarning("Please fill in all the fields!");
    const html = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    axios
      .post(`/post/admin/events/${eventId}/registrations/sendMsg`, {
        html,
        subject,
      })
      .then((res) => {
        //reinstantiate the editor state and subject
        setEditorState(EditorState.createEmpty());
        setSubject("");
        //-----------------------------------------
        //give success message
        info.dispatch(
          generateSuccess(
            "Message will be send to all the registered candidates shortly!"
          )
        );
        //close modal after showing message and waiting for 2 seconds
        setTimeout(() => {
          setModalOpen(false);
        }, 3000);
      })
      .catch((err) => {
        setModalOpen(false);
        if (err.response && err.response.data)
          info.dispatch(generateError(err.response.data.errorMsg));
        else info.dispatch(generateError("Something went wrong!"));
      });
  };
  return (
    <Modal className="send-email" isOpen={modalOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Send Message</ModalHeader>
      <ModalBody>
        <p style={{ marginBottom: "1rem" }}>
          {warning ? (
            <span style={{ color: "red" }}>{warning}</span>
          ) : (
            <span>Write the message you want to send below.</span>
          )}
        </p>
        <FormGroup>
          <label htmlFor="email-subject" className="fontType">
            Email Subject
          </label>
          <input
            className="form-control"
            type="text"
            placeholder="Email Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            style={{ marginBottom: "1rem", color: "#111" }}
            id="email-subject"
            autoComplete="off"
          />
        </FormGroup>
        <FormGroup>
          <label htmlFor="editor">Email Body</label>
          <EditorComponent
            editorState={editorState}
            setEditorState={setEditorState}
          />
        </FormGroup>
      </ModalBody>
      <ModalFooter>
        <Button
          className="default-btn"
          color="warning"
          onClick={() => sendMessage()}
        >
          Send Message
        </Button>
        <Button color="secondary" onClick={toggle}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};
export default SendMessageModal;
