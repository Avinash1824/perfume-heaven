const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

// Get all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get product by ID
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate("reviews");
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ API to insert a single product
router.post("/", async (req, res) => {
  try {
    const { id, name, price, description, caption, imageSrc } = req.body;

    // Validate that all required fields are provided
    if (!id || !name || !price || !description || !imageSrc) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Create a new product with the provided data
    const product = new Product({
      id,
      name,
      price,
      description,
      caption,
      imageSrc,
    });

    // Save the product to the database
    await product.save();

    res.status(201).json({ message: "Product added successfully", product });
  } catch (err) {
    console.error("Error inserting product:", err);
    res.status(500).json({ error: err.message });
  }
});

router.post("/bulk", async (req, res) => {
  try {
    const products = req.body; // Assuming the body contains an array of products

    // Validate that the body contains an array of products
    if (!Array.isArray(products) || products.length === 0) {
      return res
        .status(400)
        .json({ error: "Invalid input, must be an array of products" });
    }

    // Validate each product to ensure required fields are present
    for (let product of products) {
      const { id, name, price, description, caption, imageSrc } = product;

      if (!id || !name || !price || !description || !imageSrc) {
        return res
          .status(400)
          .json({ error: "All fields are required for each product" });
      }
    }

    // Use insertMany to add all products at once
    const savedProducts = await Product.insertMany(products);

    res
      .status(201)
      .json({ message: "Products added successfully", savedProducts });
  } catch (err) {
    console.error("Error inserting products:", err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

module.exports = router;
