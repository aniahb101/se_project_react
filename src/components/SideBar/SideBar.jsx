import React from "react";
import "./SideBar.css";
import avatar from "../../images/headericon.png";

const SideBar = ({
  loggedIn,
  userName,
  userAvatar,
  onLogout,
  onChangeProfile,
}) => {
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
