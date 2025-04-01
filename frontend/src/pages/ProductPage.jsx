import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Share2, CircleChevronLeft, CircleChevronRight } from "lucide-react";
import CustomerReviews from "../components/CustomerReviews";
// import products from "../data/products.json"; // Import the products JSON file
import Navbar from "../components/Navbar";
import axios from "axios";
export default function ProductPage() {
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
    console.log(products);
  }, []);
  const { id } = useParams();
  const product = products.find((p) => p.id === Number(id));
  const [showPopup, setShowPopup] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!product)
    return (
      <h2 className="text-center text-xl text-red-600">Product Not Found</h2>
    );

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 2000);
  };

  const nextImage = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex + 1) % product.imageSrc.length
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? product.imageSrc.length - 1 : prevIndex - 1
    );
  };

  return (
    <>
      <Navbar showNavLinks={false} />
      <div className="flex justify-center items-center min-h-screen">
        <div className=" p-8 max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Side: Image Overlay & Preview */}
          <div className="relative flex flex-col items-center">
            <div className="w-80 h-80  absolute top-0 left-0 rounded-lg" />
            <img
              src={product.imageSrc[currentImageIndex]}
              alt={product.name}
              className="w-80 h-80 object-cover rounded-lg "
            />
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 text-black rounded-full shadow-lg hover:bg-gray-200 transition-all"
            >
              <CircleChevronLeft size={32} />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-black rounded-full shadow-lg hover:bg-gray-200 transition-all"
            >
              <CircleChevronRight size={32} />
            </button>

            {/* Image Thumbnails */}
            <div className="flex gap-3 mt-4">
              {product.imageSrc.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Thumbnail ${index + 1}`}
                  className={`w-20 h-20 object-cover rounded-lg cursor-pointer border-4 transition-transform transform hover:scale-105 ${
                    index === currentImageIndex
                      ? "border-gray-300 shadow-lg scale-90"
                      : "border-gray-100"
                  }`}
                  onClick={() => setCurrentImageIndex(index)}
                />
              ))}
            </div>
          </div>

          {/* Right Side: Product Details */}
          <div>
            <h1 className="text-4xl font-extrabold text-gray-900">
              {product.name}
            </h1>
            <p className="text-gray-800 mt-5 leading-relaxed text-lg font-semibold">
              {product.caption}
            </p>
            <p className="text-3xl font-extrabold text-black-600 mt-3">
              ₹{product.price}
            </p>
            <p className="text-gray-700 mt-5 leading-relaxed text-lg">
              {product.description}
            </p>

            {/* Buttons */}
            <div className="flex items-center gap-6 mt-8">
              {/* <button className="bg-indigo-600 hover:bg-indigo-800 text-white px-8 py-3 text-lg rounded-lg shadow-xl transition-all">
                Add to Cart
              </button> */}
              <button
                onClick={handleShare}
                className="flex items-center gap-3 border border-gray-400 px-8 py-3 text-lg rounded-lg shadow-md hover:bg-gray-100 hover:border-indigo-500 transition-all"
              >
                <Share2 size={20} /> Share
              </button>
            </div>
          </div>
        </div>

        {/* Popup Notification (Green & Top Positioned) */}
        {showPopup && (
          <div className="fixed top-5 right-5 bg-green-600 text-white px-5 py-3 rounded-lg shadow-lg text-lg animate-bounce">
            Link Copied! You can now share this product.
          </div>
        )}
      </div>
      <CustomerReviews product={product} />
    </>
  );
}
