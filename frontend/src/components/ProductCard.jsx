import React from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
// import products from "../data/products.json";

export default function ProductCard() {
  const [products, setProducts] = useState([]); // Store products in state
  const [error, setError] = useState(null); // Handle errors

  // Fetch products when the component mounts
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/products")
      .then((response) => {
        // console.log(response);
        setProducts(response.data); // Store products in state
      })
      .catch((error) => {
        setError("Error fetching products: " + error.message); // Handle errors
      });
  }, []);
  return (
    <div id="Products" className="mx-auto max-w-7xl px-4 py-16">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
        {products.map((product) => (
          <Link
            key={product.id}
            to={`/product/${product.id}`}
            className="group block transform transition duration-300 hover:scale-105"
          >
            <div className="rounded-xl overflow-hidden shadow-lg">
              <img
                src={product.imageSrc[0]}
                className="w-full h-60 object-cover group-hover:opacity-75"
              />
              <div className="p-4">
                <h3 className="text-lg text-gray-900 font-semibold">
                  {product.name}
                </h3>
                <h4 className="text-sm text-gray-600 font-medium">
                  {product.caption}
                </h4>
                <p className="mt-1 text-lg font-medium text-gray-900">
                  ₹{product.price}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
