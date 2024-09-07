import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import { coordinates, APIkey } from "../../utils/Constants";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import { getWeather, filterWeatherData } from "../../utils/weatherAPI";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import AddItemModal from "../AddItemModal/AddItemModal";
import ItemModal from "../ItemModal/ItemModal";
import Profile from "../Profile/Profile";
import DeleteConfirmationModal from "../DeleteModal/DeleteConfirmationModal";
import {
  fetchItems,
  addItem,
  deleteItem,
  fetchUserData,
} from "../../utils/api";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import { register, authorize } from "../../utils/auth";

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
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [userAvatar, setUserAvatar] = useState("");
  const [isRegisterModalOpen, setRegisterModalOpen] = useState(false);
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleRegisterSuccess = (data) => {
    console.log("User registered successfully:", data);
    setRegisterModalOpen(false);
  };

  const handleLoginSuccess = (data) => {
    console.log("Login successful:", data);
    localStorage.setItem("jwt", data.token);

    fetchUserData(data.token)
      .then((user) => {
        console.log("User data fetched:", user);
        setLoggedIn(true);
        setUserName(user.name);
        setUserAvatar(user.avatar);
        setLoginModalOpen(false);
        navigate("/profile");
      })
      .catch((err) => console.error("Error fetching user data:", err));
  };

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);

    fetchItems()
      .then((items) => setClothingItems(items))
      .catch(console.error);

    const token = localStorage.getItem("jwt");
    if (token) {
      fetchUserData(token)
        .then((user) => {
          setLoggedIn(true);
          setUserName(user.name);
          setUserAvatar(user.avatar);
        })
        .catch(console.error);
    }
  }, []);

  const handleAddClick = () => setActiveModal("add-garment");
  const closeActiveModal = () => setActiveModal("");

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const openConfirmationModal = (card) => {
    setSelectedCard(card);
    setActiveModal("deleteConfirmation");
  };

  const handleCardDelete = () => {
    if (selectedCard) {
      deleteItem(selectedCard._id)
        .then(() => {
          setClothingItems((prevItems) =>
            prevItems.filter((item) => item._id !== selectedCard._id)
          );
          closeActiveModal();
        })
        .catch(console.error);
    }
  };

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  const onAddItem = (values, onDone) => {
    addItem(values.name, values.imageUrl, values.weather)
      .then((newItem) => {
        setClothingItems((prevItems) => [newItem, ...prevItems]);
        closeActiveModal();
        if (onDone) onDone();
      })
      .catch(console.error);
  };

  return (
    <div className="page">
      <div className="page__content">
        <CurrentTemperatureUnitContext.Provider
          value={{ currentTemperatureUnit, handleToggleSwitchChange }}
        >
          <Header
            handleAddClick={handleAddClick}
            weatherData={weatherData}
            onSignUpClick={() => setRegisterModalOpen(true)}
            onLoginClick={() => setLoginModalOpen(true)}
            loggedIn={loggedIn}
            userName={userName}
            userAvatar={userAvatar}
          />
          <Routes>
            <Route
              path="/"
              element={
                <Main
                  weatherData={weatherData}
                  handleCardClick={handleCardClick}
                  clothingItems={clothingItems}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute loggedIn={loggedIn}>
                  <Profile
                    clothingItems={clothingItems}
                    onCardClick={handleCardClick}
                  />
                </ProtectedRoute>
              }
            />
          </Routes>
          <Footer />
          <AddItemModal
            isOpen={activeModal === "add-garment"}
            closeActiveModal={closeActiveModal}
            onAddItem={onAddItem}
          />
          <ItemModal
            activeModal={activeModal}
            card={selectedCard}
            closeActiveModal={closeActiveModal}
            openConfirmationModal={openConfirmationModal}
          />
          <DeleteConfirmationModal
            activeModal={activeModal}
            closeActiveModal={closeActiveModal}
            handleCardDelete={handleCardDelete}
          />
          {isRegisterModalOpen && (
            <RegisterModal
              onClose={() => setRegisterModalOpen(false)}
              onRegisterSuccess={handleRegisterSuccess}
            />
          )}
          {isLoginModalOpen && (
            <LoginModal
              onClose={() => setLoginModalOpen(false)}
              onLoginSuccess={handleLoginSuccess}
            />
          )}
        </CurrentTemperatureUnitContext.Provider>
      </div>
    </div>
  );
}

export default App;
