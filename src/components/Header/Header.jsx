import "./Header.css";
import logo from "../../images/Logo.png";
import avatar from "../../images/headericon.png";

function Header({ handleAddClick, weatherData }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });
  return (
    <header className="header">
      <img className="header__image" src={logo} />
      <p className="header__location-and-date">
        {currentDate}, {weatherData.city}
      </p>
      <button
        onClick={handleAddClick}
        type="button"
        className="header__add-button"
      >
        + Add clothes
      </button>
      <div className="header__user-container">
        <p className="header__username">Alisha Tegegne</p>
        <img src={avatar} alt="Terrence Tegegne" className="header__avatar" />
      </div>
    </header>
  );
}

export default Header;
