import React, { useState } from "react";
import "./SideBar.css";
import avatar from "../../images/headericon.png";
import ProfileEditModal from "../ProfileEditModal/ProfileEditModal";

const SideBar = ({
  loggedIn,
  userName,
  userAvatar,
  onLogout,
  onSaveProfileChanges,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <div className="sidebar">
      {loggedIn && (
        <>
          <div className="sidebar__user-info">
            <img
              className="sidebar__avatar"
              src={userAvatar || avatar}
              alt={userName}
            />
            <p className="sidebar__username">{userName}</p>
          </div>

          <button className="sidebar__button" onClick={handleOpenModal}>
            Change profile data
          </button>
          <button className="sidebar__button" onClick={onLogout}>
            Log out
          </button>

          <ProfileEditModal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            currentName={userName}
            currentAvatar={userAvatar}
            onSaveChanges={onSaveProfileChanges}
          />
        </>
      )}
    </div>
  );
};

export default SideBar;
