import React, { useState, useEffect } from "react";
import { register } from "../../utils/auth";
import "./RegisterModal.css";

function RegisterModal({ onClose, onRegisterSuccess }) {
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    register({ name, avatar, email, password })
      .then((data) => {
        onRegisterSuccess(data);
        onClose();
      })
      .catch((err) => setError(err.message));
  };

  useEffect(() => {
    const allFieldsFilled = name && avatar && email && password;
    setIsButtonDisabled(!allFieldsFilled);
  }, [name, avatar, email, password]);

  return (
    <div className="register-modal modal_opened">
      <button
        onClick={onClose}
        type="button"
        className="register-modal__close"
      ></button>
      <h2 className="register-modal__title">Sign Up</h2>
      <form className="register-modal__form" onSubmit={handleSubmit}>
        <div className="register-modal__field">
          <label htmlFor="name" className="register-modal__label">
            Name
          </label>
          <input
            id="name"
            className="register-modal__input"
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="register-modal__field">
          <label htmlFor="avatar" className="register-modal__label">
            Avatar URL
          </label>
          <input
            id="avatar"
            className="register-modal__input"
            type="url"
            placeholder="Avatar URL"
            value={avatar}
            onChange={(e) => setAvatar(e.target.value)}
            required
          />
        </div>
        <div className="register-modal__field">
          <label htmlFor="email" className="register-modal__label">
            Email
          </label>
          <input
            id="email"
            className="register-modal__input"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="register-modal__field">
          <label htmlFor="password" className="register-modal__label">
            Password
          </label>
          <input
            id="password"
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
            disabled={isButtonDisabled}
          >
            Sign Up
          </button>
          <div className="login-signup_button">or Log In</div>
        </div>
      </form>
    </div>
  );
}

export default RegisterModal;
