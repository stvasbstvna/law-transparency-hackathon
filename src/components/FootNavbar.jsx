import { Box, Button } from "@mui/material";
import React from "react";
import HomeIcon from "@mui/icons-material/Home";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Person3Icon from "@mui/icons-material/Person3";
import { Link } from "react-router-dom";

function FootNavbar() {
  return (
    <Box
      className="foot-navbar"
      position="sticky"
      style={{marginTop: "8%"}}
    >
      <Button component={Link} to="/">
        <HomeIcon fontSize="large" />
      </Button>
      <Button component={Link} to="/fav">
        <BookmarkIcon fontSize="large" />
      </Button>
      <Button component={Link} to="/add">
        <AddCircleIcon fontSize="large" />
      </Button>
      <Button component={Link} to="/profile">
        <Person3Icon fontSize="large" />
      </Button>
    </Box>
  );
}

export default FootNavbar;
