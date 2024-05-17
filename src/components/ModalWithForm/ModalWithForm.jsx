import "./ModalWithForm.css";

function ModalWithForm({
  children,
  buttonText,
  titleText,
  activeModal,
  closeActiveModal,
}) {
  return (
    <div className={`modal ${activeModal === "add-garment" && "modal_opened"}`}>
      <div className="modal__container">
        <h2 className="modal__name">{titleText}</h2>
        <button
          onClick={closeActiveModal}
          type="button"
          className="modal__close"
        >
          {" "}
        </button>
        <form action="" className="modal__form">
          {children}
          <button type="submit" className="modal__submit">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
