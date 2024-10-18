import { useContext, useState } from "react";
import "./ItemCard.css";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function ItemCard({ item, onCardClick, onCardLike }) {
  const { currentUser } = useContext(CurrentUserContext);
  const [isLiked, setIsLiked] = useState(
    Array.isArray(item.likes) && currentUser
      ? item.likes.some((id) => id === currentUser._id)
      : false
  );
  const [isProcessingLike, setIsProcessingLike] = useState(false);

  const itemLikeButtonClassName = `card__like-button ${
    isLiked ? "card__like-button_liked" : ""
  }`;

  const handleCardClick = () => {
    onCardClick(item);
  };

  const handleLike = () => {
    if (isProcessingLike) return;

    const newLikedState = !isLiked;
    setIsProcessingLike(true);

    onCardLike({ id: item._id, isLiked: newLikedState })
      .then(() => {
        setIsLiked(newLikedState);
      })
      .catch((err) => {
        console.error("Error toggling like:", err);
      })
      .finally(() => {
        setIsProcessingLike(false);
      });
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
          disabled={isProcessingLike}
          aria-label={isLiked ? "Unlike" : "Like"}
        />
      )}
    </li>
  );
}

export default ItemCard;
