require("dotenv").config({ path: "./config/.env" });
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const productRoutes = require("./routes/productRoutes");
const reviewRoutes = require("./routes/reviewRoutes");

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.use("/api/products", productRoutes);
app.use("/api/reviews", reviewRoutes);

app.listen(process.env.PORT, () =>
  console.log("Server running on port", process.env.PORT)
);
