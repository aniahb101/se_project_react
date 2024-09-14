import React, { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useLocation } from "react-router-dom";
import "./ItemModal.css";

function ItemModal({
  activeModal,
  card,
  closeActiveModal,
  openConfirmationModal,
}) {
  const { currentUser } = useContext(CurrentUserContext) || {};
  const location = useLocation();
  const isOwn = card?.owner === currentUser?._id;
  const itemDeleteButtonClassName = `modal__delete ${
    isOwn ? "modal__delete-visible" : "modal__delete-hidden"
  }`;

  if (!activeModal) return null;

  return (
    <div className={`modal ${activeModal === "preview" ? "modal_opened" : ""}`}>
      <div className="modal__container modal__container_type_image">
        <button
          onClick={closeActiveModal}
          type="button"
          className="modal__close"
        >
          {" "}
        </button>
        {card && (
          <>
            <img src={card.imageUrl} alt={card.name} className="modal__image" />
            <div className="modal__footer">
              <h2 className="modal__caption">{card.name}</h2>
              <p className="modal__weather">Weather: {card.weather}</p>
              <button
                onClick={() => openConfirmationModal(card)}
                type="button"
                className={itemDeleteButtonClassName}
              >
                Delete Item
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default ItemModal;
