import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import "./App.css";
import { coordinates, APIkey } from "../../utils/Constants";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import SideBar from "../SideBar/SideBar";
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
  const [userName, setUserName] = useState("");
  const [userAvatar, setUserAvatar] = useState("");
  const [userId, setUserId] = useState("");
  const [isRegisterModalOpen, setRegisterModalOpen] = useState(false);
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [isProfileEditModalOpen, setProfileEditModalOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const switchToLogin = () => {
    setRegisterModalOpen(false);
    setLoginModalOpen(true);
  };

  const switchToRegister = () => {
    setLoginModalOpen(false);
    setRegisterModalOpen(true);
  };

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
          setUserName(user.name);
          setUserAvatar(user.avatar);
          setUserId(user._id);
          console.log("User data fetched:", user);
        })
        .catch((err) => console.error("Error fetching user data:", err));
    }
  }, []);

  const handleRegisterSuccess = (data) => {
    console.log("User registered successfully:", data);
    setRegisterModalOpen(false);
  };

  const handleLoginSuccess = (data) => {
    console.log("Login successful:", data);
    localStorage.setItem("jwt", data.token);

    fetchUserData(data.token)
      .then((user) => {
        setLoggedIn(true);
        setUserName(user.name);
        setUserAvatar(user.avatar);
        setUserId(user._id);
        setLoginModalOpen(false);
        navigate("/profile");
        console.log("User logged in and fetched:", user);
      })
      .catch((err) =>
        console.error("Error fetching user data after login:", err)
      );
  };

  const handleSaveProfileChanges = ({ name, avatar }) => {
    const token = localStorage.getItem("jwt");
    updateUserData(name, avatar, token)
      .then((updatedUser) => {
        setUserName(updatedUser.name);
        setUserAvatar(updatedUser.avatar);
        console.log("Profile updated:", updatedUser);
      })
      .catch((err) => {
        console.error("Error updating profile:", err.message);
      })
      .finally(() => {
        setProfileEditModalOpen(false);
      });
  };

  const handleCardLike = ({ id, isLiked }) => {
    const token = localStorage.getItem("jwt");

    !isLiked
      ? addCardLike(id, token)
          .then((updatedCard) => {
            setClothingItems((items) =>
              items.map((item) => (item._id === id ? updatedCard : item))
            );
            console.log("Card liked:", updatedCard);
          })
          .catch((err) => console.log("Error liking card:", err))
      : removeCardLike(id, token)
          .then((updatedCard) => {
            setClothingItems((items) =>
              items.map((item) => (item._id === id ? updatedCard : item))
            );
            console.log("Card unliked:", updatedCard);
          })
          .catch((err) => console.log("Error unliking card:", err));
  };

  const handleAddClick = () => setActiveModal("add-garment");
  const closeActiveModal = () => setActiveModal("");

  const handleCardClick = (card) => {
    console.log("Card clicked:", card);
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const openConfirmationModal = (card) => {
    console.log("Delete confirmation modal for card:", card);
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
        .catch((err) => {
          console.error("Error deleting item:", err);
        });
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
    addItem(values.name, values.imageUrl, values.weather, token)
      .then((newItem) => {
        setClothingItems((prevItems) => [newItem, ...prevItems]);
        closeActiveModal();
        if (onDone) onDone();
        console.log("Item added:", newItem);
      })
      .catch((err) => console.error("Error adding item:", err));
  };

  const handleSignOut = () => {
    localStorage.removeItem("jwt");
    setLoggedIn(false);
    navigate("/");
    console.log("User signed out");
  };

  const userItems = clothingItems.filter((item) => item.owner === userId);
  console.log("User items on profile:", userItems);

  return (
    <div className="page">
      <div className="page__content">
        <CurrentUserContext.Provider
          value={{
            currentUser: { _id: userId, name: userName, avatar: userAvatar },
          }}
        >
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

            {location.pathname === "/profile" && (
              <SideBar
                loggedIn={loggedIn}
                userName={userName}
                userAvatar={userAvatar}
                onChangeProfile={() => setProfileEditModalOpen(true)}
                onLogout={handleSignOut}
              />
            )}

            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    weatherData={weatherData}
                    handleCardClick={handleCardClick}
                    clothingItems={clothingItems}
                    onCardLike={handleCardLike}
                  />
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
                  />
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
                switchToLogin={switchToLogin}
              />
            )}
            {isLoginModalOpen && (
              <LoginModal
                onClose={() => setLoginModalOpen(false)}
                onLoginSuccess={handleLoginSuccess}
                switchToRegister={switchToRegister}
              />
            )}
            {isProfileEditModalOpen && (
              <ProfileEditModal
                isOpen={isProfileEditModalOpen}
                onClose={() => setProfileEditModalOpen(false)}
                currentName={userName}
                currentAvatar={userAvatar}
                onSaveChanges={handleSaveProfileChanges}
              />
            )}
          </CurrentTemperatureUnitContext.Provider>
        </CurrentUserContext.Provider>
      </div>
    </div>
  );
}

export default App;
