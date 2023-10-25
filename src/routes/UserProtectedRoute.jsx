import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";
import { notify } from "../components/Toastify";

const UserProtectedRoute = () => {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  if (!user) {
    notify("only signed users can use this panel");
    return navigate("/");
  }
  return <Outlet />;
};

export default UserProtectedRoute;
