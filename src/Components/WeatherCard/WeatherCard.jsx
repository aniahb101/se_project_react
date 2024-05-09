import sunnycard from "../../Images/sunnycard.png";
import "./WeatherCard.css";

function WeatherCard() {
  return (
    <section className="weather-card">
      <p className="weather-card__temp">75</p>
      <img src={sunnycard} alt="sunny card" className="weather-card__image" />
    </section>
  );
}

export default WeatherCard;
