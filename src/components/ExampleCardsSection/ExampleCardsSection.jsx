import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import ItemCard from "../ItemCard/ItemCard";
import "./ExampleCardsSection.css";

const defaultClothingItems = [
  {
    _id: 0,
    name: "Cap",
    weather: "hot",
    imageUrl:
      "https://images.unsplash.com/photo-1592367630397-65872fe016e9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    _id: 1,
    name: "Hoodie",
    weather: "warm",
    imageUrl:
      "https://images.unsplash.com/photo-1620799140188-3b2a02fd9a77?q=80&w=1972&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    _id: 2,
    name: "Jacket",
    weather: "cold",
    imageUrl:
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1936&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    _id: 3,
    name: "Sneakers",
    weather: "cold",
    imageUrl:
      "https://images.unsplash.com/photo-1603787081151-cbebeef20092?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    _id: 4,
    name: "T-Shirt",
    weather: "hot",
    imageUrl:
      "https://images.unsplash.com/photo-1618677603544-51162346e165?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    _id: 5,
    name: "Coat",
    weather: "cold",
    imageUrl:
      "https://images.unsplash.com/photo-1543076447-215ad9ba6923?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

const dressItem = {
  _id: "dress",
  name: "Dress",
  weather: "warm",
  imageUrl:
    "https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
};

const ExampleCardsSection = ({ onCardClick, onCardLike, weatherData }) => {
  const { currentUser } = useContext(CurrentUserContext);
  if (currentUser) return null;
  const getWeatherCategory = (temp) => {
    if (temp >= 85) return "hot";
    if (temp >= 65) return "warm";
    return "cold";
  };
  const currentTemp = weatherData?.temp?.F;
  const weatherCategory = currentTemp ? getWeatherCategory(currentTemp) : null;
  const allItems = [...defaultClothingItems, dressItem];
  const filteredItems = weatherCategory
    ? allItems.filter((item) => item.weather === weatherCategory)
    : allItems;
  return (
    <div className="example-cards-section">
      <ul className="example-cards-list">
        {filteredItems.map((item) => (
          <ItemCard
            key={item._id}
            item={item}
            onCardClick={onCardClick}
            onCardLike={onCardLike}
          />
        ))}
      </ul>
    </div>
  );
};

export default ExampleCardsSection;
