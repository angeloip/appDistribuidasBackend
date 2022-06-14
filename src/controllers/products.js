const productSchema = require("../models/products");
const { uploadImage, deleteImage } = require("../utils/cloudinary");
const fs = require("fs-extra");

const getProducts = async (req, res, next) => {
  try {
    const products = await productSchema.find({});

    return res.json(products);
  } catch (error) {
    next(error);
  }
};

const getProduct = async (req, res, next) => {
  try {
    const { id } = req.params;

    const product = await productSchema.findById(id);

    if (!product) return res.sendStatus(404);

    return res.json(product);
  } catch (error) {
    next(error);
  }
};

const createProduct = async (req, res, next) => {
  try {
    const newProduct = new productSchema(req.body);
    let image = null;

    const ingredients = newProduct.ingredients.toString().split(",");

    newProduct.ingredients = ingredients;

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

    const savedProduct = await newProduct.save();

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
    const productUpdate = await productSchema.findByIdAndUpdate(
      id,
      newProductInfo,
      {
        new: true
      }
    );

    return res.json(productUpdate);
  } catch (error) {
    next(error);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;

    const productDelete = await productSchema.findByIdAndRemove(id);

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
