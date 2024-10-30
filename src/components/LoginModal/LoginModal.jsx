import React, { useState, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./LoginModal.css";

function LoginModal({ onClose, onLoginSuccess, switchToRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    onLoginSuccess({ email, password })
      .then(() => onClose())
      .catch((err) => setError("Login failed: " + err.message))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    const allFieldsFilled = email && password;
    setIsButtonDisabled(!allFieldsFilled);
  }, [email, password]);

  return (
    <ModalWithForm
      titleText="Log In"
      buttonText={isLoading ? "Logging in..." : "Login"}
      isOpen={true}
      closeActiveModal={onClose}
      onSubmit={handleSubmit}
      showButton={false}
    >
      <div className="login-modal__field">
        <label htmlFor="email" className="login-modal__label">
          Email
        </label>
        <input
          id="email"
          className="login-modal__input"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="login-modal__field">
        <label htmlFor="password" className="login-modal__label">
          Password
        </label>
        <input
          id="password"
          className="login-modal__input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      {error && <p className="login-modal__error">{error}</p>}

      <div className="login-modal__button-container">
        <button
          className={`login-modal__button ${
            isButtonDisabled ? "button_disabled" : ""
          }`}
          type="submit"
          disabled={isButtonDisabled || isLoading}
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>
        <div className="login-signup_button" onClick={switchToRegister}>
          or Sign Up
        </div>
      </div>
    </ModalWithForm>
  );
}

export default LoginModal;
