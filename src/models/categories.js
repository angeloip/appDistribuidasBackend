const categorySchema = require("../schemas/categories");

const obtenerCategorias = async () => {
  try {
    return await categorySchema.find({});
  } catch (e) {
    console.log(e);
    throw new Error(e);
  }
};

const obtenerCategoria = async (id) => {
  try {
    return await categorySchema.findById(id);
  } catch (e) {
    console.log(e);
    throw new Error(e);
  }
};

const insertarCategoria = async (data) => {
  try {
    const newCategory = new categorySchema(data);
    return await newCategory.save();
  } catch (e) {
    console.log(e);
    throw new Error(e);
  }
};

const actualizarCategoria = async (id, data) => {
  try {
    return await categorySchema.findByIdAndUpdate(id, data, {
      new: true
    });
  } catch (e) {
    console.log(e);
    throw new Error(e);
  }
};

const eliminarCategoria = async (id) => {
  try {
    return await categorySchema.findByIdAndRemove(id);
  } catch (e) {
    console.log(e);
    throw new Error(e);
  }
};

module.exports = {
  obtenerCategorias,
  obtenerCategoria,
  insertarCategoria,
  actualizarCategoria,
  eliminarCategoria
};
