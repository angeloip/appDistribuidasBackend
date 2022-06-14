const express = require("express");
const {
  getFavorites,
  getFavorite,
  createFavorite,
  deleteFavorite
} = require("../controllers/favorites");

const router = express.Router();

router.post("/", createFavorite);

router.get("/", getFavorites);

router.get("/:id", getFavorite);

router.delete("/:id", deleteFavorite);

module.exports = router;
