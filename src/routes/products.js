const express = require("express");

const {
  getProducts,
  getProduct,
  searchAutocomplete,
  getProductsForCategory,
  createProduct,
  createProductReview,
  updateProduct,
  updateImage,
  deleteProduct,
  deleteManyProducts,
  loadDishesWithExcel
} = require("../controllers/products");

const { checkToken } = require("../utils/userExtractor");

const router = express.Router();

router.post("/", checkToken, createProduct);

router.post("/:id/reviews", checkToken, createProductReview);

router.get("/", getProducts);

router.get("/:id", getProduct);

router.post("/search", searchAutocomplete);

router.post("/category", getProductsForCategory);

router.put("/:id", updateProduct);

router.put("/image/:id", updateImage);

router.delete("/:id", deleteProduct);

router.post("/deletemanyproducts", deleteManyProducts);

router.post("/xlsx", loadDishesWithExcel);

module.exports = router;
