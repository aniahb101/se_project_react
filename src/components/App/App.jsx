import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import "./App.css";
import { coordinates, APIkey } from "../../utils/Constants";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import WeatherCard from "../WeatherCard/WeatherCard";
import Main from "../Main/Main";
import Profile from "../Profile/Profile";
import ExampleCardsSection from "../ExampleCardsSection/ExampleCardsSection";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import { authorize } from "../../utils/auth";
import { getWeather, filterWeatherData } from "../../utils/weatherAPI";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import {
  fetchItems,
  addItem,
  deleteItem,
  fetchUserData,
  updateUserData,
  addCardLike,
  removeCardLike,
} from "../../utils/api";
import AddItemModal from "../AddItemModal/AddItemModal";
import ItemModal from "../ItemModal/ItemModal";
import DeleteConfirmationModal from "../DeleteModal/DeleteConfirmationModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import ProfileEditModal from "../ProfileEditModal/ProfileEditModal";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation(); // ✅ for detecting current route

  const switchToLogin = () => setActiveModal("login");
  const switchToRegister = () => setActiveModal("register");
  const closeActiveModal = () => setActiveModal("");

  useEffect(() => {
    if (!activeModal) return;
    const handleEscClose = (e) => {
      if (e.key === "Escape") closeActiveModal();
    };
    document.addEventListener("keydown", handleEscClose);
    return () => document.removeEventListener("keydown", handleEscClose);
  }, [activeModal]);

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filtered = filterWeatherData(data);
        setWeatherData(filtered);
      })
      .catch((err) => console.error("Error fetching weather:", err));

    fetchItems()
      .then(setClothingItems)
      .catch((err) => console.error("Error fetching items:", err));

    const token = localStorage.getItem("jwt");
    if (token) {
      fetchUserData(token)
        .then((user) => {
          setLoggedIn(true);
          setCurrentUser(user);
        })
        .catch((err) => console.error("Error fetching user data:", err));
    }
  }, []);

  const handleRegisterSuccess = () => closeActiveModal();

  const handleLoginSuccess = ({ email, password }) => {
    return authorize({ email, password })
      .then((data) => {
        localStorage.setItem("jwt", data.token);
        return fetchUserData(data.token);
      })
      .then((user) => {
        setLoggedIn(true);
        setCurrentUser(user);
        closeActiveModal();
        navigate("/profile");
      })
      .catch((err) => {
        console.error("Login error:", err);
        throw err;
      });
  };

  const handleSaveProfileChanges = ({ name, avatar }) => {
    const token = localStorage.getItem("jwt");
    setIsLoading(true);
    updateUserData(name, avatar, token)
      .then((user) => {
        setCurrentUser(user);
        closeActiveModal();
      })
      .catch((err) => console.error("Update error:", err))
      .finally(() => setIsLoading(false));
  };

  const handleCardLike = ({ id, isLiked }) => {
    const token = localStorage.getItem("jwt");
    const likeFn = isLiked ? removeCardLike : addCardLike;

    return likeFn(id, token)
      .then((updatedCard) => {
        setClothingItems((items) =>
          items.map((item) => (item._id === id ? updatedCard : item))
        );
      })
      .catch((err) =>
        console.log(`Error ${isLiked ? "unliking" : "liking"} card:`, err)
      );
  };

  const handleAddClick = () => setActiveModal("add-garment");
  const handleCardClick = (card) => {
    setSelectedCard(card);
    setActiveModal("preview");
  };

  const openConfirmationModal = (card) => {
    setSelectedCard(card);
    setActiveModal("deleteConfirmation");
  };

  const handleCardDelete = () => {
    const token = localStorage.getItem("jwt");
    if (!selectedCard || !token) return;

    deleteItem(selectedCard._id, token)
      .then(() => {
        setClothingItems((items) =>
          items.filter((item) => item._id !== selectedCard._id)
        );
        closeActiveModal();
      })
      .catch((err) => console.error("Delete error:", err));
  };

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit((unit) => (unit === "F" ? "C" : "F"));
  };

  const onAddItem = (values, onDone) => {
    const token = localStorage.getItem("jwt");
    setIsLoading(true);
    addItem(values.name, values.imageUrl, values.weather, token)
      .then((newItem) => {
        setClothingItems((items) => [newItem, ...items]);
        closeActiveModal();
        onDone?.();
      })
      .catch((err) => console.error("Add item error:", err))
      .finally(() => setIsLoading(false));
  };

  const handleSignOut = () => {
    localStorage.removeItem("jwt");
    setLoggedIn(false);
    setCurrentUser(null);
    navigate("/");
  };

  const userItems = clothingItems.filter(
    (item) => item.owner === currentUser?._id
  );

  return (
    <div className="page">
      <div className="page__content">
        <CurrentUserContext.Provider value={{ currentUser }}>
          <CurrentTemperatureUnitContext.Provider
            value={{ currentTemperatureUnit, handleToggleSwitchChange }}
          >
            <Header
              handleAddClick={handleAddClick}
              weatherData={weatherData}
              onSignUpClick={switchToRegister}
              onLoginClick={switchToLogin}
              loggedIn={loggedIn}
            />

            {location.pathname === "/" && (
              <WeatherCard weatherData={weatherData} />
            )}

            <Routes>
              <Route
                path="/"
                element={
                  loggedIn ? (
                    <Main
                      weatherData={weatherData}
                      handleCardClick={handleCardClick}
                      clothingItems={clothingItems}
                      onCardLike={handleCardLike}
                    />
                  ) : (
                    <ExampleCardsSection
                      weatherData={weatherData}
                      onCardClick={handleCardClick}
                      onCardLike={handleCardLike}
                    />
                  )
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute
                    element={Profile}
                    loggedIn={loggedIn}
                    clothingItems={userItems}
                    onCardClick={handleCardClick}
                    handleAddClick={handleAddClick}
                    onCardLike={handleCardLike}
                    onLogout={handleSignOut}
                    onChangeProfile={() => setActiveModal("profileEdit")}
                  />
                }
              />
            </Routes>

            <Footer />

            {/* Modals */}
            <AddItemModal
              isOpen={activeModal === "add-garment"}
              closeActiveModal={closeActiveModal}
              onAddItem={onAddItem}
              isLoading={isLoading}
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
            {activeModal === "register" && (
              <RegisterModal
                onClose={closeActiveModal}
                onRegisterSuccess={handleRegisterSuccess}
                switchToLogin={switchToLogin}
                isLoading={isLoading}
              />
            )}
            {activeModal === "login" && (
              <LoginModal
                onClose={closeActiveModal}
                onLoginSuccess={handleLoginSuccess}
                switchToRegister={switchToRegister}
                isLoading={isLoading}
              />
            )}
            {activeModal === "profileEdit" && (
              <ProfileEditModal
                isOpen={activeModal === "profileEdit"}
                onClose={closeActiveModal}
                currentName={currentUser?.name}
                currentAvatar={currentUser?.avatar}
                onSaveChanges={handleSaveProfileChanges}
                buttonText={isLoading ? "Saving..." : "Save"}
                isLoading={isLoading}
              />
            )}
          </CurrentTemperatureUnitContext.Provider>
        </CurrentUserContext.Provider>
      </div>
    </div>
  );
}

export default App;
