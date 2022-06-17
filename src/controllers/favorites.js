const {
  obtenerFavoritos,
  obtenerFavorito,
  insertarFavorito,
  actualizarFavorito,
  eliminarFavorito
} = require("../models/favorites");

const { obtenerUsuario } = require("../models/users");
const { obtenerPlato } = require("../models/products");
const userSchema = require("../schemas/users");

const getFavorites = async (req, res, next) => {
  try {
    const favorites = await obtenerFavoritos();

    return res.json(favorites);
  } catch (error) {
    next(error);
  }
};

const getFavorite = async (req, res, next) => {
  try {
    const { id } = req.params;

    const favorite = await obtenerFavorito(id);
    if (!favorite) return res.sendStatus(404);

    return res.json(favorite);
  } catch (error) {
    next(error);
  }
};

const createFavorite = async (req, res, next) => {
  try {
    const newFavorite = req.body;

    const { dishId, userId } = req.body;

    const dish = await obtenerPlato(dishId);

    const user = await obtenerUsuario(userId);

    newFavorite.dish = dish._id;
    newFavorite.user = user._id;

    const savedFavorite = await insertarFavorito(newFavorite);

    savedFavorite.populate("dish");

    user.favorites = user.favorites.concat(savedFavorite._id);

    await user.save();

    res.json(savedFavorite);
  } catch (error) {
    next(error);
  }
};

const deleteFavorite = async (req, res, next) => {
  try {
    const { id } = req.params;

    const favorite = await eliminarFavorito(id);

    const user = await userSchema.findById(favorite.user);

    user.favorites = user.favorites.filter(
      (favoriteDelete) => favoriteDelete.toString() !== favorite._id.toString()
    );

    await user.save();

    res.json(favorite);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getFavorites,
  getFavorite,
  createFavorite,
  deleteFavorite
};
