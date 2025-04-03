import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import { coordinates, APIkey } from "../../utils/Constants";
import Header from "../Header/Header";
import WeatherCard from "../WeatherCard/WeatherCard";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import { authorize } from "../../utils/auth";
import { getWeather, filterWeatherData } from "../../utils/weatherAPI";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import AddItemModal from "../AddItemModal/AddItemModal";
import ItemModal from "../ItemModal/ItemModal";
import Profile from "../Profile/Profile";
import DeleteConfirmationModal from "../DeleteModal/DeleteConfirmationModal";
import {
  fetchItems,
  addItem,
  deleteItem,
  fetchUserData,
  updateUserData,
  addCardLike,
  removeCardLike,
} from "../../utils/api";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import ProfileEditModal from "../ProfileEditModal/ProfileEditModal";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import ExampleCardsSection from "../ExampleCardsSection/ExampleCardsSection";

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

  const switchToLogin = () => setActiveModal("login");
  const switchToRegister = () => setActiveModal("register");
  const closeActiveModal = () => setActiveModal("");

  useEffect(() => {
    if (!activeModal) return;

    const handleEscClose = (e) => {
      if (e.key === "Escape") {
        closeActiveModal();
      }
    };

    document.addEventListener("keydown", handleEscClose);
    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [activeModal]);

  useEffect(() => {
    console.log("Fetching weather and items...");

    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
        console.log("Weather data fetched:", filteredData);
      })
      .catch((err) => console.error("Error fetching weather:", err));

    fetchItems()
      .then((items) => {
        setClothingItems(items);
        console.log("Fetched clothing items:", items);
      })
      .catch((err) => console.error("Error fetching items:", err));

    const token = localStorage.getItem("jwt");
    if (token) {
      fetchUserData(token)
        .then((user) => {
          setLoggedIn(true);
          setCurrentUser(user);
          console.log("User data fetched:", user);
        })
        .catch((err) => console.error("Error fetching user data:", err));
    }
  }, []);

  const handleRegisterSuccess = (data) => {
    console.log("User registered successfully:", data);
    closeActiveModal();
  };

  const handleLoginSuccess = ({ email, password }) => {
    const token = localStorage.getItem("jwt");

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
        console.log("User logged in and fetched:", user);
      })
      .catch((err) => {
        console.error("Error fetching user data after login:", err);
        throw err;
      });
  };

  const handleSaveProfileChanges = ({ name, avatar }) => {
    const token = localStorage.getItem("jwt");
    setIsLoading(true);
    updateUserData(name, avatar, token)
      .then((updatedUser) => {
        setCurrentUser(updatedUser);
        closeActiveModal();
        console.log("Profile updated:", updatedUser);
      })
      .catch((err) => console.error("Error updating profile:", err.message))
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleCardLike = ({ id, isLiked }) => {
    const token = localStorage.getItem("jwt");

    return (!isLiked ? addCardLike : removeCardLike)(id, token)
      .then((updatedCard) => {
        setClothingItems((items) =>
          items.map((item) => (item._id === id ? updatedCard : item))
        );
        console.log("Card updated:", updatedCard);
      })
      .catch((err) =>
        console.log(`Error ${isLiked ? "unliking" : "liking"} card:`, err)
      );
  };

  const handleAddClick = () => setActiveModal("add-garment");

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const openConfirmationModal = (card) => {
    setSelectedCard(card);
    setActiveModal("deleteConfirmation");
  };

  const handleCardDelete = () => {
    const token = localStorage.getItem("jwt");
    if (selectedCard && token) {
      deleteItem(selectedCard._id, token)
        .then(() => {
          setClothingItems((prevItems) =>
            prevItems.filter((item) => item._id !== selectedCard._id)
          );
          closeActiveModal();
          console.log("Card deleted:", selectedCard);
        })
        .catch((err) => console.error("Error deleting item:", err));
    } else {
      console.error("No card selected or user not authenticated");
    }
  };

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
    console.log("Temperature unit toggled to:", currentTemperatureUnit);
  };

  const onAddItem = (values, onDone) => {
    const token = localStorage.getItem("jwt");
    setIsLoading(true);
    addItem(values.name, values.imageUrl, values.weather, token)
      .then((newItem) => {
        setClothingItems((prevItems) => [newItem, ...prevItems]);
        closeActiveModal();
        if (onDone) onDone();
        console.log("Item added:", newItem);
      })
      .catch((err) => console.error("Error adding item:", err))
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleSignOut = () => {
    localStorage.removeItem("jwt");
    setLoggedIn(false);
    setCurrentUser(null);
    navigate("/");
    console.log("User signed out");
  };

  const userItems = clothingItems.filter(
    (item) => item.owner === currentUser?._id
  );
  console.log("User items on profile:", userItems);

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
              onSignUpClick={() => setActiveModal("register")}
              onLoginClick={() => setActiveModal("login")}
              loggedIn={loggedIn}
            />

            <WeatherCard weatherData={weatherData} />

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
