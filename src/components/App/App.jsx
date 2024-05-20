import React, { useEffect, useState, useRef } from "react";
import "./App.css";
import { coordinates, APIkey } from "../../utils/Constants";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";
import { getWeather, filterWeatherData } from "../../utils/weatherAPI";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: {
      F: 999,
      C: 999,
    },
    city: "",
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [selectedWeather, setSelectedWeather] = useState(null);
  const modalRef = useRef(null);

  const handleAddClick = () => setActiveModal("add-garment");
  const closeActiveModal = () => setActiveModal("");

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleWeatherChange = (event) => {
    setSelectedWeather(event.target.value);
  };

  const handleOutsideClick = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setActiveModal("");
    }
  };

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div className="page">
      <div className="page__content">
        <Header handleAddClick={handleAddClick} weatherData={weatherData} />
        <Main weatherData={weatherData} handleCardClick={handleCardClick} />
        <Footer />
      </div>
      <div ref={modalRef}>
        <ModalWithForm
          titleText="New garment"
          buttonText="Add Garment"
          isOpen={activeModal === "add-garment"}
          closeActiveModal={closeActiveModal}
        >
          <label htmlFor="name" className="modal__label">
            Name
            <input
              type="text"
              className="modal__input"
              id="name"
              placeholder="Name"
            />
          </label>
          <label htmlFor="imageUrl" className="modal__label">
            Image
            <input
              type="url"
              className="modal__input"
              id="imageUrl"
              placeholder="Image URL"
            />
          </label>
          <fieldset className="modal__radio-buttons">
            <legend className="modal__radio-text">
              Select the weather type:
            </legend>
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
      </div>
      <ItemModal
        activeModal={activeModal}
        card={selectedCard}
        closeActiveModal={closeActiveModal}
      />
    </div>
  );
}

export default App;
