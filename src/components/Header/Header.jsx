import "./Header.css";
import { Link } from "react-router-dom";
import logo from "../../images/Logo.png";
import avatar from "../../images/headericon.png"; // Default avatar image
import ToggleSwitch from "../ToggleSwitched/ToggleSwitched";

function Header({
  handleAddClick,
  weatherData,
  onSignUpClick,
  onLoginClick,
  loggedIn,
  userName,
  userAvatar,
}) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <Link to="/">
        <img className="header__image" src={logo} alt="Logo" />
      </Link>
      <p className="header__location-and-date">
        {currentDate}, {weatherData.city}
      </p>
      <div className="header__switch-container">
        <ToggleSwitch />
        <button
          onClick={handleAddClick}
          type="button"
          className="header__add-button"
        >
          + Add clothes
        </button>
        {!loggedIn && (
          <>
            <button onClick={onSignUpClick} className="header__auth-button">
              Sign Up
            </button>
            <button onClick={onLoginClick} className="header__auth-button">
              Log In
            </button>
          </>
        )}
        {loggedIn && (
          <Link to="/profile" className="header__link">
            <div className="header__user-container">
              <p className="header__username">{userName}</p>
              <img
                src={userAvatar || avatar}
                alt="User Avatar"
                className="header__avatar"
              />
            </div>
          </Link>
        )}
      </div>
    </header>
  );
}

export default Header;
