import React, { useEffect } from "react";
import ProductsList from "../components/ProductsList";
import { Box, Pagination } from "@mui/material";
import { LIMIT } from "../utils/consts";
import { useSearchParams } from "react-router-dom";
import { useProductContext } from "../contexts/ProductContext";
import Footer from "../components/Footer";
import Filter from "../components/Filter";

function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { getProducts, pageTotalCount, page, setPage } = useProductContext();

  useEffect(() => {
    getProducts();
  }, [searchParams]);

  useEffect(() => {
    const currentParams = Object.fromEntries([...searchParams]);
    setSearchParams({
      ...currentParams,
      _page: page,
    });
  }, [page]);
  return (
    <div>
      <Box>
        <Filter />
      </Box>
      <ProductsList />
      <Box></Box>
      <Footer />
    </div>
  );
}

export default HomePage;
