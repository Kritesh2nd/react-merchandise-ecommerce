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
import Order from "./pages/Order";
import ViewSales from "./dashboard/analytics/ViewSales";
import ViewRevenue from "./dashboard/analytics/ViewRevenue";
import BestSelling from "./dashboard/analytics/BestSelling";
import LowStock from "./dashboard/analytics/LowStock";
import ProductAdd from "./dashboard/product/ProductAdd";
import ProductList from "./dashboard/product/ProductList";
import ProductDetail from "./dashboard/product/ProductDetail";
import ProductUpdate from "./dashboard/product/ProductUpdate";
import OrderList from "./dashboard/order/OrderList";
import OrderDetail from "./dashboard/order/OrderDetail";
import CustomerList from "./dashboard/customer/CustomerList";
import ProductStock from "./dashboard/product/ProductStock";
import OrderCompletedList from "./dashboard/order/OrderCompletedList";
import OrderPendingList from "./dashboard/order/OrderPendingList";

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
                <Route path="order" element={<Order />} />
                <Route path="payment/success" element={<PaymentSuccess />} />
                <Route path="payment/failed" element={<PaymentFailed />} />
                <Route path="/" element={<About />} />
                <Route path="/" element={<Service />} />
                <Route path="contact" element={<Contact />} />
                <Route path="color" element={<ColorPalette />} />
                <Route path="dashboard" element={<Dashboard />}>
                  <Route path="analytics/sales" element={<ViewSales />} />
                  <Route path="analytics/revenue" element={<ViewRevenue />} />
                  <Route
                    path="analytics/best-selling"
                    element={<BestSelling />}
                  />
                  <Route path="analytics/low-stock" element={<LowStock />} />
                  <Route path="product/add" element={<ProductAdd />} />
                  <Route
                    path="product/detail/:id"
                    element={<ProductDetail />}
                  />
                  <Route path="product/list" element={<ProductList />} />
                  <Route
                    path="product/update/:id"
                    element={<ProductUpdate />}
                  />
                  <Route path="product/stock" element={<ProductStock />} />
                  <Route path="order/list" element={<OrderList />} />
                  <Route
                    path="order/pending-list"
                    element={<OrderPendingList />}
                  />
                  <Route
                    path="order/completed-list"
                    element={<OrderCompletedList />}
                  />
                  <Route path="order/detail/:id" element={<OrderDetail />} />
                  <Route path="customer/list" element={<CustomerList />} />
                  <Route path="*" element={<NotFound />} />
                </Route>
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
