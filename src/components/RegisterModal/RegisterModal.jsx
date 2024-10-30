import React, { useState, useEffect, useId } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { register } from "../../utils/auth";
import "./RegisterModal.css";

function RegisterModal({ onClose, onRegisterSuccess, switchToLogin }) {
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const nameId = useId();
  const avatarId = useId();
  const emailId = useId();
  const passwordId = useId();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    register({ name, avatar, email, password })
      .then((data) => {
        onRegisterSuccess(data);
        onClose();
      })
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    const allFieldsFilled = name && avatar && email && password;
    setIsButtonDisabled(!allFieldsFilled);
  }, [name, avatar, email, password]);

  return (
    <ModalWithForm
      titleText="Sign Up"
      buttonText={isLoading ? "Signing up..." : "Sign Up"}
      isOpen={true}
      closeActiveModal={onClose}
      onSubmit={handleSubmit}
      showButton={false}
    >
      <div className="register-modal__field">
        <label htmlFor={nameId} className="register-modal__label">
          Name
        </label>
        <input
          id={nameId}
          className="register-modal__input"
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="register-modal__field">
        <label htmlFor={avatarId} className="register-modal__label">
          Avatar URL
        </label>
        <input
          id={avatarId}
          className="register-modal__input"
          type="url"
          placeholder="Avatar URL"
          value={avatar}
          onChange={(e) => setAvatar(e.target.value)}
          required
        />
      </div>
      <div className="register-modal__field">
        <label htmlFor={emailId} className="register-modal__label">
          Email
        </label>
        <input
          id={emailId}
          className="register-modal__input"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="register-modal__field">
        <label htmlFor={passwordId} className="register-modal__label">
          Password
        </label>
        <input
          id={passwordId}
          className="register-modal__input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      {error && <p className="register-modal__error">{error}</p>}

      <div className="register-modal__button-container">
        <button
          className={`register-modal__button ${
            isButtonDisabled ? "button_disabled" : ""
          }`}
          type="submit"
          disabled={isButtonDisabled || isLoading}
        >
          {isLoading ? "Signing up..." : "Sign Up"}
        </button>
        <div className="login-signup_button" onClick={switchToLogin}>
          or Log In
        </div>
      </div>
    </ModalWithForm>
  );
}

export default RegisterModal;
