/*import React from "react";
import { Route, Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, ...rest }) => {
  const isAuthenticated = localStorage.getItem("token");

  return (
    <Route
      {...rest}
      element={isAuthenticated ? children : <Navigate to="/login" replace />}
    />
  );
};

export default ProtectedRoute;
*/