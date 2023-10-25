import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuthContext } from "./AuthContext";
import { APIfavorites } from "../utils/consts";
import axios from "axios";
import { notify } from "../components/Toastify";

const favouriteContext = createContext();

export function useFavouriteContext() {
  return useContext(favouriteContext);
}

function FavouriteContext({ children }) {
  const { user } = useAuthContext();
  const [favorit, setFavorit] = useState([]);

  async function getFavorite() {
    try {
      const { data } = await axios.get(APIfavorites);
      setFavorit(data);
    } catch (e) {
      notify(`${e.response.status}: ${e.response.statusText}`, "error");
    }
  }

  useEffect(() => {
    getFavorite();
  }, []);

  async function addFavorites(obj) {
    try {
      await axios.post(APIfavorites, obj);
      setFavorit((prevFavorites) => [...prevFavorites, obj]);
      notify("Added to favorites successfully");
    } catch (e) {
      notify(`${e.response.status}: ${e.response.statusText}`, "error");
    }
  }

  async function deleteFavorite(id) {
    try {
      await axios.delete(`${APIfavorites}/${id}`);
      setFavorit((prevFavorites) =>
        prevFavorites.filter((item) => item.id !== id)
      );
    } catch (e) {
      notify(`${e.response.status}: ${e.response.statusText}`, "error");
    }
  }

  const isAlreadyInFavorite = (id) => {
    if (user && typeof user.email === "string") {
      return favorit.some(
        (item) => item.email === user.email && item.itemId === id
      );
    }
    return false; // Return false when user is null or user.email is not a string
  };

  const value = {
    getFavorite,
    addFavorites,
    favorit,
    isAlreadyInFavorite,
    deleteFavorite,
  };

  return (
    <favouriteContext.Provider value={value}>
      {children}
    </favouriteContext.Provider>
  );
}

export default FavouriteContext;
