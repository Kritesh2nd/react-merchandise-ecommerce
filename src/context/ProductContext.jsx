import axios from "axios";
import React, { useContext, useState } from "react";

const ProductContext = React.createContext();
const ProductContextUpdate = React.createContext();

export const loadProduct = () => {
  return useContext(ProductContext);
};

export const updateProduct = () => {
  return useContext(ProductContextUpdate);
};

export const ProductProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("userToken") || null);
  const bearerToken = token ? `Bearer ${JSON.parse(token)}` : "";
  const header = { headers: { Authorization: bearerToken } };
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [categoryProducts, setCategoryProducts] = useState([]);
  const [discountedProducts, setDiscountedProducts] = useState([]);

  const getFeaturedProducts = () => {
    const url = `http://localhost:3000/api/featured-products`;
    axios
      .get(url, header, header)
      .then((res) => {
        setFeaturedProducts(res.data);
      })
      .catch((err) => {
        console.log("err while getting featured products", err);
      });
  };

  const getCategoryProducts = (code) => {
    code = code ? code : "all";
    const url = `http://localhost:3000/api/category-products/${code}`;
    axios
      .get(url, header, header)
      .then((res) => {
        setCategoryProducts(res.data);
      })
      .catch((err) => {
        console.log("err while getting featured products", err);
      });
  };

  const getDiscountedProducts = () => {
    const url = `http://localhost:3000/api/discounted-products`;
    axios
      .get(url, header, header)
      .then((res) => {
        setDiscountedProducts(res.data);
      })
      .catch((err) => {
        console.log("err while getting featured products", err);
      });
  };

  return (
    <ProductContext.Provider
      value={{ featuredProducts, categoryProducts, discountedProducts }}
    >
      <ProductContextUpdate.Provider
        value={{
          getFeaturedProducts,
          getCategoryProducts,
          getDiscountedProducts,
        }}
      >
        {children}
      </ProductContextUpdate.Provider>
    </ProductContext.Provider>
  );
};
