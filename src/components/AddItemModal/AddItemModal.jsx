import React, { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./AddItemModal.css";

const AddItemModal = ({ closeActiveModal, onAddItem, isOpen }) => {
  const [selectedWeather, setSelectedWeather] = useState(null);
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleUrlChange = (e) => {
    setImageUrl(e.target.value);
  };

  const handleWeatherChange = (event) => {
    setSelectedWeather(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddItem({ name, imageUrl, weather: selectedWeather }, () => {
      setName("");
      setImageUrl("");
      setSelectedWeather(null);
    });
  };

  return (
    <ModalWithForm
      titleText="New garment"
      buttonText="Add Garment"
      isOpen={isOpen}
      closeActiveModal={closeActiveModal}
      onSubmit={handleSubmit}
    >
      <label htmlFor="name" className="modal__label">
        Name
        <input
          type="text"
          className="modal__input"
          id="name"
          placeholder="Name"
          value={name}
          onChange={handleNameChange}
        />
      </label>
      <label htmlFor="imageUrl" className="modal__label">
        Image
        <input
          type="url"
          className="modal__input"
          id="imageUrl"
          placeholder="Image URL"
          value={imageUrl}
          onChange={handleUrlChange}
        />
      </label>
      <fieldset className="modal__radio-buttons">
        <legend className="modal__radio-text">Select the weather type:</legend>
        <label
          htmlFor="hot"
          className="modal__label modal__label_type_radio"
          style={{
            color: selectedWeather === "hot" ? "#000" : "#00000080",
          }}
        >
          <input
            id="hot"
            type="radio"
            className="modal__radio-input"
            value="hot"
            checked={selectedWeather === "hot"}
            onChange={handleWeatherChange}
            name="weatherGroup"
          />
          Hot
        </label>
        <label
          htmlFor="warm"
          className="modal__label modal__label_type_radio"
          style={{
            color: selectedWeather === "warm" ? "#000" : "#00000080",
          }}
        >
          <input
            id="warm"
            type="radio"
            className="modal__radio-input"
            value="warm"
            checked={selectedWeather === "warm"}
            onChange={handleWeatherChange}
            name="weatherGroup"
          />
          Warm
        </label>
        <label
          htmlFor="cold"
          className="modal__label modal__label_type_radio"
          style={{
            color: selectedWeather === "cold" ? "#000" : "#00000080",
          }}
        >
          <input
            id="cold"
            type="radio"
            className="modal__radio-input"
            value="cold"
            checked={selectedWeather === "cold"}
            onChange={handleWeatherChange}
            name="weatherGroup"
          />
          Cold
        </label>
      </fieldset>
    </ModalWithForm>
  );
};

export default AddItemModal;
