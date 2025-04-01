import Navbar from "./components/Navbar";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import React from "react";
import "./App.css";
import HomePage from "./pages/HomePage";
import ProductCard from "./components/ProductCard";

import ProductPage from "./pages/ProductPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product/:id" element={<ProductPage />} />
      </Routes>
    </>
  );
}

export default App;
