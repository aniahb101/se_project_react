import { useContext, useState } from "react";
import "./ItemCard.css";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function ItemCard({ item, onCardClick, onCardLike }) {
  const { currentUser } = useContext(CurrentUserContext);
  const [isLiked, setIsLiked] = useState(
    item.likes.some((id) => id === currentUser?._id)
  );

  const itemLikeButtonClassName = `card__like-button ${
    isLiked ? "card__like-button_liked" : ""
  }`;

  const handleCardClick = () => {
    onCardClick(item);
  };

  const handleLike = () => {
    const newLikedState = !isLiked;
    setIsLiked(newLikedState);

    onCardLike({ id: item._id, isLiked: newLikedState });
  };

  return (
    <li className="card">
      <h2 className="card__name">{item.name}</h2>
      <img
        onClick={handleCardClick}
        className="card__image"
        src={item.imageUrl}
        alt={item.name}
      />
      {currentUser && (
        <button
          className={itemLikeButtonClassName}
          onClick={handleLike}
          aria-label={isLiked ? "Unlike" : "Like"}
        />
      )}
    </li>
  );
}

export default ItemCard;
