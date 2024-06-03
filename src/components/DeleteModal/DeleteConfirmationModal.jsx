import React from "react";
import "./DeleteConfirm.css";

function DeleteConfirmationModal({
  activeModal,
  closeActiveModal,
  handleCardDelete,
}) {
  return (
    <div
      className={`modal ${
        activeModal === "deleteConfirmation" && "modal_opened"
      }`}
    >
      <div className="modal__container modal__container_type_confirmation">
        <button
          onClick={closeActiveModal}
          type="button"
          className="modal__close"
        >
          {" "}
        </button>
        <p className="delete__modal-warning">
          Are you sure you want to delete this item?
        </p>
        <p className="delete__modal-warning"> This action is irreversible.</p>
        <div className="delete__modal-actions">
          <button
            onClick={handleCardDelete}
            type="button"
            className="delete__modal-confirm"
          >
            Yes, delete item
          </button>
          <button
            onClick={closeActiveModal}
            type="button"
            className="delete__modal-cancel"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirmationModal;
