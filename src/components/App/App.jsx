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
import { fetchItems, addItem, deleteItem } from "../../utils/api";
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

  useEffect(() => {
    console.log("Fetching weather data and items...");
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        console.log("Weather data fetched:", filteredData);
        setWeatherData(filteredData);
      })
      .catch(console.error);

    fetchItems()
      .then((items) => {
        console.log("Clothing items fetched:", items);
        setClothingItems(items);
      })
      .catch(console.error);

    const token = localStorage.getItem("jwt");
    if (token) {
      console.log("Token found in localStorage:", token);
      fetchUserData(token)
        .then((user) => {
          console.log("User data fetched:", user);
          setLoggedIn(true);
          setUserName(user.name);
          setUserAvatar(user.avatar);
        })
        .catch(console.error);
    }
  }, []);

  const handleAddClick = () => {
    console.log("Add clothing item button clicked");
    setActiveModal("add-garment");
  };

  const closeActiveModal = () => {
    console.log("Closing active modal");
    setActiveModal("");
  };

  const handleCardClick = (card) => {
    console.log("Clothing item clicked:", card);
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const openConfirmationModal = (card) => {
    console.log("Open confirmation modal for:", card);
    setSelectedCard(card);
    setActiveModal("deleteConfirmation");
  };

  const handleCardDelete = () => {
    if (selectedCard) {
      console.log("Deleting card:", selectedCard);
      deleteItem(selectedCard._id)
        .then(() => {
          console.log("Card deleted successfully");
          setClothingItems((prevItems) =>
            prevItems.filter((item) => item._id !== selectedCard._id)
          );
          closeActiveModal();
        })
        .catch(console.error);
    }
  };

  const handleToggleSwitchChange = () => {
    console.log("Toggle switch changed");
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  const onAddItem = (values, onDone) => {
    console.log("Adding new item:", values);
    addItem(values.name, values.imageUrl, values.weather)
      .then((newItem) => {
        console.log("New item added:", newItem);
        setClothingItems((prevItems) => [newItem, ...prevItems]);
        closeActiveModal();
        if (onDone) onDone();
      })
      .catch(console.error);
  };

  const handleRegister = (data) => {
    console.log("Registering user:", data);
    register(data)
      .then((res) => {
        console.log("Registration successful", res);
        localStorage.setItem("jwt", res.token);
        fetchUserData(res.token)
          .then((user) => {
            console.log("User data fetched after registration:", user);
            setLoggedIn(true);
            setUserName(user.name);
            setUserAvatar(user.avatar);
            setRegisterModalOpen(false);
            navigate("/profile");
          })
          .catch(console.error);
      })
      .catch(console.error);
  };

  const handleLogin = (data) => {
    console.log("Logging in user:", data);
    authorize(data)
      .then((res) => {
        console.log("Login successful, token received:", res.token);
        localStorage.setItem("jwt", res.token);
        fetchUserData(res.token)
          .then((user) => {
            console.log("User data fetched after login:", user);
            setLoggedIn(true);
            setUserName(user.name);
            setUserAvatar(user.avatar);
            setLoginModalOpen(false);
            navigate("/profile");
          })
          .catch(console.error);
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
            onSignUpClick={() => {
              console.log("Sign Up button clicked");
              setRegisterModalOpen(true);
            }}
            onLoginClick={() => {
              console.log("Log In button clicked");
              setLoginModalOpen(true);
            }}
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
              onClose={() => {
                console.log("Closing Register Modal");
                setRegisterModalOpen(false);
              }}
              onRegister={handleRegister}
            />
          )}
          {isLoginModalOpen && (
            <LoginModal
              onClose={() => {
                console.log("Closing Login Modal");
                setLoginModalOpen(false);
              }}
              onLogin={handleLogin}
            />
          )}
        </CurrentTemperatureUnitContext.Provider>
      </div>
    </div>
  );
}

export default App;
