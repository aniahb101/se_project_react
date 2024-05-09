import "./Header.css";
import logo from "../../Images/Logo.png";
import avatar from "../../Images/Ellipse 18.png";

function Header() {
  return (
    <header className="header">
      <img className="header__image" src={logo} />
      <p className="header__location-and-date"></p>
      <button className="header__add-button">+ Add clothes</button>
      <div className="header__user-container">
        <p className="header__username">Terrence Tegegne</p>
        <img src={avatar} alt="Terrence Tegegne" className="header__avatar" />
      </div>
    </header>
  );
}

export default Header;
