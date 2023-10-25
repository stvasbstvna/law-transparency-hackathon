import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import Toastify from "./components/Toastify";
import ProductContext from "./contexts/ProductContext";
import AuthContext from "./contexts/AuthContext";
import FavouriteContext from "./contexts/FavouriteContext";
import CommentsContext from "./contexts/CommentsContext";
import CartContext from "./contexts/CartContext";
import UserContext from "./contexts/UserContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <AuthContext>
      <UserContext>
        <CartContext>
          <FavouriteContext>
            <ProductContext>
              <CommentsContext>
                <Toastify />
                <App />
              </CommentsContext>
            </ProductContext>
          </FavouriteContext>
        </CartContext>
      </UserContext>
    </AuthContext>
  </BrowserRouter>
);
