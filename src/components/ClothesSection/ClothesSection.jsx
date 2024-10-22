import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import ItemCard from "../ItemCard/ItemCard";
import "./ClothesSection.css";

const ClothesSection = ({
  clothingItems = [],
  onCardClick,
  handleAddClick,
  onCardLike,
}) => {
  const { currentUser } = useContext(CurrentUserContext);

  console.log("clothingItems in ClothesSection:", clothingItems);
  console.log("Current User in ClothesSection:", currentUser);

  const userItems = Array.isArray(clothingItems)
    ? clothingItems.filter((item) => {
        console.log(
          "Item owner:",
          item.owner,
          "Current user ID:",
          currentUser?._id
        );
        return item.owner === currentUser?._id;
      })
    : [];

  return (
    <div className="clothes-section">
      <div className="clothes__container">
        <p>Your items</p>
        {currentUser && (
          <button className="clothes__add-button" onClick={handleAddClick}>
            + Add New
          </button>
        )}
      </div>
      <ul className="clothes__cards-list">
        {userItems.length > 0 ? (
          userItems.map((item) => (
            <ItemCard
              key={item._id}
              item={item}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
            />
          ))
        ) : (
          <p>
            {currentUser
              ? "You have no items. Start by adding new items!"
              : "No items to display."}
          </p>
        )}
      </ul>
    </div>
  );
};

export default ClothesSection;
