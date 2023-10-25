import React, { useEffect, useState } from "react";
import {
  Link,
  NavLink,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import { useAuthContext } from "../contexts/AuthContext";
import { Avatar, Button, Menu, MenuItem } from "@mui/material";
import { useProductContext } from "../contexts/ProductContext";
import LiveSearch from "./LiveSearch";
import { useCartContext } from "../contexts/CartContext";
import { useFavouriteContext } from "../contexts/FavouriteContext";
import "./Navbar.css";
import logo from "./sozLogotip.png";
const pages = [
  {
    title: "New Product",
    link: "/add",
  },
];

export default function Navbar() {
  const { user, logout, isAdmin } = useAuthContext();
  const { setPage } = useProductContext();
  const { cart, getCart } = useCartContext();
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [userka, setUserka] = useState(false);
  const [filtered, setFiltered] = useState(0);
  const { getFavorite, deleteFavorite, favorit } = useFavouriteContext();

  useEffect(() => {
    getCart();
    getFavorite();
  }, []);

  useEffect(() => {
    if (user) {
      const filter = favorit.filter((item) => {
        return item.email === user.email;
      });
      setFiltered(filter.length);
    }
  }, [favorit]);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    if (user) {
      if (typeof user === "boolean") {
        setUserka(false);
      } else {
        setUserka({ displayName: user.displayName });
      }
    } else {
      setUserka(false);
    }
  }, [user]);

  return (
    <Box className="perevet">
      <AppBar position="fixed" className="containerNav">
        <Toolbar className="nav-item-middle navbar-components">
          <Box className="navLogo">
            <Typography
              variant="h6"
              noWrap
              component={Box}
              style={{
                cursor: "pointer",
                fontSize: "2.3rem",
                fontWeight: "700",
              }}
              onClick={(e) => {
                if (location.pathname === "/") {
                  return;
                }

                setPage(1);
                navigate("/");
              }}
            >
              <img style={{ marginTop: "-35%" }} src={logo} alt="logo" />
            </Typography>
          </Box>

          <Box className="sideNavigation">
            {location.pathname === "/" && (
              <LiveSearch className="nav-item-middle-search navSearch" />
            )}
            <NavLink className="sideNavig">Сообщества</NavLink>
            <NavLink className="sideNavig">Новости</NavLink>
            <NavLink className="sideNavig">Успешные законы</NavLink>
            <NavLink className="sideNavig">Аналитика</NavLink>
          </Box>

          {userka &&
            pages.map((page, index) => {
              return (
                <Box className="sideAddCont">
                  <NavLink className="sideAdd">Связаться</NavLink>
                  <NavLink to="/add" className="sideAdd">
                    Добавить
                  </NavLink>
                </Box>
              );
            })}

          {userka ? <></> : ""}
        </Toolbar>

        <Box className="navLogin">
          {!user ? (
            <Link to="/auth" component={Link}>
              <button className="sideAdd">Войти</button>
            </Link>
          ) : (
            <>
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-haspopup="true"
                id="demo-positioned-button"
                aria-controls={open ? "demo-positioned-menu" : undefined}
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
                color="inherit"
              >
                <Avatar
                  src={
                    "https://yandex.ru/images/search?text=picture+user&img_url=https%3A%2F%2Fsun9-74.userapi.com%2Fimpf%2Fc830108%2Fv830108411%2F10cf1%2FTfWCNQvXD04.jpg%3Fsize%3D512x512%26quality%3D96%26sign%3Db17a70bc75e40ad08e90e5a3c0816c5e%26c_uniq_tag%3D_vx77grxmzxm7F5cI68HiAfL3ENBT1312YqVCWsy62o%26type%3Dalbum&pos=0&rpt=simage&stype=image&lr=10309&parent-reqid=1690780706119279-6151150964058339298-balancer-l7leveler-kubr-yp-vla-106-BAL-9810&source=serp"
                  }
                  alt={userka.displayName}
                >
                  {userka.displayName && userka.displayName.split(" ")[0][0]}
                  {userka.displayName &&
                    userka.displayName.includes(" ") &&
                    userka.displayName.split(" ")[1][0]}
                </Avatar>
                <MenuItem
                  onClick={() => {
                    handleClose();
                    navigate("/profile");
                  }}
                >
                  Профиль
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleClose();
                    logout();
                  }}
                >
                  Выйти
                </MenuItem>
              </IconButton>
            </>
          )}
        </Box>
      </AppBar>
    </Box>
  );
}
