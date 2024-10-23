import React, { useState, useEffect } from "react";
import "./ProfileEditModal.css";

const ProfileEditModal = ({
  isOpen,
  onClose,
  currentName,
  currentAvatar,
  onSaveChanges,
  buttonText = "Save",
  isLoading,
}) => {
  const [name, setName] = useState(currentName);
  const [avatar, setAvatar] = useState(currentAvatar);

  useEffect(() => {
    setName(currentName);
    setAvatar(currentAvatar);
  }, [currentName, currentAvatar]);

  const handleSave = () => {
    onSaveChanges({ name, avatar });
  };

  if (!isOpen) return null;

  return (
    <div className="profile-edit-modal">
      <div className="profile-edit-modal__content">
        <button
          className="profile-edit-modal__close"
          onClick={onClose}
        ></button>
        <h2 className="profile-data__text">Change Profile Data</h2>
        <div className="profile-edit-modal__name">
          <label className="profile-name__label">Name*</label>
          <input
            className="profile-edit__text"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter new name"
            disabled={isLoading}
          />
        </div>
        <div className="profile-edit-modal__avatar">
          <label className="profile-avatar__label">Avatar URL*</label>
          <input
            className="profile-edit__text"
            type="url"
            value={avatar}
            onChange={(e) => setAvatar(e.target.value)}
            placeholder="Enter new avatar URL"
            disabled={isLoading}
          />
        </div>
        <button
          className="profile-edit-modal__button"
          onClick={handleSave}
          disabled={isLoading}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default ProfileEditModal;
