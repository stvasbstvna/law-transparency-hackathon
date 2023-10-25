import React, { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Badge, Box, Menu, MenuItem } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkRemoveIcon from "@mui/icons-material/BookmarkRemove";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useProductContext } from "../contexts/ProductContext";
import { useCartContext } from "../contexts/CartContext";
import { useAuthContext } from "../contexts/AuthContext";
import { useFavouriteContext } from "../contexts/FavouriteContext";

export default function ProductItem({ item, likes }) {
  const { deleteProduct, updateProduct } = useProductContext();
  const { addProductToCart, isAlreadyInCart, deleteProductFromCart } =
    useCartContext();
  const [userEmailId, setUserEmailId] = useState(null);
  const [userka, setUserka] = useState(false);
  const { isAdmin, user } = useAuthContext();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const { isAlreadyInFavorite, deleteFavorite, addFavorites, getFavorite } =
    useFavouriteContext();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    getFavorite();
  }, []);

  useEffect(() => {
    if (user) {
      if (typeof user === "boolean") {
        console.log("huinia");
        setUserka(false);
      } else {
        console.log("works");
        setUserka(user.email);
      }
    }
  }, [user]);

  useEffect(() => {
    if (userka) {
      const email = userka;
      const parts = email.split("@");
      const username = parts[0] + item.id;
      setUserEmailId(username);
    }
  }, [userka]);

  function objHolder() {
    const obj = {
      item: item,
      email: userka,
      itemId: item.id,
      id: userEmailId,
    };
    addFavorites(obj);
  }

  function handleAddLike() {
    likes.push(userka);
    const obj = {
      ...item,
      likes,
    };
    updateProduct(item.id, obj);
  }

  function handleRemoveLike() {
    const emailIndex = likes.findIndex((item) => item === userka);

    if (emailIndex !== -1) {
      likes.splice(emailIndex, 1);
      const obj = {
        ...item,
        likes,
      };
      updateProduct(item.id, obj);
    }
  }

  const cardStyle = {
    border: "1px solid #ccc",
    borderRadius: "8px",
    padding: "10px",
    display: "flex",
    flexDirection: "column", // Updated to column layout
    alignItems: "flex-start", // Align items to the start of the column
    maxWidth: "800px",
    margin: "0 auto",
    boxShadow: '1px 2px 9px gray'
  };

  const imageStyle = {
    margin: "10px auto",
    objectFit: "cover",
    width: "auto",
    height: "350px",
    objectFit: "cover",
    borderRadius: "8px",
    cursor: "pointer",
    marginLeft: "80px",
  };

  const detailsStyle = {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1, // Allow details to take available space
  };

  const titleStyle = {
    fontSize: "18px",
    marginBottom: "10px",
  };

  const descriptionStyle = {
    fontSize: "14px",
    width: "80%",
    display: "flex",
    margin: "5px auto",
  };

  return (
    <div style={cardStyle}>
      <div style={{ position: "relative"}}>
        {" "}
        {/* Wrap the content in a relative position container */}
        {userka ? (
          isAdmin() || userka === item.user ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                position: "absolute",
                top: "20px", // Adjust top position to create space for the menu
                right: "10px", // Adjust right position to create space for the menu
                zIndex: 1, // Set zIndex to make the menu appear above other content
              }}
            ></Box>
          ) : (
            ""
          )
        ) : (
          ""
        )}
        <img
          src={item.photo}
          alt={item.title}
          style={imageStyle}
          onClick={() => navigate(`/details/${item.id}`)}
        />
        <IconButton
          style={{ backgroundColor: "white", marginTop:"-90%"}}
          onClick={handleClick}
          aria-label="settings"
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem
            component={Button}
            endIcon={<DeleteIcon />}
            onClick={() => {
              const a = window.confirm("Are you sure?");
              if (a) {
                deleteProduct(item.id);
              }
            }}
          >
            Delete
          </MenuItem>
          <MenuItem
            component={Button}
            endIcon={<EditIcon />}
            onClick={() => navigate(`/edit/${item.id}`)}
          >
            Edit
          </MenuItem>
        </Menu>
      </div>

      <div style={detailsStyle}>
        <h2 style={titleStyle}>{item.title}</h2>
        <p style={descriptionStyle}>{item.description}</p>
      </div>

      {/* Icons at the bottom */}
      <div
        style={{
          display: "flex",
          margin: "0 auto",
        }}
      >
        {userka && user ? (
          likes.includes(userka) ? (
            <IconButton onClick={handleRemoveLike}>
              <Badge badgeContent={likes.length} color="error">
                <FavoriteIcon />
              </Badge>
            </IconButton>
          ) : (
            <IconButton onClick={handleAddLike}>
              <Badge badgeContent={likes.length} color="error">
                <FavoriteBorderIcon />
              </Badge>
            </IconButton>
          )
        ) : (
          ""
        )}

        {isAlreadyInCart(item.id) ? (
          <IconButton
            onClick={() => deleteProductFromCart(item.id)}
            aria-label="share"
          >
            <RemoveShoppingCartIcon />
          </IconButton>
        ) : (
          <IconButton onClick={() => addProductToCart(item)} aria-label="share">
            <AddShoppingCartIcon />
          </IconButton>
        )}

        {isAlreadyInFavorite(item.id) ? (
          <Button>
            <BookmarkRemoveIcon onClick={() => deleteFavorite(userEmailId)} />
          </Button>
        ) : (
          <Button onClick={objHolder}>
            <BookmarkIcon />
          </Button>
        )}
      </div>
    </div>
  );
}
