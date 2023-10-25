import React, { useEffect, useState } from "react";
import { useAuthContext } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { useProductContext } from "../contexts/ProductContext";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  Box,
  Button,
  MenuItem,
} from "@mui/material";
import AddProducts from "./AddProducts";

function ProfilePage() {
  const { user } = useAuthContext();
  const { deleteProduct, prodact, getProdact } = useProductContext();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [filtred, setFiltred] = useState([]);

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    setTimeout(() => {
      getProdact();
    }, 50);
  }, []);

  useEffect(() => {
    const filter = prodact.filter((item) => {
      return item.user === user.email;
    });
    setFiltred(filter);
  }, [prodact, user.email]);
  const styles = {
    profileContainer: {
      width: "600px",
      margin: "20px auto",
      marginTop: "13%",
      fontFamily: "Arial, sans-serif",
      color: "#1c1e21",
      backgroundColor: "#f0f2f5",
      padding: "20px",
      borderRadius: "8px",
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    },
    profileHeader: {
      display: "flex",
      alignItems: "center",
      marginBottom: "20px",
    },
    profileImage: {
      width: "100px",
      height: "100px",
      borderRadius: "50%",
      marginRight: "15px",
      border: "2px solid #1877f2",
    },
    userInfo: {
      marginLeft: "10px",
    },
    addButton: {
      display: "block",
      backgroundColor: "#1877f2",
      color: "#ffffff",
      padding: "10px 15px",
      border: "none",
      borderRadius: "4px",
      textDecoration: "none",
      textAlign: "center",
      marginTop: "20px",
    },
    productCard: {
      margin: "20px 0",
      padding: "10px",
      backgroundColor: "#fff",
      borderRadius: "5px",
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    },
  };

  return (
    <div style={styles.profileContainer}>
      <div style={styles.profileHeader}>
        <img src={user.photoURL} alt="user" style={styles.profileImage} />
        <div style={styles.userInfo}>
          <p>{user.email}</p>
          <p>{user.displayName}</p>
          <p>{user.phone}</p>
        </div>
      </div>
      <div>
        <Link to="/add">
          <Button>Add New Product</Button>
        </Link>
      </div>
      <div>
        {filtred.length > 0 ? (
          filtred.map((item) => (
            <div key={item.id} style={styles.productCard}>
              <div>
                {
                  <Box style={{display: "flex", justifyContent: "center"}}>
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
                      Удалить
                    </MenuItem>
                    <MenuItem
                      component={Button}
                      endIcon={<EditIcon />}
                      onClick={() => navigate(`/edit/${item.id}`)}
                    >
                      Изменить
                    </MenuItem>
                  </Box>
                }
              </div>
              <img
                style={{ width: "50%" }}
                src={item.photo}
                alt="product"
                onClick={() => navigate(`/details/${item.id}`)}
              />
              <div>
                <h5>${item.price}</h5>
                <p>{item.category}</p>
                <h4>{item.description.slice(0, 25)}...</h4>
              </div>
            </div>
          ))
        ) : (
          <div>
            <p>There is no your products</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProfilePage;
