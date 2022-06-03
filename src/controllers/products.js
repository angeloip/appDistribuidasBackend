const productSchema = require("../models/products");

const getProducts = async (req, res, next) => {
  try {
    const products = await productSchema.find({});

    res.json(products);
  } catch (error) {
    next(error);
  }
};

const getProduct = async (req, res, next) => {
  try {
    const { id } = req.params;

    const product = await productSchema.findById(id);

    res.json(product);
  } catch (error) {
    next(error);
  }
};

const createProduct = async (req, res, next) => {
  try {
    const newProduct = new productSchema(req.body);

    const savedProduct = await newProduct.save();

    res.json(savedProduct);
  } catch (error) {
    next(error);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = req.body;

    const newProductInfo = {
      name: product.name,
      ingredients: product.ingredients,
      preparation: product.preparation,
      benefits: product.benefits,
      category: product.category
    };

    const productUpdate = await productSchema.findByIdAndUpdate(id, newProductInfo, {
      new: true
    });

    res.json(productUpdate);
  } catch (error) {
    next(error);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;

    const productDelete = await productSchema.findByIdAndRemove(id);

    res.json(productDelete);
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
