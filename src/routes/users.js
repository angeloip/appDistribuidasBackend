const express = require("express");
const {
  getUsers,
  getUserWithEmail,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  getUserParams,
  resetPasswordUser
} = require("../controllers/users");

const router = express.Router();

//Agregar usuarios
router.post("/", createUser);

//Obtener usuarios
router.get("/", getUsers);

//Obtener usuario mediante el email
router.get("/email/:email", getUserWithEmail);

//Obtener un usuario
router.get("/:id", getUser);

//Actualizar usuario

router.put("/:id", updateUser);

//Eliminar usuario

router.delete("/:id", deleteUser);

router.get("/static/:param", getUserParams);

router.put("/resetpassword/:email", resetPasswordUser);

module.exports = router;
