import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PriavateRoute = () => {
  const auth = localStorage.getItem("token");
  return auth && auth != null ? <Outlet /> : <Navigate to="/login" />;
};

export default PriavateRoute;
