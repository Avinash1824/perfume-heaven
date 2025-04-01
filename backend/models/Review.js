const mongoose = require("mongoose");
const Product = require("./Product");

const reviewSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  comment: {
    type: String,
    required: true,
  },
  product_id: Product
});

module.exports = reviewSchema;
