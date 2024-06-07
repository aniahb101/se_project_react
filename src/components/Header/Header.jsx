import "./Header.css";
import { Link } from "react-router-dom";
import logo from "../../images/Logo.png";
import avatar from "../../images/headericon.png";
import ToggleSwitch from "../ToggleSwitched/ToggleSwitched";

function Header({ handleAddClick, weatherData }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });
  return (
    <header className="header">
      <Link to="/">
        <img className="header__image" src={logo} />
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
        <Link to="/profile" className="header__link">
          <div className="header__user-container">
            <p className="header__username">Alisha Tegegne</p>
            <img
              src={avatar}
              alt="Terrence Tegegne"
              className="header__avatar"
            />
          </div>
        </Link>
      </div>
    </header>
  );
}

export default Header;
