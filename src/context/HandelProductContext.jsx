import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { loadSetting, updateSetting } from "./SettingContext";
import { showSuccessMessage, showDangerMessage } from "../utils/notification";

const HandelProductContext = React.createContext();
const HandelProductContextUpdate = React.createContext();

export const loadHandelProduct = () => {
  return useContext(HandelProductContext);
};

export const updateHandelProduct = () => {
  return useContext(HandelProductContextUpdate);
};

export const HandelProductProvider = ({ children }) => {
  const envVariable = import.meta.env;
  const { loggedIn, header } = loadSetting();
  const { handelLogout } = updateSetting();

  const [searchResult, setSearchResult] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [userCart, setUserCart] = useState([]);

  const [userOrder, setUserOrder] = useState([]);

  const [pendingOrder, setPendingOrder] = useState([]);
  const [completedOrder, setCompletedOrder] = useState([]);

  const validateToken = (statusCode) => {
    if (statusCode == 498 && loggedIn) {
      showSuccessMessage("Your account is logged out because of expired token");
      handelLogout();
    }
  };

  const getSearchProducts = (searchKeyword) => {
    if (
      searchKeyword == null ||
      searchKeyword == "" ||
      searchKeyword == undefined
    ) {
      setSearchResult([]);
      return;
    }
    const url = `http://localhost:3000/api/search-products/${searchKeyword}`;
    axios
      .get(url, header, header)
      .then((res) => {
        setSearchResult(res.data);
      })
      .catch((err) => {
        console.log("err while getting featured products", err);
      });
  };

  const addToCart = (productId) => {
    const url = `http://localhost:3000/cart/add-to-cart`;
    axios
      .post(url, { productId: productId }, header)
      .then((res) => {
        getCartCount();
      })
      .catch((err) => {
        console.log("err while adding to cart", err);
      });
  };

  const getUserCart = () => {
    if (!loggedIn) {
      return;
    }
    const url = `http://localhost:3000/cart/get-user-cart`;
    axios
      .post(url, header, header)
      .then((res) => {
        setUserCart(res.data);
      })
      .catch((err) => {
        // validateToken(err.status);
        console.log("err while getting user cart", err);
      });
  };

  const getCartCount = () => {
    if (!loggedIn) {
      return;
    }
    const url = `http://localhost:3000/cart/get-user-cart`;
    axios
      .post(url, header, header)
      .then((res) => {
        setCartCount(res.data.length);
      })
      .catch((err) => {
        // validateToken(err.status);
        console.log("err while getting user cart count", err);
      });
  };

  const updateCartProductQuantity = (increase, productId) => {
    const url = `http://localhost:3000/cart/user-cart-${
      increase ? "increase" : "decrease"
    }-product`;
    axios
      .post(url, { productId: productId }, header)
      .then((res) => {
        getCartCount();
        getUserCart();
      })
      .catch((err) => {
        console.log("err while adding to cart", err);
      });
  };

  const removeCartProduct = (productId) => {
    const url = `http://localhost:3000/cart/user-cart-remove-product`;
    axios
      .post(url, { productId: productId }, header)
      .then((res) => {
        getCartCount();
        getUserCart();
      })
      .catch((err) => {
        console.log("err while adding to cart", err);
      });
  };

  const makePayment = (products) => {
    const url = `http://localhost:3000/cart/create-checkout-session`;
    const orderedItem = products.map((item) => {
      return {
        price_data: {
          currency: "inr",
          product_data: {
            name: item.title,
          },
          unit_amount: item.price * 100,
        },
        quantity: item.quantity,
      };
    });

    axios
      .post(url, orderedItem, header)
      .then((res) => {
        console.log("payment response", res.status);
        if (res.status != 200) showDangerMessage("Order Failed");
        window.location.href = res.data.redirectUrl;
      })
      .catch((err) => {
        console.log("err while ordering", err);
      });
  };

  const getUserOrder = () => {
    if (!loggedIn) {
      return;
    }
    const url = `http://localhost:3000/cart/user-order-record`;
    axios
      .post(url, header, header)
      .then((res) => {
        setUserOrder(res.data);
      })
      .catch((err) => {
        console.log("err while getting user orde", err);
      });
  };

  const getPendingOrder = () => {
    if (!loggedIn) {
      return;
    }
    const url = `http://localhost:3000/cart/get-pending-order`;
    axios
      .get(url, header, header)
      .then((res) => {
        setPendingOrder(res.data);
      })
      .catch((err) => {
        console.log("err while getting pending order", err);
      });
  };

  const getCompletedOrder = () => {
    if (!loggedIn) {
      return;
    }
    const url = `http://localhost:3000/cart/get-completed-order`;
    axios
      .get(url, header, header)
      .then((res) => {
        setCompletedOrder(res.data);
      })
      .catch((err) => {
        console.log("err while getting completed order", err);
      });
  };
  //
  const handelPendingOrder = (id) => {
    if (!loggedIn) {
      return;
    }
    const url = `http://localhost:3000/cart/update-pending-order/${id}`;
    axios
      .post(url, header, header)
      .then((res) => {
        getPendingOrder();
        showSuccessMessage("Order is completed");
      })
      .catch((err) => {
        console.log("err while updating pending order", err);
      });
  };

  const handelCompletedOrder = (id) => {
    if (!loggedIn) {
      return;
    }
    const url = `http://localhost:3000/cart/revert-completed-order/${id}`;
    axios
      .post(url, header, header)
      .then((res) => {
        getCompletedOrder();
        showSuccessMessage("Completed order is reverted");
      })
      .catch((err) => {
        console.log("err while revertng completed order", err);
      });
  };

  return (
    <HandelProductContext.Provider
      value={{
        searchResult,
        cartCount,
        userCart,
        userOrder,
        pendingOrder,
        completedOrder,
      }}
    >
      <HandelProductContextUpdate.Provider
        value={{
          getSearchProducts,
          addToCart,
          getUserCart,
          getCartCount,
          updateCartProductQuantity,
          removeCartProduct,
          makePayment,
          getUserOrder,
          getPendingOrder,
          getCompletedOrder,
          handelPendingOrder,
          handelCompletedOrder,
        }}
      >
        {children}
      </HandelProductContextUpdate.Provider>
    </HandelProductContext.Provider>
  );
};
