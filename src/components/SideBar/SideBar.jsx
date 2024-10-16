import React, { useContext } from "react";
import "./SideBar.css";
import avatarPlaceholder from "../../images/headericon.png";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

const SideBar = ({ onLogout, onChangeProfile }) => {
  const { currentUser } = useContext(CurrentUserContext);

  return (
    <div className="sidebar">
      {currentUser && (
        <>
          <div className="sidebar__user-info">
            <img
              className="sidebar__avatar"
              src={currentUser.avatar || avatarPlaceholder}
              alt={currentUser.name || "User Avatar"}
            />
            <p className="sidebar__username">{currentUser.name}</p>
          </div>

          <button className="sidebar__button" onClick={onChangeProfile}>
            Change profile data
          </button>
          <button className="sidebar__button" onClick={onLogout}>
            Log out
          </button>
        </>
      )}
    </div>
  );
};

export default SideBar;
