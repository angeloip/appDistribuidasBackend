const express = require("express");

const {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory
} = require("../controllers/categories");

const router = express.Router();

router.post("/", createCategory);

router.get("/", getCategories);

router.get("/:id", getCategory);

router.put("/:id", updateCategory);

router.delete("/:id", deleteCategory);

module.exports = router;
