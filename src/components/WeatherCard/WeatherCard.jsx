import React, { useContext } from "react";
import "./WeatherCard.css";
import { weatherOptions } from "../../utils/Constants";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";

function WeatherCard({ weatherData }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  const temp = weatherData.temp?.[currentTemperatureUnit] || 85;

  const weatherOption = weatherOptions.find((option) => {
    return (
      option.day === weatherData.isDay &&
      option.condition === weatherData.condition
    );
  });

  const defaultImageUrl = "./images/day/default.png";

  return (
    <section className="weather-card">
      <p className="weather-card__temp">
        {temp} &deg; {currentTemperatureUnit === "F" ? "F" : "C"}
      </p>
      <img
        src={weatherOption ? weatherOption.url : defaultImageUrl}
        alt={`card showing ${weatherOption?.day ? "day" : "night"} time ${
          weatherOption?.condition
        } weather`}
        className="weather-card__image"
        onError={(e) => {
          e.target.src = defaultImageUrl;
        }}
      />
    </section>
  );
}

export default WeatherCard;
