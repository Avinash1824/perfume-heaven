import React, { useState, useEffect } from "react";
import { Star, UserRound, CheckCircle } from "lucide-react";
import axios from "axios";
const ratings = [
  { stars: 5, percent: 40 },
  { stars: 4, percent: 20 },
  { stars: 3, percent: 20 },
  { stars: 2, percent: 10 },
  { stars: 1, percent: 10 },
];

export default function Reviews({ product }) {
  const [review, setReview] = useState({ name: "", rating: 0, comment: "" });
  const [reviews, setReviews] = useState(product.reviews);
  const [showToast, setShowToast] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setReviews([...reviews, review]);
    setReview({ name: "", rating: 0, comment: "" });
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
      {showToast && (
        <div className="fixed top-5 right-5 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2">
          <CheckCircle className="w-5 h-5" />
          <span>Review posted successfully!</span>
        </div>
      )}

      <div className="bg-white p-6 w-full flex flex-col">
        <h2 className="text-xl font-semibold mb-4">Ratings Overview</h2>
        <div className="space-y-2 w-full">
          {ratings.map(({ stars, percent }) => (
            <div key={stars} className="flex items-center w-full">
              <span className="w-12 text-gray-700 font-medium flex-shrink-0">
                {stars}{" "}
                <Star
                  className="inline h-4 w-4 text-yellow-500"
                  fill="currentColor"
                />
              </span>
              <div className="flex-grow bg-gray-200 rounded-full h-2 mx-2">
                <div
                  className="bg-yellow-500 h-2 rounded-full"
                  style={{ width: `${percent}%` }}
                ></div>
              </div>
              <span className="w-10 text-gray-600 text-sm text-right">
                {percent}%
              </span>
            </div>
          ))}
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-4 mt-5  rounded-lg shadow p-6 w-full"
        >
          <h3 className="text-2xl font-semibold text-center">
            Write your own Review
          </h3>
          <div className="flex gap-1">
            <span className="text-xl font-semibold"> Rating:</span>
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-6 h-6 cursor-pointer ${review.rating > i ? "text-yellow-500" : "text-gray-300"}`}
                fill={review.rating > i ? "currentColor" : "none"}
                onClick={() => setReview({ ...review, rating: i + 1 })}
              />
            ))}
          </div>
          <input
            type="text"
            placeholder="Your Name"
            value={review.name}
            onChange={(e) => setReview({ ...review, name: e.target.value })}
            className="w-full p-3 border rounded-lg outline-0"
            required
          />
          <textarea
            placeholder="Your Review"
            value={review.comment}
            onChange={(e) => setReview({ ...review, comment: e.target.value })}
            className="w-full p-3 border rounded-lg"
            required
          ></textarea>
          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-800 text-white px-6 py-2 rounded-lg w-full cursor-pointer"
          >
            Submit Review
          </button>
        </form>
      </div>

      <div className="bg-white p-6 w-full flex flex-col">
        <h2 className="text-xl font-semibold mb-4">Customer Reviews</h2>
        {reviews.map(({ name, rating, comment }) => (
          <div key={name} className="border-b pb-4 mb-4">
            <div className="flex items-center gap-3">
              <UserRound className="h-9 w- text-gray-500" />

              <div>
                <h3 className="font-semibold text-gray-800">{name}</h3>
                <div className="flex text-yellow-500">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${i < rating ? "text-yellow-500" : "text-gray-300"}`}
                      fill={i < rating ? "currentColor" : "none"}
                    />
                  ))}
                </div>
              </div>
            </div>
            <p className="text-gray-700 mt-2">{comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
