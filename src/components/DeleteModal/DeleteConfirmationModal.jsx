import React, { useState } from "react";
import "./DeleteConfirm.css";

function DeleteConfirmationModal({
  activeModal,
  closeActiveModal,
  handleCardDelete,
}) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await handleCardDelete();
      closeActiveModal();
    } catch (err) {
      console.error("Error deleting item:", err);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div
      className={`modal ${
        activeModal === "deleteConfirmation" ? "modal_opened" : ""
      }`}
    >
      <div className="modal__container modal__container_type_confirmation">
        <button
          onClick={closeActiveModal}
          type="button"
          className="modal__close"
          aria-label="Close"
        />
        <p className="delete__modal-warning">
          Are you sure you want to delete this item?
        </p>
        <p className="delete__modal-warning">This action is irreversible.</p>
        <div className="delete__modal-actions">
          <button
            onClick={handleDelete}
            type="button"
            className="delete__modal-confirm"
            disabled={isDeleting}
          >
            {isDeleting ? "Deleting..." : "Yes, delete item"}
          </button>
          <button
            onClick={closeActiveModal}
            type="button"
            className="delete__modal-cancel"
            disabled={isDeleting}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirmationModal;
