import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { ACTIONS, API } from "../utils/consts";
import axios from "axios";
import { notify } from "../components/Toastify";
import { useSearchParams } from "react-router-dom";

const productContext = createContext();

export function useProductContext() {
  return useContext(productContext);
}

const init = {
  products: [],
  product: null,
};

function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.products:
      return { ...state, products: action.payload };

    case ACTIONS.product:
      return { ...state, product: action.payload };

    default:
      return state;
  }
}

function ProductContext({ children }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [state, dispatch] = useReducer(reducer, init);
  const [page, setPage] = useState(+searchParams.get("_page") || 1);
  const [details, setDetails] = useState(null);
  const [prodact, setProdact] = useState([]);
  const currentParams = Object.fromEntries([...searchParams]);

  async function getProducts() {
    try {
      const { data, headers } = await axios.get(
        `${API}${window.location.search}  `
      );

      dispatch({
        type: ACTIONS.products,
        payload: data,
      });
    } catch (e) {
      notify(`${e.response.status}: ${e.response.statusText}`, "error");
    }
  }

  async function getProdact() {
    try {
      const { data } = await axios.get(API);
      setProdact(data);
    } catch (e) {
      notify(`${e.response.status}: ${e.response.statusText}`, "error");
    }
  }

  async function getOneProduct(id) {
    try {
      const { data } = await axios.get(`${API}/${id}`);
      dispatch({
        type: ACTIONS.product,
        payload: data,
      });
    } catch (e) {
      notify(`${e.response.status}: ${e.response.statusText}`, "error");
    }
  }

  async function addProduct(newProduct) {
    await axios.post(API, newProduct);

    getProducts();
  }
  async function deleteProduct(id) {
    try {
      await axios.delete(`${API}/${id}`);
      getProducts();
      getProdact();
      notify("Successfully deleted");
    } catch (e) {
      notify(`${e.response.status}: ${e.response.statusText}`, "error");
      console.log(e);
    }
  }

  async function updateProduct(id, newData) {
    try {
      await axios.patch(`${API}/${id}`, newData);
      getProducts();
      getProdact();
    } catch (e) {
      notify(`${e.response.status}: ${e.response.statusText}`, "error");
    }
  }

  async function getOneDetails(id) {
    const { data } = await axios(`${API}/${id}`);

    setDetails(data);
  }

  const value = {
    products: state.products,
    product: state.product,
    getOneDetails,
    details,
    getProducts,
    addProduct,
    deleteProduct,
    updateProduct,
    getOneProduct,
    setPage,
    page,
    currentParams,
    prodact,
    getProdact,
  };

  return (
    <productContext.Provider value={value}>{children}</productContext.Provider>
  );
}

export default ProductContext;
