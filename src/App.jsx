import React from "react";
import "./App.css";
import Home from "./pages/Home";
import NotFound from "./general/NotFound";
import ColorPalette from "./general/ColorPallet";
import About from "./pages/About";
import Service from "./pages/Service";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Dashboard from "./dashboard/Dashboard";
import { SettingProvider } from "./context/SettingContext";
import { ProductProvider } from "./context/ProductContext";
import Category from "./pages/Category";
import SearchList from "./pages/SearchList";
import { HandelProductProvider } from "./context/HandelProductContext";
import Shop from "./pages/Shop";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import PaymentSuccess from "./payment/PaymentSuccess";
import PaymentFailed from "./payment/PaymentFailed";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <SettingProvider>
          <ProductProvider>
            <HandelProductProvider>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="category" element={<Category />} />
                <Route path="category/:code" element={<Category />} />
                <Route path="search" element={<SearchList />} />
                <Route path="search/:keyword" element={<SearchList />} />
                <Route path="shop" element={<Shop />} />
                <Route path="cart" element={<Cart />} />
                <Route path="payment/success" element={<PaymentSuccess />} />
                <Route path="payment/failed" element={<PaymentFailed />} />
                <Route path="/" element={<About />} />
                <Route path="/" element={<Service />} />
                <Route path="contact" element={<Contact />} />
                <Route path="color" element={<ColorPalette />} />
                <Route path="dashboard" element={<Dashboard />}></Route>
                <Route path="*" element={<NotFound />} />
              </Routes>
            </HandelProductProvider>
          </ProductProvider>
        </SettingProvider>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
};

export default App;
