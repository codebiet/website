import React from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
const ConfirmDeletion = ({
  modalOpen,
  setModalOpen,
  handleDelete,
  id,
  msg,
  buttonContent
}) => {
  const toggle = () => {
    setModalOpen((prev) => !prev);
  };
  return (
    <Modal isOpen={modalOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Confirm</ModalHeader>
      <ModalBody>
        {msg
          ? msg
          : "This will be deleted permanently and can't be restored later. Are you sure you want to delete?"}
      </ModalBody>
      <ModalFooter>
        <Button color="warning" onClick={() => handleDelete(id)}>
          {buttonContent ? buttonContent : "Delete"}
        </Button>
        <Button color="secondary" onClick={toggle}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};
export default ConfirmDeletion;