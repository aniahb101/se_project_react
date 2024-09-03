import React, { useState, useEffect } from "react";
import { authorize } from "../../utils/auth";
import "./LoginModal.css";

function LoginModal({ onClose, onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    authorize({ email, password })
      .then((data) => {
        onLoginSuccess(data);
        onClose();
      })
      .catch((err) => setError(err.message));
  };

  useEffect(() => {
    const allFieldsFilled = email && password;
    setIsButtonDisabled(!allFieldsFilled);
  }, [email, password]);

  return (
    <div className="login-modal modal_opened">
      <button
        onClick={onClose}
        type="button"
        className="login-modal__close"
      ></button>
      <h2 className="login-modal__title">Log In</h2>
      <form className="login-modal__form" onSubmit={handleSubmit}>
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
            disabled={isButtonDisabled}
          >
            Login
          </button>
          <div className="login-signup_button">or Sign Up</div>
        </div>
      </form>
    </div>
  );
}

export default LoginModal;
