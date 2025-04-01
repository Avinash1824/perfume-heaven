const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const Review = require("../models/Review");

// POST: Add a new review
router.post("/:productId/reviews", async (req, res) => {
  const { name, rating, comment } = req.body;
  const { productId } = req.params;

  try {
    const newReview = new Review({
      name,
      rating,
      comment,
      productId,
    });

    await newReview.save();

    // Add review ID to the product's reviews
    const product = await Product.findById(productId);
    product.reviews.push(newReview._id);
    await product.save();

    res.status(201).json(newReview);
  } catch (error) {
    res.status(500).json({ message: "Error adding review", error });
  }
});

// GET: Get reviews for a product
router.get("/:productId/reviews", async (req, res) => {
  const { productId } = req.params;

  try {
    const reviews = await Review.find({ productId }).populate("productId");
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Error fetching reviews", error });
  }
});

module.exports = router;
