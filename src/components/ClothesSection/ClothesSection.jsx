import React, { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import ItemCard from "../ItemCard/ItemCard";
import "./ClothesSection.css";

const ClothesSection = ({ clothingItems, onCardClick }) => {
  const { currentUser } = useContext(CurrentUserContext) || {};

  if (!Array.isArray(clothingItems)) {
    return <p>No clothing items available.</p>;
  }

  const userItems = clothingItems.filter(
    (item) => item.owner === currentUser?._id
  );

  return (
    <div className="clothes-section">
      <div className="clothes__container">
        <p>Your items</p>
        <button className="clothes__add-button">+ Add New</button>
      </div>
      <ul className="clothes__cards-list">
        {userItems.length > 0 ? (
          userItems.map((item) => (
            <ItemCard key={item._id} item={item} onCardClick={onCardClick} />
          ))
        ) : (
          <p>No items to display.</p>
        )}
      </ul>
    </div>
  );
};

export default ClothesSection;
