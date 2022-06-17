const favoriteSchema = require("../schemas/favorites");

const obtenerFavoritos = async () => {
  try {
    return await favoriteSchema.find({}).populate("dish");
  } catch (e) {
    console.log(e);
    throw new Error(e);
  }
};

const obtenerFavorito = async (id) => {
  try {
    return await favoriteSchema.findById(id).populate("dish");
  } catch (e) {
    console.log(e);
    throw new Error(e);
  }
};

const insertarFavorito = async (data) => {
  try {
    const newFavorite = new favoriteSchema(data);
    return await newFavorite.save();
  } catch (e) {
    console.log(e);
    throw new Error(e);
  }
};

const actualizarFavorito = async (id, data) => {
  try {
    return await favoriteSchema.findByIdAndUpdate(id, data, {
      new: true
    });
  } catch (e) {
    console.log(e);
    throw new Error(e);
  }
};

const eliminarFavorito = async (id) => {
  try {
    return await favoriteSchema.findByIdAndRemove(id);
  } catch (e) {
    console.log(e);
    throw new Error(e);
  }
};

module.exports = {
  obtenerFavoritos,
  obtenerFavorito,
  insertarFavorito,
  actualizarFavorito,
  eliminarFavorito
};
