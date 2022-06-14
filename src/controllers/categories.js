const categorySchema = require("../models/categories");

const getCategories = async (req, res, next) => {
  try {
    const categories = await categorySchema.find({});

    return res.json(categories);
  } catch (error) {
    next(error);
  }
};

const getCategory = async (req, res, next) => {
  try {
    const { id } = req.params;

    const categorie = await categorySchema.findById(id);

    if (!categorie) return res.sendStatus(404);

    return res.json(categorie);
  } catch (error) {
    next(error);
  }
};

const createCategory = async (req, res, next) => {
  try {
    const newCategorie = new categorySchema(req.body);

    const savedCategorie = await newCategorie.save();

    return res.json(savedCategorie);
  } catch (error) {
    next(error);
  }
};

const updateCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const categorie = req.body;

    const categorieUpdate = await categorySchema.findByIdAndUpdate(
      id,
      categorie,
      {
        new: true
      }
    );

    return res.json(categorieUpdate);
  } catch (error) {
    next(error);
  }
};

const deleteCategory = async (req, res, next) => {
  try {
    const { id } = req.params;

    const categorieDelete = await categorySchema.findByIdAndRemove(id);

    if (!categorieDelete) return res.sendStatus(404);

    return res.json(categorieDelete);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory
};
