const mongoose = require("mongoose");
const reviewSchema = require("./Review"); // Importing reviewSchema

const productSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  caption: {
    type: String,
    required: true,
  },
  imageSrc: {
    type: [String],
    required: true,
  },
  reviews: {
    type: [reviewSchema], // Using imported review schema
    default: [],
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
