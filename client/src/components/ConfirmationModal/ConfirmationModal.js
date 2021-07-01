import React from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
const ConfirmDeletion = ({
  modalOpen,
  setModalOpen,
  handleSubmit,
  msg,
  modalHeader,
  buttonContent,
  id,
}) => {
  const toggle = () => {
    setModalOpen((prev) => !prev);
  };
  return (
    <Modal isOpen={modalOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>{modalHeader}</ModalHeader>
      <ModalBody>{msg}</ModalBody>
      <ModalFooter>
        <Button
          color="warning"
          className="default-btn"
          onClick={() => handleSubmit(id)}
        >
          {buttonContent}
        </Button>
        <Button color="secondary" onClick={toggle}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};
export default ConfirmDeletion;
