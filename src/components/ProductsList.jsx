import React, { useEffect } from "react";
import { useProductContext } from "../contexts/ProductContext";
import ProductItem from "./ProductItem";
import { Box, Typography } from "@mui/material";

function ProductsList() {
  const { getProducts, products } = useProductContext();
  useEffect(() => {
    setTimeout(() => {
      getProducts();
    }, 50);
  }, []);
  return (
    <Box>
      <Box style={{ display: "flex", justifyContent: "center" }}>
        <Typography
          variant="h4"
          style={{
            margin: "5%",
            cursor: "pointer",
            width: "50%",
            boxShadow: "1px 2px 9px gray",
            height: "50px",
            borderRadius: "15px",
          }}
        >
          Все
        </Typography>
        <Typography
          variant="h4"
          style={{
            margin: "5%",
            cursor: "pointer",
            width: "50%",
            boxShadow: "1px 2px 9px gray",
            height: "50px",
            borderRadius: "15px",
          }}
        >
          Актуальные
        </Typography>
      </Box>
      <Box>
        {products.map((item) => (
          <ProductItem key={item.id} item={item} likes={item.likes} />
        ))}
      </Box>
    </Box>
  );
}

export default ProductsList;
