import React, { useState, useEffect, useId } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
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

  const nameId = useId();
  const avatarId = useId();

  useEffect(() => {
    setName(currentName);
    setAvatar(currentAvatar);
  }, [currentName, currentAvatar]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSaveChanges({ name, avatar });
  };

  return (
    <div className="profile-edit-modal">
      <ModalWithForm
        titleText="Change Profile Data"
        buttonText={isLoading ? "Saving..." : buttonText}
        isOpen={isOpen}
        closeActiveModal={onClose}
        onSubmit={handleSubmit}
      >
        <div className="profile-edit-modal__name">
          <label className="profile-name__label" htmlFor={nameId}>
            Name*
          </label>
          <input
            id={nameId}
            className="profile-edit__text"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter new name"
            disabled={isLoading}
          />
        </div>
        <div className="profile-edit-modal__avatar">
          <label className="profile-avatar__label" htmlFor={avatarId}>
            Avatar URL*
          </label>
          <input
            id={avatarId}
            className="profile-edit__text"
            type="url"
            value={avatar}
            onChange={(e) => setAvatar(e.target.value)}
            placeholder="Enter new avatar URL"
            disabled={isLoading}
          />
        </div>
      </ModalWithForm>
    </div>
  );
};

export default ProfileEditModal;
