import React, { createContext, useContext, useEffect, useState } from "react";
import { notify } from "../components/Toastify";

const cartContext = createContext();

export function useCartContext() {
  return useContext(cartContext);
}

const initState = {
  products: [],
  totalPrice: 0,
};

function getCartFromLS() {
  let data = JSON.parse(localStorage.getItem("cart"));
  if (!data) {
    data = {
      products: [],
      totalPrice: 0,
    };
  }
  return data;
}

function CartContext({ children }) {
  const [cart, setCart] = useState(initState);

  console.log(getCartFromLS());

  function getCart() {
    const data = getCartFromLS();
    setCart(data);
  }

  function addProductToCart(product) {
    const data = getCartFromLS();
    data.products.push({ ...product, count: 1, subPrice: product.price });

    data.totalPrice = data.products.reduce(
      (acc, item) => acc + item.subPrice,
      0
    );

    localStorage.setItem("cart", JSON.stringify(data));
    getCart();

    notify("added", "success");
  }

  function deleteProductFromCart(id) {
    const data = getCartFromLS();
    data.products = data.products.filter((item) => item.id !== id);
    data.totalPrice = data.products.reduce(
      (acc, item) => acc + item.subPrice,
      0
    );
    localStorage.setItem("cart", JSON.stringify(data));
    getCart();
    notify("deleted", "success");
  }

  function isAlreadyInCart(id) {
    const data = getCartFromLS();
    const isInCart = data.products.some((item) => item.id === id);
    return isInCart;
  }

  function increaseCount(id) {
    const data = getCartFromLS();

    data.products = data.products.map((item) => {
      if (item.id === id) {
        item.count += 1;
        item.subPrice += item.price;
      }
      return item;
    });

    data.totalPrice = data.products.reduce(
      (acc, item) => acc + item.subPrice,
      0
    );

    localStorage.setItem("cart", JSON.stringify(data));
    getCart();
  }

  function decreaseCount(id) {
    const data = getCartFromLS();

    data.products = data.products.map((item) => {
      if (item.id === id) {
        item.count -= 1;
        item.subPrice -= item.price;
      }

      return item;
    });

    data.totalPrice = data.products.reduce(
      (acc, item) => acc + item.subPrice,
      0
    );

    localStorage.setItem("cart", JSON.stringify(data));
    getCart();
  }

  function clearCart() {
    localStorage.removeItem("cart");
    getCart();
  }

  const value = {
    cart,
    getCart,
    addProductToCart,
    isAlreadyInCart,
    deleteProductFromCart,
    increaseCount,
    decreaseCount,
    clearCart,
  };
  return <cartContext.Provider value={value}>{children}</cartContext.Provider>;
}

export default CartContext;
