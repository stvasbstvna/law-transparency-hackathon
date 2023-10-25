import React, { useEffect, useState } from "react";
import "./Favorites.css";
import { useCartContext } from "../contexts/CartContext";
import {
  Box,
  Button,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { DoDisturb } from "@mui/icons-material";
import { useFavouriteContext } from "../contexts/FavouriteContext";
import { useAuthContext } from "../contexts/AuthContext";

function FavoritesPage() {
  const { getFavorite, deleteFavorite, favorit } = useFavouriteContext();
  const { user } = useAuthContext();
  const [filtered, setFiltered] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getFavorite();
  }, []);

  useEffect(() => {
    const filter = favorit.filter((item) => {
      return item.email === user.email;
    });
    setFiltered(filter);
  }, [favorit, user.email]);

  if (filtered.length < 1) {
    return (
      <Box>
        <Typography variant="h4">Favorites Is Empty</Typography>
        <Button onClick={() => navigate(-1)}>Go to Menu</Button>
      </Box>
    );
  }

  return (
    <div style={{ height: '32rem'}}>
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", marginTop: "6rem"}}>
        {filtered.map((item) => (
          <div key={item.id} style={{ width: "250px", margin: "1rem", marginTop: "6rem",padding: "1rem", backgroundColor: "#fff", boxShadow: "0 0 5px rgba(0, 0, 0, 0.1)", borderRadius: "8px", transition: "transform 0.3s ease" }}>
            <div onClick={() => navigate(`/details/${item.item.id}`)}></div>
            <h2 style={{ fontSize: "1.2rem", marginBottom: "1rem", color: "#1877f2" }}>{item.item.title}</h2>
            <div>
              <p style={{ fontSize: "1rem", color: "#606770", margin: "0.5rem 0" }}>{item.item.category}</p>
              <p style={{ fontSize: "1rem", color: "#606770", margin: "0.5rem 0" }}>{item.item.price} $</p>
            </div>
            <div>
              <Button
                variant="contained"
                size="medium"
                style={{ backgroundColor: "#1877f2", color: "#fff", border: "none", padding: "0.5rem 1rem", borderRadius: "4px", cursor: "pointer", transition: "background-color 0.3s ease", height: '3rem' }}
                onClick={(e) => {
                  deleteFavorite(item.id);
                }}
              >
                Delete From Favorites
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FavoritesPage;
