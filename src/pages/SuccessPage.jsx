import { Box, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCartContext } from "../contexts/CartContext";
import { runConfetti } from "../utils/confetti";

const SuccessPage = () => {
  const { clearCart } = useCartContext();
  const navigate = useNavigate();

  useEffect(() => {
    clearCart();
    runConfetti();
    setTimeout(() => {
      navigate("/");
    }, 5000);
  }, []);
  return (
    <Box>
      <Typography variant="h2">Thank you for your order!</Typography>
    </Box>
  );
};

export default SuccessPage;
