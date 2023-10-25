import { Box, InputBase } from "@mui/material";
import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { useSearchParams } from "react-router-dom";
import { useProductContext } from "../contexts/ProductContext";

function LiveSearch() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchVal, setSearchVal] = useState(searchParams.get("q") || "");
  const { setPage } = useProductContext();

  useEffect(() => {
    const currentParams = Object.fromEntries([...searchParams]);
    setSearchParams({
      ...currentParams,
      q: searchVal,
    });
    setPage(1);
  }, [searchVal]);

  return (
    <Box
      className="big_search"
      style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
    >
      <SearchIcon />
      <InputBase
        className="searchAria search_live"
        style={{
          background: "lightgray",
          backgroundColor: "transparent",
          borderRadius: "14px",
          paddingLeft: "10px",
          border: "2px white solid",
          color: "white",
        }}
        value={searchVal}
        onChange={(e) => setSearchVal(e.target.value)}
        placeholder="Найти..."
        inputProps={{ "aria-label": "search" }}
      />
    </Box>
  );
}

export default LiveSearch;
