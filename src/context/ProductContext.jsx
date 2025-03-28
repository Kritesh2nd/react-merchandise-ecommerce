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
  const [productList, setProductList] = useState([]);
  const [productDetail, setProductDetail] = useState(null);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [categoryProducts, setCategoryProducts] = useState([]);
  const [discountedProducts, setDiscountedProducts] = useState([]);

  const getProductList = () => {
    const url = `http://localhost:3000/api/products`;
    axios
      .get(url, header, header)
      .then((res) => {
        setProductList(res.data);
      })
      .catch((err) => {
        console.log("err while getting product list", err);
      });
  };

  const getProductById = (productId) => {
    const url = `http://localhost:3000/api/product/${productId}`;
    axios
      .get(url, header, header)
      .then((res) => {
        setProductDetail(res.data);
      })
      .catch((err) => {
        console.log("err while getting product list", err);
      });
  };

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
      value={{
        productList,
        productDetail,
        featuredProducts,
        categoryProducts,
        discountedProducts,
      }}
    >
      <ProductContextUpdate.Provider
        value={{
          getProductList,
          getProductById,
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
