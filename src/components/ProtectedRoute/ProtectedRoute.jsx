import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ element: Element, loggedIn }) {
  return loggedIn ? <Element /> : <Navigate to="/" />;
}

export default ProtectedRoute;
