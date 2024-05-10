import "./Main.css";
import WeatherCard from "../WeatherCard/WeatherCard";
import { defaultClothingItems } from "../../Utils/Constants";
import ItemCard from "../ItemCard/ItemCard";

function Main({ weatherData }) {
  return (
    <main>
      <WeatherCard />
      <section className="cards">
        <p className="card__text">Today is 75° F / You may want to wear:</p>
        <ul className="cards__list">
          {defaultClothingItems
            // .filter((item) => {
            //  return item.weather === weatherData.type;
            //})

            .map((item) => {
              return <ItemCard key={item._id} item={item} />;
            })}
        </ul>
      </section>
    </main>
  );
}

export default Main;
