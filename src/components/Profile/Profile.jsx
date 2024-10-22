import React, { useContext } from "react";
import ClothesSection from "../ClothesSection/ClothesSection";
import SideBar from "../SideBar/SideBar";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import "./Profile.css";

const Profile = ({
  clothingItems,
  onCardClick,
  handleAddClick,
  onLogout,
  onChangeProfile,
  onCardLike,
}) => {
  const { currentUser } = useContext(CurrentUserContext);
  return (
    <div className="profile">
      {}
      {currentUser ? (
        <>
          <section className="profile__sidebar">
            <SideBar onLogout={onLogout} onChangeProfile={onChangeProfile} />
          </section>
          <section className="profile__clothes-items">
            <ClothesSection
              clothingItems={clothingItems}
              onCardClick={onCardClick}
              handleAddClick={handleAddClick}
              onCardLike={onCardLike}
            />
          </section>
        </>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
};

export default Profile;
