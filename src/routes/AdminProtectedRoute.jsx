import React from "react";
import { useAuthContext } from "../contexts/AuthContext";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { notify } from "../components/Toastify";

const AdminProtectedRoute = () => {
  const navigate = useNavigate();
  const { isAdmin } = useAuthContext();
  if (!isAdmin()) {
    notify("Only admin can access this page", "default");
    setTimeout(() => {
      return navigate(-1);
    }, 1);
  }
  return <Outlet />;
};

export default AdminProtectedRoute;
