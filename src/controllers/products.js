const {
  obtenerPlatos,
  obtenerPlato,
  insertarPlato,
  actualizarPlato,
  eliminarPlato
} = require("../models/products");
const { uploadImage, deleteImage } = require("../utils/cloudinary");
const fs = require("fs-extra");

const getProducts = async (req, res, next) => {
  try {
    const products = await obtenerPlatos();

    return res.json(products);
  } catch (error) {
    next(error);
  }
};

const getProduct = async (req, res, next) => {
  try {
    const { id } = req.params;

    const product = await obtenerPlato(id);

    if (!product) return res.sendStatus(404);

    return res.json(product);
  } catch (error) {
    next(error);
  }
};

const createProduct = async (req, res, next) => {
  try {
    const newProduct = req.body;
    let image = null;

    const ingredients = newProduct.ingredients.toString().split(",");
    const benefits = newProduct.benefits.toString().split(",");
    const tags = newProduct.tags.toString().split(",");

    newProduct.ingredients = ingredients;
    newProduct.benefits = benefits;
    newProduct.tags = tags;

    if (req.files?.image) {
      const result = await uploadImage(req.files.image.tempFilePath);
      await fs.remove(req.files.image.tempFilePath);
      image = {
        url: result.secure_url,
        public_id: result.public_id
      };
    } else {
      image = {
        url: "",
        public_id: ""
      };
    }

    newProduct.image = image;

    const savedProduct = await insertarPlato(newProduct);

    return res.json(savedProduct);
  } catch (error) {
    next(error);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const newProductInfo = req.body;

    /* const newProductInfo = {
      name: product.name,
      ingredients: product.ingredients,
      preparation: product.preparation,
      benefits: product.benefits,
      category: product.category
    };
 */
    const productUpdate = await actualizarPlato(id, newProductInfo);

    return res.json(productUpdate);
  } catch (error) {
    next(error);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;

    const productDelete = await eliminarPlato(id);

    if (productDelete && productDelete.image.public_id) {
      await deleteImage(productDelete.image.public_id);
    }

    if (!productDelete) return res.sendStatus(404);

    return res.json(productDelete);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct
};
