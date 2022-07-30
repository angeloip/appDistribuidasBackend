const express = require("express");

const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  updateImage,
  deleteProduct,
  deleteManyProducts,
  loadDishesWithExcel
} = require("../controllers/products");

const router = express.Router();

router.post("/", createProduct);

router.get("/", getProducts);

router.get("/:id", getProduct);

router.put("/:id", updateProduct);

router.put("/image/:id", updateImage);

router.delete("/:id", deleteProduct);

router.post("/deletemanyproducts", deleteManyProducts);

router.post("/xlsx", loadDishesWithExcel);

module.exports = router;
