import React from "react";
import { Route, Navigate } from "react-router-dom";

function ProtectedRoute({ element: Element, ...rest }) {
  const isAuthenticated = localStorage.getItem("jwt");

  return (
    <Route
      {...rest}
      element={isAuthenticated ? <Element /> : <Navigate to="/" />}
    />
  );
}

export default ProtectedRoute;
