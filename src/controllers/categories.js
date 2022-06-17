const {
  obtenerCategorias,
  obtenerCategoria,
  insertarCategoria,
  actualizarCategoria,
  eliminarCategoria
} = require("../models/categories");

const getCategories = async (req, res, next) => {
  try {
    const categories = await obtenerCategorias();

    return res.json(categories);
  } catch (error) {
    next(error);
  }
};

const getCategory = async (req, res, next) => {
  try {
    const { id } = req.params;

    const categorie = await obtenerCategoria(id);

    if (!categorie) return res.sendStatus(404);

    return res.json(categorie);
  } catch (error) {
    next(error);
  }
};

const createCategory = async (req, res, next) => {
  try {
    const newCategorie = req.body;

    const savedCategorie = await insertarCategoria(newCategorie);

    return res.json(savedCategorie);
  } catch (error) {
    next(error);
  }
};

const updateCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const newCategoryInfo = req.body;

    const categoryUpdate = await actualizarCategoria(id, newCategoryInfo);

    return res.json(categoryUpdate);
  } catch (error) {
    next(error);
  }
};

const deleteCategory = async (req, res, next) => {
  try {
    const { id } = req.params;

    const categorieDelete = await eliminarCategoria(id);

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
