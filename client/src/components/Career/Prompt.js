import React from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
const Prompt = ({
  prompted,
  setPrompted,
  id,
  msg,
}) => {
  const toggle = () => {
    setPrompted((prev) => !prev);
  };
  return (
    <Modal isOpen={prompted} toggle={toggle}>
      <ModalBody>
        {msg
          ? msg
          : "Your profile data will be used for selection process. Complete your profile if you haven't done it yet."}
      </ModalBody>
      <ModalFooter>
        <Button color="warning" onClick={toggle}>
          Okay
        </Button>
      </ModalFooter>
    </Modal>
  );
};
export default Prompt;