const express = require("express");

const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  deleteManyProducts,
  loadDishesWithExcel,
  exportExcel
} = require("../controllers/products");

const router = express.Router();

router.post("/", createProduct);

router.get("/", getProducts);

router.get("/:id", getProduct);

router.put("/:id", updateProduct);

router.delete("/:id", deleteProduct);

router.post("/deletemanyproducts", deleteManyProducts);

router.post("/xlsx", loadDishesWithExcel);

router.post("/exportxlsx", exportExcel);

module.exports = router;
