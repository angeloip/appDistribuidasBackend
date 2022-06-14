const favoriteSchema = require("../models/favorites");
const userSchema = require("../models/users");
const productSchema = require("../models/products");

const getFavorites = async (req, res, next) => {
  try {
    const favorites = await favoriteSchema.find({}).populate("dish");

    return res.json(favorites);
  } catch (error) {
    next(error);
  }
};

const getFavorite = async (req, res, next) => {
  try {
    const { id } = req.params;

    const favorite = await favoriteSchema.findById(id).populate("dish");
    if (!favorite) return res.sendStatus(404);

    return res.json(favorite);
  } catch (error) {
    next(error);
  }
};

const createFavorite = async (req, res, next) => {
  try {
    const newFavorite = new favoriteSchema(req.body);

    const { dishId, userId } = req.body;

    const dish = await productSchema.findById(dishId);

    const user = await userSchema.findById(userId);

    newFavorite.dish = dish._id;
    newFavorite.user = user._id;

    const savedFavorite = await newFavorite.save();

    savedFavorite.populate("dish");

    user.favorites = user.favorites.concat(newFavorite._id);

    await user.save();

    res.json(savedFavorite);
  } catch (error) {
    next(error);
  }
};

const deleteFavorite = async (req, res, next) => {
  try {
    const { id } = req.params;

    const favorite = await favoriteSchema.findByIdAndRemove(id);

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
