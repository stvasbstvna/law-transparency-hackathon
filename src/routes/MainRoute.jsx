import React from "react";
import { Route, Routes } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import HomePage from "../pages/HomePage";
import NotFoundPage from "../pages/NotFoundPage";
import EditPage from "../pages/EditPage";
import AddProducts from "../pages/AddProducts";
import AuthPage from "../pages/AuthPage";
import DetailsPage from "../pages/DetailsPage";
import UserProtectedRoute from "./UserProtectedRoute";
import FavoritesPage from "../pages/Favorites";
import SuccessPage from "../pages/SuccessPage";
import ProfilePage from "../pages/ProfilePage";

function MainRoute() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/details/:id" element={<DetailsPage />} />
        <Route element={<UserProtectedRoute />}>
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/add" element={<AddProducts />} />

          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/fav" element={<FavoritesPage />} />

          <Route path="/edit/:id" element={<EditPage />} />
        </Route>
      </Route>

      <Route path="/auth" element={<AuthPage />} />

      <Route path="/success" element={<SuccessPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default MainRoute;
