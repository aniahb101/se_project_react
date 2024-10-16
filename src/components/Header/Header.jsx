import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import logo from "../../images/Logo.png";
import ToggleSwitch from "../ToggleSwitched/ToggleSwitched";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function Header({ handleAddClick, weatherData, onSignUpClick, onLoginClick }) {
  const { currentUser } = useContext(CurrentUserContext);

  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  const renderAvatar = () => {
    if (currentUser?.avatar) {
      return (
        <img
          src={currentUser.avatar}
          alt="User Avatar"
          className="header__avatar"
        />
      );
    } else {
      const initials = currentUser?.name
        ? currentUser.name[0].toUpperCase()
        : "?";
      return <div className="header__avatar-placeholder">{initials}</div>;
    }
  };

  return (
    <header className="header">
      <Link to="/">
        <img className="header__image" src={logo} alt="Logo" />
      </Link>
      <p className="header__location-and-date">
        {currentDate}, {weatherData?.city}
      </p>
      <div className="header__switch-container">
        <ToggleSwitch />

        {/* Show Add Clothes button only if user is logged in */}
        {currentUser && (
          <button
            onClick={handleAddClick}
            type="button"
            className="header__add-button"
          >
            + Add clothes
          </button>
        )}

        {/* Conditionally render buttons based on loggedIn state */}
        {!currentUser ? (
          <>
            <button onClick={onSignUpClick} className="header__auth-button">
              Sign Up
            </button>
            <button onClick={onLoginClick} className="header__auth-button">
              Log In
            </button>
          </>
        ) : (
          <Link to="/profile" className="header__user-container">
            <p className="header__username">{currentUser.name}</p>
            {renderAvatar()}
          </Link>
        )}
      </div>
    </header>
  );
}

export default Header;
