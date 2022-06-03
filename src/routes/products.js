const express = require("express");

const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct
} = require("../controllers/products");

const router = express.Router();

//Agregar productos
router.post("/", createProduct);

//Obtener productos
router.get("/", getProducts);

//Obtener un producto
router.get("/:id", getProduct);

//Actualizar producto
router.put("/:id", updateProduct);

//Eliminar producto
router.delete("/:id", deleteProduct);

module.exports = router;
