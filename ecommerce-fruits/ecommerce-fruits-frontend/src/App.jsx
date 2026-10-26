import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import { CartProvider } from "./context/CartContext";
import OrderSuccess from "./pages/OrderSuccess";
import Checkout from "./pages/Checkout";
import ProductDetails from "./pages/ProductDetails";
import AdminDashboardHome from "./pages/AdminDashboardHome";
import UploadCategories from "./pages/UploadCategories";
import UploadProduct from "./pages/UploadProduct";
import ProductScreen from "./pages/ProductScreen";

export default function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          {/* Public */}
          <Route path="/" element={<Login />} />
          <Route path="/product" element={<Products />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order-success" element={<OrderSuccess />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/categories" element={<UploadCategories />} />
          <Route path="/upload-product" element={<UploadProduct />} />
          {/* admin */}

          <Route path="/dashboard" element={<AdminDashboardHome />} />
          <Route path="/admin-product" element={<ProductScreen />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}
