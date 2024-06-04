import React from "react";
import ItemCard from "../ItemCard/ItemCard";
import "./ClothesSection.css";

const ClothesSection = ({ clothingItems, onCardClick }) => {
  return (
    <div className="clothes-section">
      <div className="clothes__container">
        <p>Your items</p>
        <button className="clothes__add-button">+ Add New</button>
      </div>
      <ul className="clothes__cards-list">
        {clothingItems.map((item) => {
          return (
            <ItemCard key={item._id} item={item} onCardClick={onCardClick} />
          );
        })}
      </ul>
    </div>
  );
};

export default ClothesSection;
