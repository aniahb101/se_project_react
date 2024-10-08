import React from "react";
import ClothesSection from "../ClothesSection/ClothesSection";
import SideBar from "../SideBar/SideBar";
import "./Profile.css";

const Profile = ({ clothingItems, onCardClick, handleAddClick }) => {
  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar />
      </section>
      <section className="profile__clothes-items">
        <ClothesSection
          clothingItems={clothingItems}
          onCardClick={onCardClick}
          handleAddClick={handleAddClick}
        />
      </section>
    </div>
  );
};

export default Profile;
