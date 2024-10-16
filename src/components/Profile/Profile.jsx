import React, { useContext } from "react";
import ClothesSection from "../ClothesSection/ClothesSection";
import SideBar from "../SideBar/SideBar";
import { CurrentUserContext } from "../../contexts/CurrentUserContext"; // Import the context
import "./Profile.css";

const Profile = ({
  clothingItems,
  onCardClick,
  handleAddClick,
  onLogout,
  onChangeProfile,
}) => {
  const { currentUser } = useContext(CurrentUserContext); // Access current user from context

  return (
    <div className="profile">
      {/* Check if the user is logged in (currentUser exists) */}
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
            />
          </section>
        </>
      ) : (
        <p>Loading profile...</p> // Show a loading message or redirect if not logged in
      )}
    </div>
  );
};

export default Profile;
