const userSchema = require("../models/users");
const bcrypt = require("bcrypt");

const getUsers = async (req, res, next) => {
  try {
    const users = await userSchema.find({}).populate("favorites");

    return res.json(users);
  } catch (error) {
    next(error);
  }
};

const getUserWithEmail = async (req, res, next) => {
  try {
    const { email } = req.params;
    const user = await userSchema.findOne({ email }).populate("favorites");

    res.json(user);
  } catch (error) {
    next(error);
  }
};

const getUser = async (req, res, next) => {
  try {
    /*  const { id } = req.params; */

    const { id } = req.params;
    const user = await userSchema.findById(id).populate("favorites");

    return res.json(user);
  } catch (error) {
    next(error);
  }
};

const createUser = async (req, res, next) => {
  try {
    const { email } = req.body;

    const user = await userSchema.findOne({ email });

    if (user) {
      return res.json(user);
    } else {
      const nuevoUsuario = new userSchema(req.body);

      const passwordHash = await bcrypt.hash(nuevoUsuario.password, 5);

      nuevoUsuario.password = passwordHash;

      const userSaved = await nuevoUsuario.save();

      return res.json(userSaved);
    }
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = req.body;

    const newUserInfo = {
      nombre: user.nombre,
      email: user.email,
      telefono: user.telefono
    };

    const userUpdate = await userSchema.findByIdAndUpdate(id, newUserInfo, {
      new: true
    });

    res.json(userUpdate);
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userDelete = await userSchema.findByIdAndRemove(id);

    res.json(userDelete);
  } catch (error) {
    next(error);
  }
};

const getUserParams = async (req, res, next) => {
  try {
    const { param } = req.params;
    const paramUser = await userSchema.find({ nombre: new RegExp(param, "i") });

    res.json(paramUser);
  } catch (error) {
    next(error);
  }
};

const resetPasswordUser = async (req, res, next) => {
  try {
    const { email } = req.params;

    const { password } = req.body;

    console.log(email, password);

    const user = await userSchema.findOne({ email });

    const passwordHash = await bcrypt.hash(password, 5);

    user.password = passwordHash;

    console.log(user.password);

    const userUpdate = await userSchema.findByIdAndUpdate(
      user._id.toString(),
      user,
      {
        new: true
      }
    );

    res.json(userUpdate);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUsers,
  getUserWithEmail,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  getUserParams,
  resetPasswordUser
};
