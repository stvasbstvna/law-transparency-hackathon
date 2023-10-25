import * as React from "react";
import { useSearchParams } from "react-router-dom";
import { useProductContext } from "../contexts/ProductContext";
import { Box } from "@mui/material";

export default function Filter() {
  const { setPage } = useProductContext();
  const [searchParams, setSearchParams] = useSearchParams();
  const [category, setCategory] = React.useState(
    searchParams.get("category") || "all"
  );

  const handleChange = (_, value) => {
    value && setCategory(value);
  };

  React.useEffect(() => {
    const currentParams = Object.fromEntries([...searchParams]);

    if (category === "all") {
      const { _page, q } = currentParams;
      setSearchParams({
        _page: _page || 1,
        q: q || "",
      });
    } else {
      setSearchParams({
        ...currentParams,
        category,
      });
      setPage(1);
    }
  }, [category]);

  return <Box></Box>;
}
